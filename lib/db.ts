/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, PortfolioItem, BlogPost, Testimonial, FAQ, ContactMessage, Subscriber, SiteSettings, PricingPackage, PricingAddon, PricingComparison, PricingQuoteRequest, Currency, CurrencySettings, TestimonialCategory, TestimonialVideo, TestimonialStatistics, ClientLogo, SuccessStory, ReviewSettings, LegalPolicy, LegalRevision, CookieCategory, CookieSettings, WhyChooseUsCard, WhyChooseUsStat, WhyChooseUsBadge, WhyChooseUsTech, WhyChooseUsCTA, ProcessStep, ProcessCTA, TechServiceCard, ClientMoment, Product, ProductImage } from '@/types';
import { initialServices, initialPortfolio, initialBlogs, initialFAQs, initialTestimonials, defaultSiteSettings, initialPricingPackages, initialPricingAddons, initialPricingComparisons, initialTechServiceCards } from '@/data/initialData';
import { initialCookieCategories, defaultCookieSettings, initialLegalPolicies, initialLegalRevisions } from '@/data/legalInitialData';

const KEYS = {
  SERVICES: 'next_solution_services',
  PORTFOLIO: 'next_solution_portfolio',
  BLOGS: 'next_solution_blogs',
  FAQS: 'next_solution_faqs',
  TESTIMONIALS: 'next_solution_testimonials',
  MESSAGES: 'next_solution_messages',
  SUBSCRIBERS: 'next_solution_subscribers',
  SETTINGS: 'next_solution_settings',
  PRICING_PACKAGES: 'next_solution_pricing_packages',
  PRICING_ADDONS: 'next_solution_pricing_addons',
  PRICING_COMPARISONS: 'next_solution_pricing_comparisons',
  PRICING_QUOTES: 'next_solution_pricing_quotes',
  CURRENCIES: 'next_solution_currencies',
  CURRENCY_SETTINGS: 'next_solution_currency_settings',
  TESTIMONIAL_CATEGORIES: 'next_solution_testimonial_categories',
  TESTIMONIAL_VIDEOS: 'next_solution_testimonial_videos',
  TESTIMONIAL_STATISTICS: 'next_solution_testimonial_statistics',
  CLIENT_LOGOS: 'next_solution_client_logos',
  SUCCESS_STORIES: 'next_solution_success_stories',
  REVIEW_SETTINGS: 'next_solution_review_settings',
  LEGAL_POLICIES: 'next_solution_legal_policies',
  LEGAL_REVISIONS: 'next_solution_legal_revisions',
  COOKIE_CATEGORIES: 'next_solution_cookie_categories',
  COOKIE_SETTINGS: 'next_solution_cookie_settings',
  WHY_CHOOSE_US_CARDS: 'next_solution_why_choose_us_cards',
  WHY_CHOOSE_US_STATS: 'next_solution_why_choose_us_stats',
  WHY_CHOOSE_US_BADGES: 'next_solution_why_choose_us_badges',
  WHY_CHOOSE_US_TECHS: 'next_solution_why_choose_us_techs',
  WHY_CHOOSE_US_CTA: 'next_solution_why_choose_us_cta',
  PROCESS_STEPS: 'next_solution_process_steps',
  PROCESS_CTA: 'next_solution_process_cta',
  TECH_SERVICE_CARDS: 'next_solution_tech_service_cards',
  CLIENT_MOMENTS: 'next_solution_client_moments',
  PRODUCTS: 'next_solution_products',
  PRODUCT_IMAGES: 'next_solution_product_images',
};

// Initial seed data for Process Steps and CTA
export const initialProcessSteps: ProcessStep[] = [
  {
    id: 'process-step-1',
    stepNumber: '01',
    icon: '🔍',
    titleEn: 'Discovery & Business Understanding',
    titleBn: 'অনুসন্ধান ও ব্যবসায়িক অনুধাবন',
    descriptionEn: 'Every successful project starts with understanding your business. We learn about your business goals, target audience, competitors, current challenges, existing brand identity, project requirements, budget, and timeline.',
    descriptionBn: 'প্রতিটি সফল প্রজেক্ট শুরু হয় আপনার ব্যবসাকে বোঝার মাধ্যমে। আমরা অনুসন্ধান করি আপনার ব্যবসায়িক লক্ষ্য, টার্গেট অডিয়েন্স, প্রতিযোগী ব্র্যান্ড, বর্তমান চ্যালেঞ্জ, বিদ্যমান ব্র্যান্ড আইডেন্টিটি, প্রজেক্ট রিকোয়ারমেন্ট, বাজেট এবং টাইমলাইন।',
    deliverablesEn: ['Requirement Analysis', 'Competitor Research', 'Business Audit', 'Initial Consultation'],
    deliverablesBn: ['রিকোয়ারমেন্ট এনালাইসিস', 'প্রতিযোগী ব্র্যান্ড বিশ্লেষণ', 'ব্যবসায়িক অডিট', 'প্রাথমিক পরামর্শ'],
    estimatedDurationEn: '1-2 Weeks',
    estimatedDurationBn: '১-২ সপ্তাহ',
    toolsUsed: ['Miro', 'Figma', 'Google Meet', 'Notion'],
    servicesIncludedEn: ['Business Consultation', 'Requirements Mapping', 'Market Research'],
    servicesIncludedBn: ['ব্যবসায়িক পরামর্শ', 'রিকোয়ারমেন্ট ম্যাপিং', 'মার্কেট রিসার্চ'],
    animationType: 'slide-left',
    displayOrder: 1,
    visible: true
  },
  {
    id: 'process-step-2',
    stepNumber: '02',
    icon: '📋',
    titleEn: 'Strategy & Planning',
    titleBn: 'কৌশল ও পরিকল্পনা',
    descriptionEn: 'After understanding your business, we create a customized digital strategy. Depending on your service, this may include website architecture, SEO roadmap, marketing strategy, brand strategy, content planning, AI Services planning, and technology selection.',
    descriptionBn: 'আপনার ব্যবসা বোঝার পরে, আমরা একটি কাস্টমাইজড ডিজিটাল স্ট্র্যাটেজি তৈরি করি। সেবার ধরন অনুযায়ী এর মধ্যে থাকতে পারে ওয়েবসাইট আর্কিটেকচার, এসইও রোডম্যাপ, মার্কেটিং স্ট্র্যাটেজি, ব্র্যান্ড স্ট্র্যাটেজি, কনটেন্ট প্ল্যানিং, এআই সার্ভিস প্ল্যানিং এবং উপযুক্ত টেকনোলজি নির্বাচন।',
    deliverablesEn: ['Project Roadmap', 'Timeline', 'Milestones', 'Technology Stack', 'Growth Strategy'],
    deliverablesBn: ['প্রজেক্ট রোডম্যাপ', 'চূড়ান্ত টাইমলাইন', 'মাইলস্টোন পরিকল্পনা', 'টেকনোলজি স্ট্যাক নির্ধারণ', 'গ্রোথ স্ট্র্যাটেজি'],
    estimatedDurationEn: '1-2 Weeks',
    estimatedDurationBn: '১-২ সপ্তাহ',
    toolsUsed: ['Notion', 'Jira', 'Slack', 'MindNode'],
    servicesIncludedEn: ['Growth Consulting', 'Technology Stack Selection', 'Roadmapping'],
    servicesIncludedBn: ['গ্রোথ কনসাল্টিং', 'টেকনোলজি স্ট্যাক সিলেকশন', 'রোডম্যাপিং'],
    animationType: 'slide-right',
    displayOrder: 2,
    visible: true
  },
  {
    id: 'process-step-3',
    stepNumber: '03',
    icon: '🎨',
    titleEn: 'Creative Design',
    titleBn: 'ক্রিয়েটিভ ডিজাইন',
    descriptionEn: 'Our creative team transforms ideas into premium digital experiences. This may include UI/UX Design, Website Wireframes, Brand Identity, Logo Design, Social Media Designs, Video Storyboards, and Marketing Creatives.',
    descriptionBn: 'আমাদের ক্রিয়েটিভ টিম ধারণাকে প্রিমিয়াম ডিজিটাল অভিজ্ঞতায় রূপান্তরিত করে। এর মধ্যে রয়েছে ইউআই/ইউএক্স ডিজাইন, ওয়েবসাইট ওয়্যারফ্রেম, ব্র্যান্ড আইডেন্টিটি, লোগো ডিজাইন, সোশ্যাল মিডিয়া ডিজাইন, ভিডিও স্টোরিবোর্ড এবং বিজ্ঞাপনী ক্রিয়েটিভস।',
    deliverablesEn: ['High-Fidelity Designs', 'Interactive Prototypes', 'Brand Assets', 'Design Approval'],
    deliverablesBn: ['হাই-ফিডেলিটি ডিজাইন', 'ইন্টারেক্টিভ প্রোটোটাইপ', 'ব্র্যান্ড অ্যাসেটস', 'ডিজাইন অনুমোদন'],
    estimatedDurationEn: '2-3 Weeks',
    estimatedDurationBn: '২-৩ সপ্তাহ',
    toolsUsed: ['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects'],
    servicesIncludedEn: ['UI/UX Design', 'Brand Identity Development', 'Graphic Assets'],
    servicesIncludedBn: ['ইউআই/ইউএক্স ডিজাইন', 'ব্র্যান্ড আইডেন্টিটি ডেভেলপমেন্ট', 'গ্রাফিক অ্যাসেটস'],
    animationType: 'slide-left',
    displayOrder: 3,
    visible: true
  },
  {
    id: 'process-step-4',
    stepNumber: '04',
    icon: '⚙️',
    titleEn: 'Production & Development',
    titleBn: 'প্রডাকশন ও ডেভেলপমেন্ট',
    descriptionEn: 'This stage depends on your selected services: Web Development, web apps, WordPress, Shopify, Laravel, SEO Implementation, Video Editing, Graphic Design, AI Services, AI Agents, Marketing Assets, and Content Creation. Every deliverable follows modern quality standards.',
    descriptionBn: 'এই ধাপটি আপনার নির্বাচিত সেবার ওপর নির্ভর করে: ওয়েব ডেভেলপমেন্ট, ওয়েব অ্যাপ্লিকেশন, ওয়ার্ডপ্রেস, শপিফাই, লারাভেল, এসইও ইমপ্লিমেন্টেশন, ভিডিও এডিটিং, গ্রাফিক ডিজাইন, এআই সার্ভিস, এআই এজেন্ট, মার্কেটিং অ্যাসেটস এবং কনটেন্ট রাইটিং। প্রতিটি ডেলিভারিবল আধুনিক কোয়ালিটি স্ট্যান্ডার্ড মেনে তৈরি করা হয়।',
    deliverablesEn: ['Custom Source Code', 'Production Deployment', 'CMS Setup', 'Automation Integration', 'Video Master Cuts', 'Digital Graphics'],
    deliverablesBn: ['কাস্টম সোর্স কোড', 'প্রোডাকশন ডেপ্লয়মেন্ট', 'সিএমএস সেটআপ', 'অটোমেশন ইন্টিগ্রেশন', 'ভিডিও মাস্টার কাট', 'ডিজিটাল গ্রাফিক্স'],
    estimatedDurationEn: '3-6 Weeks',
    estimatedDurationBn: '৩-৬ সপ্তাহ',
    toolsUsed: ['VS Code', 'GitHub', 'Next.js', 'OpenAI SDK', 'Vercel'],
    servicesIncludedEn: ['Full-Stack Web Development', 'AI Agent Orchestration', 'Video Editing'],
    servicesIncludedBn: ['ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট', 'এআই এজেন্ট অর্কেস্ট্রেশন', 'ভিডিও এডিটিং'],
    animationType: 'slide-right',
    displayOrder: 4,
    visible: true
  },
  {
    id: 'process-step-5',
    stepNumber: '05',
    icon: '🛡️',
    titleEn: 'Testing & Quality Assurance',
    titleBn: 'টেস্টিং ও কোয়ালিটি অ্যাসুরেন্স',
    descriptionEn: 'Before delivery we carefully review every asset. This includes website responsive testing, SEO audit, performance optimization, brand consistency, video quality check, graphic review, automation testing, bug fixing, and security review. Everything is tested before launch.',
    descriptionBn: 'সরবরাহের আগে আমরা প্রতিটি অ্যাসেট অত্যন্ত যত্নসহকারে পরীক্ষা করি। এর মধ্যে রয়েছে ওয়েবসাইট রেসপন্সিভ টেস্টিং, এসইও অডিট, পারফরম্যান্স অপ্টিমাইজেশন, ব্র্যান্ড সামঞ্জস্যতা, ভিডিও কোয়ালিটি চেক, গ্রাফিক রিভিউ, অটোমেশন টেস্ট, বাগ ফিক্সিং এবং সিকিউরিটি অডিট।',
    deliverablesEn: ['QA Compliance Report', 'Performance Audit', 'SEO Compliance Check', 'Security Vulnerability Scan'],
    deliverablesBn: ['কিউএ কমপ্লায়েন্স রিপোর্ট', 'পারফরম্যান্স অডিট', 'এসইও কমপ্লায়েন্স চেক', 'সিকিউরিটি ভালনারেবিলিটি স্ক্যান'],
    estimatedDurationEn: '1 Week',
    estimatedDurationBn: '১ সপ্তাহ',
    toolsUsed: ['Lighthouse', 'Cypress', 'SonarQube', 'Postman'],
    servicesIncludedEn: ['Security Auditing', 'Performance Tuning', 'Cross-Device QA'],
    servicesIncludedBn: ['সিকিউরিটি অডিটিং', 'পারফরম্যান্স টিউনিং', 'ক্রস-ডিভাইস কিউএ'],
    animationType: 'slide-left',
    displayOrder: 5,
    visible: true
  },
  {
    id: 'process-step-6',
    stepNumber: '06',
    icon: '🚀',
    titleEn: 'Launch & Delivery',
    titleBn: 'লঞ্চ ও ডেলিভারি',
    descriptionEn: 'After approval we launch or deliver your project. This includes website deployment, domain setup, hosting configuration, SEO submission, marketing campaign launch, social media delivery, brand files, videos, AI systems, training, and documentation.',
    descriptionBn: 'আপনার চূড়ান্ত অনুমোদনের পর আমরা প্রজেক্টটি লঞ্চ বা ডেলিভারি করি। এর মধ্যে অন্তর্ভুক্ত: ওয়েবসাইট ডেপ্লয়মেন্ট, ডোমেন সেটআপ, হোস্টিং কনফিগারেশন, এসইও সাবমিশন, মার্কেটিং ক্যাম্পেইন চালু, সোশ্যাল মিডিয়া ডেলিভারি, ব্র্যান্ড সোর্স ফাইল, ভিডিও রিলিজ, এআই সিস্টেম চালু এবং ট্রেনিং ও ডকুমেন্টেশন সরবরাহ।',
    deliverablesEn: ['Live Website Handover', 'Completed Brand Pack', 'Active Marketing Launch', 'Video Deliverables', 'Credentials & Guidebooks'],
    deliverablesBn: ['লাইভ ওয়েবসাইট হ্যান্ডওভার', 'ব্র্যান্ড সোর্স ফাইল প্যাক', 'অ্যাক্টিভ মার্কেটিং ক্যাম্পেইন লঞ্চ', 'ভিডিও ডেলিভারিবলস', 'ক্রিডেনশিয়াল ও গাইডবুকস'],
    estimatedDurationEn: '3-5 Days',
    estimatedDurationBn: '৩-৫ দিন',
    toolsUsed: ['Vercel', 'Supabase', 'Cloudflare', 'Google Search Console'],
    servicesIncludedEn: ['Cloud Deployment', 'Domain & DNS Orchestration', 'Delivery Training'],
    servicesIncludedBn: ['ক্লাউড ডেপ্লয়মেন্ট', 'ডোমেন ও ডিএনএস অর্কেস্ট্রেশন', 'ডেলিভারি ট্রেনিং'],
    animationType: 'slide-right',
    displayOrder: 6,
    visible: true
  },
  {
    id: 'process-step-7',
    stepNumber: '07',
    icon: '📈',
    titleEn: 'Growth & Long-Term Support',
    titleBn: 'প্রবৃদ্ধি ও দীর্ঘমেয়াদী সাপোর্ট',
    descriptionEn: 'Our relationship doesn\'t end after delivery. We continue helping you through SEO improvements, marketing optimization, performance monitoring, website maintenance, feature updates, AI improvements, technical support, monthly reports, and growth consultation for a long-term partnership.',
    descriptionBn: 'আমাদের সম্পর্ক ডেলিভারির মাধ্যমেই শেষ হয়ে যায় না। আমরা দীর্ঘমেয়াদী পার্টনারশিপের মাধ্যমে আপনাকে সাহায্য করে যাই: এসইও ইম্প্রুভমেন্ট, মার্কেটিং অপ্টিমাইজেশন, পারফরম্যান্স মনিটরিং, ওয়েবসাইট রক্ষণাবেক্ষণ, ফিচার আপডেট, এআই ইম্প্রুভমেন্ট, টেকনিক্যাল সাপোর্ট, মাসিক রিপোর্ট এবং প্রবৃদ্ধি বিষয়ক পরামর্শ।',
    deliverablesEn: ['Monthly Analytics Report', 'Retainer Maintenance', 'Continual Optimization', 'Scale Consultancy'],
    deliverablesBn: ['মাসিক অ্যানালিটিক্স রিপোর্ট', 'রিটেইনার রক্ষণাবেক্ষণ', 'ধারাবাহিক অপ্টিমাইজেশন', 'স্কেল কনসাল্টেন্সি'],
    estimatedDurationEn: 'Ongoing',
    estimatedDurationBn: 'চলমান',
    toolsUsed: ['Google Analytics', 'Hotjar', 'Semrush', 'ActiveCampaign'],
    servicesIncludedEn: ['SEO Maintenance', 'SLA Support Retainers', 'CRO & Growth Consulting'],
    servicesIncludedBn: ['এসইও রক্ষণাবেক্ষণ', 'এসএলএ সাপোর্ট রিটেইনার', 'সিআরও ও গ্রোথ কনসাল্টিং'],
    animationType: 'slide-left',
    displayOrder: 7,
    visible: true
  }
];

export const initialProcessCTA: ProcessCTA = {
  id: 'process-cta-default',
  titleEn: 'Our Proven Process',
  titleBn: 'আমাদের পরীক্ষিত কর্মপদ্ধতি',
  highlightEn: 'From Idea to Long-Term Business Growth',
  highlightBn: 'পরিকল্পনা থেকে দীর্ঘমেয়াদী ব্যবসায়িক প্রবৃদ্ধি',
  subtitleEn: 'Whether you need a website, branding, SEO, digital marketing, AI Services, graphic design, or a complete digital transformation, our proven workflow ensures every project is delivered with quality, transparency, and measurable results.',
  subtitleBn: 'আপনার ওয়েবসাইট, ব্র্যান্ডিং, এসইও, ডিজিটাল মার্কেটিং, এআই সার্ভিস, গ্রাফিক ডিজাইন বা সম্পূর্ণ ডিজিটাল ট্রান্সফর্মেশনের প্রয়োজন হোক না কেন, আমাদের নির্ভরযোগ্য কর্মপদ্ধতি নিশ্চিত করে প্রতিটি প্রজেক্ট যেন সর্বোচ্চ গুণমান, স্বচ্ছতা এবং পরিমাপযোগ্য ফলাফল সহ ডেলিভারি করা হয়।',
  ctaHeadlineEn: 'Ready to Start Your Digital Journey?',
  ctaHeadlineBn: 'আপনার ডিজিটাল যাত্রা শুরু করতে প্রস্তুত?',
  ctaSubtitleEn: 'Whether you need one service or a complete digital transformation, our team is ready to turn your ideas into measurable business success.',
  ctaSubtitleBn: 'আপনার একটি নির্দিষ্ট সেবার প্রয়োজন হোক বা সম্পূর্ণ ডিজিটাল ট্রান্সফর্মেশন, আমাদের টিম প্রস্তুত রয়েছে আপনার ধারণাকে পরিমাপযোগ্য ব্যবসায়িক সাফল্যে রূপান্তরিত করতে।',
  ctaPrimaryTextEn: 'Start Your Project',
  ctaPrimaryTextBn: 'প্রজেক্ট শুরু করুন',
  ctaSecondaryTextEn: 'Book a Free Consultation',
  ctaSecondaryTextBn: 'ফ্রি কনসালটেশন বুক করুন'
};


// LocalStorage helpers with fallback (SSR-safe)
function getLocal<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (e) {
    console.error('Error reading localStorage key', key, e);
  }
  return defaultValue;
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage key', key, e);
  }
}

// Initial seed data for Testimonials & Reviews sections
export const initialTestimonialCategories: TestimonialCategory[] = [
  { id: 'cat-1', nameEn: 'Web Development', nameBn: 'ওয়েব ডেভেলপমেন্ট', slug: 'web-development' },
  { id: 'cat-2', nameEn: 'UI/UX & Product Design', nameBn: 'ইউআই/ইউএক্স ও প্রোডাক্ট ডিজাইন', slug: 'ui-ux-design' },
  { id: 'cat-3', nameEn: 'Digital Marketing', nameBn: 'ডিজিটাল মার্কেটিং', slug: 'digital-marketing' },
  { id: 'cat-4', nameEn: 'SEO Optimization', nameBn: 'এসইও অপ্টিমাইজেশন', slug: 'seo' },
  { id: 'cat-5', nameEn: 'AI Services', nameBn: 'এআই সার্ভিস', slug: 'ai-automation' }
];

export const initialTestimonialVideos: TestimonialVideo[] = [
  {
    id: 'vid-1',
    titleEn: 'Fintech Spark: Banking Portal Redesign Review',
    titleBn: 'ফিনটেক স্পার্ক: ব্যাংকিং পোর্টাল রিডিজাইন রিভিউ',
    clientName: 'Sarah Jenkins',
    company: 'Fintech Spark Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    shortDescriptionEn: 'Sarah describes how the custom design system and secure UI implementation reduced user friction and accelerated deployment by 3 weeks.',
    shortDescriptionBn: 'সারাহ বর্ণনা করেছেন কীভাবে কাস্টম ডিজাইন সিস্টেম এবং সুরক্ষিত ইউআই ইন্টারফেস গ্রাহকদের লেনদেনের অভিজ্ঞতা সহজ করেছে এবং ৩ সপ্তাহ আগে কাজ সম্পন্ন হয়েছে।',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'vid-2',
    titleEn: 'Sora Web3: Platform Launch Testimonial',
    titleBn: 'সোরা ওয়েব৩: প্ল্যাটফর্ম লঞ্চ রিভিউ',
    clientName: 'David Chen',
    company: 'Sora Web3 Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    shortDescriptionEn: 'David talks about the 42% week-one increase in client conversions following their platform rebranding and full-stack development launch.',
    shortDescriptionBn: 'ডেভিড তার কোম্পানির রিব্র্যান্ডিং এবং ফুল-স্ট্যাক ডেভেলপমেন্ট সলিউশন চালুর প্রথম সপ্তাহে ৪২% কনভার্সন বৃদ্ধির অভিজ্ঞতা শেয়ার করেছেন।',
    featured: true,
    displayOrder: 2
  }
];

export const initialClientMoments: ClientMoment[] = [
  {
    id: 'moment-1',
    titleEn: 'Project Handover with Apex Fashion Team',
    titleBn: 'অ্যাপেক্স ফ্যাশন টিমের সাথে প্রজেক্ট হ্যান্ডওভার মুহূর্ত',
    clientName: 'Sajid Rahman',
    company: 'Apex Fashion Group',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
    descriptionEn: 'Discussing the successful launch of their new editorial fashion e-commerce portal and future roadmap expansion.',
    descriptionBn: 'তাদের নতুন এডিটরিয়াল ফ্যাশন ই-কমার্স পোর্টাল এর সফল লঞ্চিং এবং ভবিষ্যৎ রোডম্যাপ নিয়ে আলোচনা করার দারুণ একটি মুহূর্ত।',
    displayOrder: 1,
    visible: true
  },
  {
    id: 'moment-2',
    titleEn: 'Strategic Consulting Session with Fintech Spark CEO',
    titleBn: 'ফিনটেক স্পার্কের প্রধান নির্বাহীর সাথে কৌশলগত সেশন',
    clientName: 'Sarah Jenkins',
    company: 'Fintech Spark Inc.',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    descriptionEn: 'Brainstorming the core security protocols and user experience guidelines for the upcoming enterprise banking portal.',
    descriptionBn: 'আসন্ন এন্টারপ্রাইজ ব্যাংকিং পোর্টালটির মূল নিরাপত্তা প্রোটোকল এবং ব্যবহারকারীর অভিজ্ঞতা সহজ করার নির্দেশিকা নিয়ে ব্রেইনস্টর্মিং সেশন।',
    displayOrder: 2,
    visible: true
  },
  {
    id: 'moment-3',
    titleEn: 'Celebrating Sora Web3 Launch Milestones',
    titleBn: 'সোরা ওয়েব৩ লঞ্চের মাইলফলক উদযাপন',
    clientName: 'David Chen',
    company: 'Sora Web3 Labs',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    descriptionEn: 'Enjoying some team celebration moments following the successful deployment and high-fidelity brand rollout.',
    descriptionBn: 'সফল ডেপ্লয়মেন্ট এবং আকর্ষণীয় ব্র্যান্ড রোলআউটের পর পুরো টিমের সাথে আনন্দঘন কিছু মুহূর্ত উদযাপন।',
    displayOrder: 3,
    visible: true
  }
];

export const initialTestimonialStatistics: TestimonialStatistics = {
  id: 'stats-default',
  projectsCompleted: 520,
  happyClients: 310,
  clientSatisfaction: 98,
  averageRating: 4.9,
  industriesServed: 28,
  fiveStarReviews: 150
};

export const initialClientLogos: ClientLogo[] = [
  { id: 'logo-1', name: 'Fintech Spark', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150', featured: true, displayOrder: 1 },
  { id: 'logo-2', name: 'Sora Web3', logoUrl: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=150', featured: true, displayOrder: 2 },
  { id: 'logo-3', name: 'Pioneer BD', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=150', featured: true, displayOrder: 3 },
  { id: 'logo-4', name: 'Stripe', logoUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&q=80&w=150', featured: true, displayOrder: 4 },
  { id: 'logo-5', name: 'Vercel', logoUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=150', featured: true, displayOrder: 5 },
  { id: 'logo-6', name: 'Framer', logoUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=150', featured: true, displayOrder: 6 }
];

export const initialSuccessStories: SuccessStory[] = [
  {
    id: 'story-1',
    clientName: 'Sarah Jenkins',
    companyName: 'Fintech Spark Inc.',
    industryEn: 'Finance & Banking',
    industryBn: 'অর্থসংস্থান ও ব্যাংকিং',
    serviceEn: 'Secure Web Dashboard Redesign',
    serviceBn: 'সিকিউর ওয়েব ড্যাশবোর্ড রিডিজাইন',
    backgroundEn: 'Fintech Spark is a leading digital trading platform serving over 50,000 active retail investors globally.',
    backgroundBn: 'ফিনটেক স্পার্ক একটি নেতৃস্থানীয় ডিজিটাল ট্রেডিং প্ল্যাটফর্ম যা বিশ্বব্যাপী ৫০,০০০-এরও বেশি সক্রিয় খুচরা বিনিয়োগকারীদের পরিষেবা প্রদান করে।',
    challengeEn: 'Their existing legacy dashboard suffered from high user drop-off rates due to slow layout rendering speeds and complex multi-step transaction steps.',
    challengeBn: 'তাদের বিদ্যমান ড্যাশবোর্ডটি ধীর গতির লোডিং এবং জটিল লেনদেন ধাপের কারণে উচ্চ কাস্টমার ড্রপ-অফ রেটের মুখোমুখি হয়েছিল।',
    solutionEn: 'We engineered a flat-compiled React-based dashboard styled with Tailwind CSS, utilizing direct optimized state caching and strict zero-layout shift guidelines.',
    solutionBn: 'আমরা টেলউইন্ড সিএসএস দ্বারা একটি ফ্ল্যাট-কম্পাইলড রিয়্যাক্ট-ভিত্তিক ড্যাশবোর্ড তৈরি করেছি, যা ডেটা ক্যাশিং এবং জিরো-লেআউট শিফট প্রযুক্তি ব্যবহার করে।',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase'],
    timelineEn: '8 Weeks',
    timelineBn: '৮ সপ্তাহ',
    resultsEn: 'The site response time dropped below 300ms, and user transactions increased by 35% within the first month. The project was delivered 3 weeks early.',
    resultsBn: 'সাইটের রেスン্স টাইম ৩০০ মিলি-সেকেন্ডের নিচে নেমে এসেছে এবং প্রথম মাসেই গ্রাহক লেনদেন ৩৫% বৃদ্ধি পেয়েছে। পুরো প্রজেক্টটি ৩ সপ্তাহ আগেই সম্পন্ন করা হয়েছে।',
    beforeImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    clientQuoteEn: 'Next Solution operates on an entirely different level of design sophistication. They delivered our secure banking dashboard 3 weeks ahead of schedule and our speed stats blew past our competitors.',
    clientQuoteBn: 'নেক্সট সলিউশন সম্পূর্ণ ভিন্ন স্তরের ডিজাইন পরিশীলিততায় কাজ করে। তারা আমাদের নির্ধারিত সময়ের ৩ সপ্তাহ আগেই সিকিউর ব্যাংকিং ড্যাশবোর্ড সরবরাহ করেছে এবং সাইটের স্পিড প্রতিদ্বন্দ্বীদের ছাড়িয়ে গেছে।',
    clientRoleEn: 'VP of Digital Experience',
    clientRoleBn: 'ভিপি অফ ডিজিটাল এক্সপেরিয়েন্স',
    clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'story-2',
    clientName: 'David Chen',
    companyName: 'Sora Web3 Labs',
    industryEn: 'Web3 & Blockchain',
    industryBn: 'ওয়েব৩ ও ব্লকচেইন',
    serviceEn: 'Unified Branding & Full-Stack Platform',
    serviceBn: 'ইউনিফায়েড ব্র্যান্ডিং ও ফুল-স্ট্যাক প্ল্যাটফর্ম',
    backgroundEn: 'Sora Web3 Labs builds decentralized liquidity models and asset transfer networks for modern enterprises.',
    backgroundBn: 'সোরা ওয়েব৩ ল্যাবস আধুনিক উদ্যোগগুলির জন্য বিকেন্দ্রীভূত তারল্য মডেল এবং সম্পদ স্থানান্তর নেটওয়ার্ক তৈরি করে।',
    challengeEn: 'Sora had high technical complexity but struggled to convert traditional B2B clients due to a scattered brand narrative and disjointed layout assets.',
    challengeBn: 'সোরা-এর চমৎকার কারিগরি প্রযুক্তি থাকলেও এলোমেলো ব্র্যান্ডিং উপস্থাপনা এবং বিভ্রান্তিকর ওয়েবসাইট ইউআই-এর কারণে ঐতিহ্যবাহী B2B ক্লায়েন্ট কনভার্ট করতে পারছিল না।',
    solutionEn: 'We crafted a unified custom design system, beautiful vector assets, and an immersive multi-step onboarding funnel that simplified their complex blockchain offerings.',
    solutionBn: 'আমরা একটি চমৎকার কাস্টম ডিজাইন সিস্টেম, আকর্ষণীয় ভেক্টর অ্যাসেট এবং একটি সহজ ধাপে ধাপে অনবোর্ডিং ফানেল তৈরি করেছি যা তাদের জটিল ব্লকচেইন সার্ভিসগুলোকে সহজ করে তোলে।',
    technologies: ['React', 'Figma', 'Motion', 'Tailwind CSS', 'Node.js'],
    timelineEn: '10 Weeks',
    timelineBn: '১০ সপ্তাহ',
    resultsEn: 'Conversion rates shot up by 42% on the very first week of deployment. Sora secured $12M Series A funding shortly after relaunch.',
    resultsBn: 'চালু করার প্রথম সপ্তাহেই কনভার্সন রেট ৪২% বৃদ্ধি পায়। পুনরায় চালুর কিছুদিনের মধ্যেই সোরা ১২ মিলিয়ন ডলারের সিরিজ এ ফান্ডিং সুরক্ষিত করতে সক্ষম হয়।',
    beforeImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    clientQuoteEn: 'Their UI/UX team is unmatched. They built a custom design system that unified our web portal, dashboards, and landing pages. Our conversion rates shot up by 42% on week one of deployment.',
    clientQuoteBn: 'তাদের ইউআই/ইউএক্স টিম অতুলনীয়। তারা একটি কাস্টম ডিজাইন সিস্টেম তৈরি করেছে যা আমাদের পোর্টাল, ড্যাশবোর্ড এবং ল্যান্ডিং পেজগুলিকে একত্রিত করেছে। প্রথম সপ্তাহেই আমাদের কনভার্সন রেট ৪২% বৃদ্ধি পেয়েছে।',
    clientRoleEn: 'Founder & CEO',
    clientRoleBn: 'প্রতিষ্ঠাতা ও সিইও',
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    featured: true,
    displayOrder: 2
  }
];

export const defaultReviewSettings: ReviewSettings = {
  enablePublicSubmissions: true,
  requireApprovalBeforePublishing: true,
  defaultVerificationStatus: false,
  notifyOnNewReview: true
};

export const initialWhyChooseUsCards: WhyChooseUsCard[] = [
  {
    id: 'wcu-1',
    icon: 'Layers',
    titleEn: 'One Partner For Everything',
    titleBn: 'সবকিছুর জন্য একটি পার্টনার',
    descEn: 'From strategy to development, marketing, branding, SEO, AI Services, and ongoing support—all under one trusted agency.',
    descBn: 'কৌশল থেকে শুরু করে ডেভেলপমেন্ট, মার্কেটিং, ব্র্যান্ডিং, এসইও, এআই সার্ভিস এবং সার্বক্ষণিক সাপোর্ট—সবকিছুই পাবেন একই এজেন্সির অধীনে।',
    stat: '100% Core',
    displayOrder: 1,
    visible: true
  },
  {
    id: 'wcu-2',
    icon: 'TrendingUp',
    titleEn: 'Business Growth First',
    titleBn: 'আগে ব্যবসার প্রবৃদ্ধি',
    descEn: 'Every solution is built to increase leads, sales, conversions, and long-term business growth.',
    descBn: 'প্রতিটি সমাধানই তৈরি করা হয়েছে কাস্টমার লিড, সেলস, কনভার্সন এবং দীর্ঘমেয়াদী ব্যবসার প্রবৃদ্ধি নিশ্চিত করার লক্ষ্যে।',
    stat: '4.2x ROI',
    displayOrder: 2,
    visible: true
  },
  {
    id: 'wcu-3',
    icon: 'Cpu',
    titleEn: 'Modern Technologies',
    titleBn: 'অত্যাধুনিক প্রযুক্তি',
    descEn: 'Using Next.js, React, TypeScript, Supabase, AI, Cloudflare, Vercel, and modern cloud infrastructure.',
    descBn: 'নেক্সট.জেএস, রিয়্যাক্ট, টাইপস্ক্রিপ্ট, সুপাবেস, এআই, ক্লাউডফ্লেয়ার, ভার্সেল এবং আধুনিক ক্লাউড আর্কিটেকচার ব্যবহার করে বিল্ড করা।',
    stat: '99.9% Up',
    displayOrder: 3,
    visible: true
  },
  {
    id: 'wcu-4',
    icon: 'Compass',
    titleEn: 'Custom Solutions',
    titleBn: 'কাস্টমাইজড সমাধান',
    descEn: 'Every business is different. Every solution is designed specifically for your goals.',
    descBn: 'প্রতিটি ব্যবসা আলাদা। তাই প্রতিটি সমাধান বিশেষভাবে আপনার লক্ষ্যের কথা বিবেচনা করে কাস্টমাইজড উপায়ে ডিজাইন করা হয়।',
    stat: 'Bespoke',
    displayOrder: 4,
    visible: true
  },
  {
    id: 'wcu-5',
    icon: 'MessageSquare',
    titleEn: 'Transparent Communication',
    titleBn: 'স্বচ্ছ যোগাযোগ ব্যবস্থা',
    descEn: 'No hidden costs. Regular updates. Clear milestones. Dedicated project manager.',
    descBn: 'কোনো গোপন খরচ নেই। নিয়মিত প্রজেক্ট আপডেট, স্পষ্ট মাইলস্টোন এবং ডেডিকেটেড প্রজেক্ট ম্যানেজার সাপোর্ট।',
    stat: 'Zero-Risk',
    displayOrder: 5,
    visible: true
  },
  {
    id: 'wcu-6',
    icon: 'Zap',
    titleEn: 'Fast Delivery',
    titleBn: 'দ্রুত ডেলিভারি',
    descEn: 'Efficient workflows. Agile development. Quick turnaround. On-time project delivery.',
    descBn: 'দক্ষ কর্মক্ষমতা, চটপটে এজাইল ডেভেলপমেন্ট, দ্রুত রেসপন্স এবং নির্ধারিত সময়ের মধ্যে শতভাগ অন-টাইম প্রজেক্ট ডেলিভারি।',
    stat: '15d MVP',
    displayOrder: 6,
    visible: true
  },
  {
    id: 'wcu-7',
    icon: 'Heart',
    titleEn: 'Long-Term Partnership',
    titleBn: 'দীর্ঘমেয়াদী অংশীদারিত্ব',
    descEn: 'We continue improving your business after launch with support, optimization, and future enhancements.',
    descBn: 'লঞ্চ করার পরও আমরা সাপোর্ট, সিকিউরিটি অপ্টিমাইজেশন এবং ভবিষ্যতের প্রয়োজনীয় আপডেট দিয়ে আপনার ব্র্যান্ডের প্রবৃদ্ধিতে পাশে থাকি।',
    stat: '24/7 SLA',
    displayOrder: 7,
    visible: true
  },
  {
    id: 'wcu-8',
    icon: 'Sparkles',
    titleEn: 'AI-Powered Future',
    titleBn: 'এআই-চালিত ভবিষ্যৎ',
    descEn: 'Leverage AI Services, AI agents, workflow optimization, and intelligent business solutions to stay ahead of the competition.',
    descBn: 'প্রতিযোগিতায় এগিয়ে থাকতে এআই সার্ভিস, এআই এজেন্ট, বুদ্ধিমান ওয়ার্কফ্লো এবং স্মার্ট বিজনেস সলিউশনের সর্বোচ্চ ব্যবহার।',
    stat: 'Next-Gen',
    displayOrder: 8,
    visible: true
  }
];

export const initialWhyChooseUsStats: WhyChooseUsStat[] = [
  { id: 'wcs-1', value: '200+', labelEn: 'Projects Delivered', labelBn: 'ডেলিভারি করা প্রজেক্ট', displayOrder: 1, visible: true },
  { id: 'wcs-2', value: '150+', labelEn: 'Happy Clients', labelBn: 'খুশি গ্রাহক সংখ্যা', displayOrder: 2, visible: true },
  { id: 'wcs-3', value: '98%', labelEn: 'Client Satisfaction', labelBn: 'গ্রাহক সন্তুষ্টির হার', displayOrder: 3, visible: true },
  { id: 'wcs-4', value: '15+', labelEn: 'Digital Services', labelBn: 'ডিজিটাল সেবাসমূহ', displayOrder: 4, visible: true },
  { id: 'wcs-5', value: '25+', labelEn: 'Industries Served', labelBn: 'সেবা প্রদানকৃত ইন্ডাস্ট্রি', displayOrder: 5, visible: true }
];

export const initialWhyChooseUsBadges: WhyChooseUsBadge[] = [
  { id: 'wcb-1', textEn: '✓ Trusted by Growing Businesses', textBn: '✓ ক্রমবর্ধমান ব্যবসায়ে বিশ্বস্ত', displayOrder: 1, visible: true },
  { id: 'wcb-2', textEn: '✓ End-to-End Digital Solutions', textBn: '✓ এন্ড-টু-এন্ড ডিজিটাল সলিউশন', displayOrder: 2, visible: true },
  { id: 'wcb-3', textEn: '✓ Transparent Process', textBn: '✓ শতভাগ স্বচ্ছ কর্মপদ্ধতি', displayOrder: 3, visible: true },
  { id: 'wcb-4', textEn: '✓ Dedicated Support', textBn: '✓ ডেডিকেটেড সাপোর্ট টিম', displayOrder: 4, visible: true },
  { id: 'wcb-5', textEn: '✓ Modern Technology Stack', textBn: '✓ আধুনিক প্রযুক্তিগত স্ট্যাক', displayOrder: 5, visible: true },
  { id: 'wcb-6', textEn: '✓ Business Growth Focus', textBn: '✓ সরাসরি ব্যবসার বৃদ্ধিতে ফোকাস', displayOrder: 6, visible: true }
];

export const initialWhyChooseUsTechs: WhyChooseUsTech[] = [
  { id: 'wct-1', name: 'Next.js', displayOrder: 1, visible: true },
  { id: 'wct-2', name: 'React', displayOrder: 2, visible: true },
  { id: 'wct-3', name: 'TypeScript', displayOrder: 3, visible: true },
  { id: 'wct-4', name: 'Supabase', displayOrder: 4, visible: true },
  { id: 'wct-5', name: 'PostgreSQL', displayOrder: 5, visible: true },
  { id: 'wct-6', name: 'Tailwind CSS', displayOrder: 6, visible: true },
  { id: 'wct-7', name: 'Node.js', displayOrder: 7, visible: true },
  { id: 'wct-8', name: 'OpenAI', displayOrder: 8, visible: true },
  { id: 'wct-9', name: 'Gemini', displayOrder: 9, visible: true },
  { id: 'wct-10', name: 'Cloudflare', displayOrder: 10, visible: true },
  { id: 'wct-11', name: 'Vercel', displayOrder: 11, visible: true }
];

export const initialWhyChooseUsCTA: WhyChooseUsCTA = {
  headlineEn: 'Ready to Build Something Extraordinary?',
  headlineBn: 'অসাধারণ কিছু তৈরি করতে প্রস্তুত?',
  subEn: 'Let\'s turn your ideas into measurable business growth.',
  subBn: 'চলুন আপনার আইডিয়াকে পরিমাপযোগ্য ব্যবসায়িক সাফল্যে রূপান্তর করি।',
  btn1TextEn: 'Start Your Project',
  btn1TextBn: 'প্রজেক্ট শুরু করুন',
  btn2TextEn: 'Book Free Consultation',
  btn2TextBn: 'ফ্রি পরামর্শ বুক করুন',
  noteEn: 'Let\'s turn your ideas into measurable business growth.',
  noteBn: 'চলুন আপনার আইডিয়াকে পরিমাপযোগ্য ব্যবসায়িক সাফল্যে রূপান্তর করি।'
};


// Initial DB check and seeding
export function initDB(): void {
  if (typeof window === 'undefined') {
    return;
  }
  const currentServices = getLocal<any[]>(KEYS.SERVICES, []);
  if (currentServices.length !== initialServices.length) {
    setLocal(KEYS.SERVICES, initialServices);
  }
  const currentPortfolio = getLocal<any[]>(KEYS.PORTFOLIO, []);
  if (!localStorage.getItem(KEYS.BLOGS)) {
    setLocal(KEYS.BLOGS, initialBlogs);
  }
  if (!localStorage.getItem(KEYS.FAQS)) {
    setLocal(KEYS.FAQS, initialFAQs);
  }
  if (!localStorage.getItem(KEYS.TESTIMONIALS)) {
    setLocal(KEYS.TESTIMONIALS, initialTestimonials);
  }
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    setLocal(KEYS.SETTINGS, defaultSiteSettings);
  }
  if (!localStorage.getItem(KEYS.MESSAGES)) {
    // Seed some mock initial messages to make the Admin Panel feel occupied immediately!
    const seedMessages: ContactMessage[] = [
      {
        id: 'msg-1',
        name: 'Rahim Uddin',
        email: 'rahim@retailcorp.bd',
        phone: '+880 1812 345678',
        subject: 'Inquiry about Ecommerce Web Portal development',
        message: 'Hello, we are looking to migrate our brick and mortar retail fashion shop to a premium React-based online ecommerce site. We would like to learn more about your milestone payments and visual design system.',
        service: 'Enterprise Web Development',
        budget: '$10,000 - $25,000',
        status: 'unread',
        createdAt: '2026-07-08T10:15:30.000Z'
      },
      {
        id: 'msg-2',
        name: 'Emily Watson',
        email: 'emily@horizonhealth.us',
        phone: '+1 555 019 2834',
        subject: 'Healthcare SaaS UI/UX Design System',
        message: 'Our product team needs a comprehensive Figma layout audit and high-fidelity prototype redesign for our telehealth SaaS portal. The system must meet HIPAA security compliance and feel exceptionally clean.',
        service: 'UI/UX & Product Design',
        budget: '$5,000 - $10,000',
        status: 'read',
        createdAt: '2026-07-07T14:30:00.000Z'
      }
    ];
    setLocal(KEYS.MESSAGES, seedMessages);
  }
  if (!localStorage.getItem(KEYS.SUBSCRIBERS)) {
    const seedSubscribers: Subscriber[] = [
      { id: 'sub-1', email: 'investor@siliconbay.com', createdAt: '2026-07-01T08:00:00.000Z' },
      { id: 'sub-2', email: 'tech_crunch_editor@republic.co', createdAt: '2026-07-03T11:45:00.000Z' }
    ];
    setLocal(KEYS.SUBSCRIBERS, seedSubscribers);
  }
  const storedPackages = getLocal<PricingPackage[]>(KEYS.PRICING_PACKAGES, []);
  if (!localStorage.getItem(KEYS.PRICING_PACKAGES) || storedPackages.length === 0 || storedPackages.length < initialPricingPackages.length) {
    setLocal(KEYS.PRICING_PACKAGES, initialPricingPackages);
  }
  const storedAddons = getLocal<PricingAddon[]>(KEYS.PRICING_ADDONS, []);
  if (!localStorage.getItem(KEYS.PRICING_ADDONS) || storedAddons.length === 0 || storedAddons.length < initialPricingAddons.length) {
    setLocal(KEYS.PRICING_ADDONS, initialPricingAddons);
  }
  const storedComparisons = getLocal<any[]>(KEYS.PRICING_COMPARISONS, []);
  if (!localStorage.getItem(KEYS.PRICING_COMPARISONS) || storedComparisons.length === 0 || storedComparisons.length < initialPricingComparisons.length) {
    setLocal(KEYS.PRICING_COMPARISONS, initialPricingComparisons);
  }
  if (!localStorage.getItem(KEYS.PRICING_QUOTES)) {
    const seedQuotes: PricingQuoteRequest[] = [
      {
        id: 'quote-1',
        name: 'Asif Rahman',
        email: 'asif@nextech.io',
        phone: '+880 1711 223344',
        company: 'NexTech Solutions',
        industry: 'Fintech',
        service: 'Web App',
        budget: '$10,000 - $25,000',
        timeline: '2-3 months',
        description: 'Need a premium billing and invoicing SaaS application integrated with local payment gateways (bKash, Nagad) and Stripe for international users. The UI/UX should feel premium and fluid.',
        status: 'pending',
        createdAt: '2026-07-09T09:30:00.000Z'
      }
    ];
    setLocal(KEYS.PRICING_QUOTES, seedQuotes);
  }

  if (!localStorage.getItem(KEYS.CURRENCIES)) {
    const defaultCurrencies: Currency[] = [
      {
        id: 'curr-usd',
        name: 'US Dollar',
        code: 'USD',
        symbol: '$',
        flag: '🇺🇸',
        exchangeRate: 1.0,
        enabled: true,
        isDefault: true,
        sortOrder: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'curr-eur',
        name: 'Euro',
        code: 'EUR',
        symbol: '€',
        flag: '🇪🇺',
        exchangeRate: 0.92,
        enabled: true,
        isDefault: false,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'curr-gbp',
        name: 'British Pound',
        code: 'GBP',
        symbol: '£',
        flag: '🇬🇧',
        exchangeRate: 0.78,
        enabled: true,
        isDefault: false,
        sortOrder: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'curr-bdt',
        name: 'Bangladeshi Taka',
        code: 'BDT',
        symbol: '৳',
        flag: '🇧🇩',
        exchangeRate: 117.5,
        enabled: true,
        isDefault: false,
        sortOrder: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    setLocal(KEYS.CURRENCIES, defaultCurrencies);
  }

  if (!localStorage.getItem(KEYS.CURRENCY_SETTINGS)) {
    const defaultCurrencySettings: CurrencySettings = {
      enableLiveRates: true,
      decimalPrecision: 0,
      defaultCurrencyCode: 'USD'
    };
    setLocal(KEYS.CURRENCY_SETTINGS, defaultCurrencySettings);
  }

  if (!localStorage.getItem(KEYS.TESTIMONIAL_CATEGORIES)) {
    setLocal(KEYS.TESTIMONIAL_CATEGORIES, initialTestimonialCategories);
  }
  if (!localStorage.getItem(KEYS.TESTIMONIAL_VIDEOS)) {
    setLocal(KEYS.TESTIMONIAL_VIDEOS, initialTestimonialVideos);
  }
  if (!localStorage.getItem(KEYS.CLIENT_MOMENTS)) {
    setLocal(KEYS.CLIENT_MOMENTS, initialClientMoments);
  }
  if (!localStorage.getItem(KEYS.TESTIMONIAL_STATISTICS)) {
    setLocal(KEYS.TESTIMONIAL_STATISTICS, initialTestimonialStatistics);
  }
  if (!localStorage.getItem(KEYS.CLIENT_LOGOS)) {
    setLocal(KEYS.CLIENT_LOGOS, initialClientLogos);
  }
  if (!localStorage.getItem(KEYS.SUCCESS_STORIES)) {
    setLocal(KEYS.SUCCESS_STORIES, initialSuccessStories);
  }
  if (!localStorage.getItem(KEYS.REVIEW_SETTINGS)) {
    setLocal(KEYS.REVIEW_SETTINGS, defaultReviewSettings);
  }
  if (!localStorage.getItem(KEYS.LEGAL_POLICIES)) {
    setLocal(KEYS.LEGAL_POLICIES, initialLegalPolicies);
  }
  if (!localStorage.getItem(KEYS.LEGAL_REVISIONS)) {
    setLocal(KEYS.LEGAL_REVISIONS, initialLegalRevisions);
  }
  if (!localStorage.getItem(KEYS.COOKIE_CATEGORIES)) {
    setLocal(KEYS.COOKIE_CATEGORIES, initialCookieCategories);
  }
  if (!localStorage.getItem(KEYS.COOKIE_SETTINGS)) {
    setLocal(KEYS.COOKIE_SETTINGS, defaultCookieSettings);
  }
  if (!localStorage.getItem(KEYS.WHY_CHOOSE_US_CARDS)) {
    setLocal(KEYS.WHY_CHOOSE_US_CARDS, initialWhyChooseUsCards);
  }
  const currentStats = getLocal<any[]>(KEYS.WHY_CHOOSE_US_STATS, []);
  const containsOldStats = currentStats.some(s => s.value === '99.99%' || s.labelEn === 'Happy Enterprises' || s.labelEn === 'Projects Completed');
  if (!localStorage.getItem(KEYS.WHY_CHOOSE_US_STATS) || currentStats.length !== initialWhyChooseUsStats.length || containsOldStats) {
    setLocal(KEYS.WHY_CHOOSE_US_STATS, initialWhyChooseUsStats);
  }
  if (!localStorage.getItem(KEYS.WHY_CHOOSE_US_BADGES)) {
    setLocal(KEYS.WHY_CHOOSE_US_BADGES, initialWhyChooseUsBadges);
  }
  if (!localStorage.getItem(KEYS.WHY_CHOOSE_US_TECHS)) {
    setLocal(KEYS.WHY_CHOOSE_US_TECHS, initialWhyChooseUsTechs);
  }
  if (!localStorage.getItem(KEYS.WHY_CHOOSE_US_CTA)) {
    setLocal(KEYS.WHY_CHOOSE_US_CTA, initialWhyChooseUsCTA);
  }
  if (!localStorage.getItem(KEYS.PROCESS_STEPS)) {
    setLocal(KEYS.PROCESS_STEPS, initialProcessSteps);
  }
  if (!localStorage.getItem(KEYS.PROCESS_CTA)) {
    setLocal(KEYS.PROCESS_CTA, initialProcessCTA);
  }
}

// Ensure database is initialized (browser only)
if (typeof window !== 'undefined') {
  initDB();
}

// WHY CHOOSE US GETTERS & SETTERS
export function getWhyChooseUsCards(): WhyChooseUsCard[] {
  return getLocal<WhyChooseUsCard[]>(KEYS.WHY_CHOOSE_US_CARDS, initialWhyChooseUsCards);
}
export function saveWhyChooseUsCard(card: WhyChooseUsCard): void {
  const list = getWhyChooseUsCards();
  const index = list.findIndex(c => c.id === card.id);
  if (index >= 0) {
    list[index] = card;
  } else {
    list.push(card);
  }
  setLocal(KEYS.WHY_CHOOSE_US_CARDS, list);
}
export function deleteWhyChooseUsCard(id: string): void {
  const list = getWhyChooseUsCards().filter(c => c.id !== id);
  setLocal(KEYS.WHY_CHOOSE_US_CARDS, list);
}

export function getWhyChooseUsStats(): WhyChooseUsStat[] {
  return getLocal<WhyChooseUsStat[]>(KEYS.WHY_CHOOSE_US_STATS, initialWhyChooseUsStats);
}
export function saveWhyChooseUsStat(stat: WhyChooseUsStat): void {
  const list = getWhyChooseUsStats();
  const index = list.findIndex(s => s.id === stat.id);
  if (index >= 0) {
    list[index] = stat;
  } else {
    list.push(stat);
  }
  setLocal(KEYS.WHY_CHOOSE_US_STATS, list);
}
export function deleteWhyChooseUsStat(id: string): void {
  const list = getWhyChooseUsStats().filter(s => s.id !== id);
  setLocal(KEYS.WHY_CHOOSE_US_STATS, list);
}

export function getWhyChooseUsBadges(): WhyChooseUsBadge[] {
  return getLocal<WhyChooseUsBadge[]>(KEYS.WHY_CHOOSE_US_BADGES, initialWhyChooseUsBadges);
}
export function saveWhyChooseUsBadge(badge: WhyChooseUsBadge): void {
  const list = getWhyChooseUsBadges();
  const index = list.findIndex(b => b.id === badge.id);
  if (index >= 0) {
    list[index] = badge;
  } else {
    list.push(badge);
  }
  setLocal(KEYS.WHY_CHOOSE_US_BADGES, list);
}
export function deleteWhyChooseUsBadge(id: string): void {
  const list = getWhyChooseUsBadges().filter(b => b.id !== id);
  setLocal(KEYS.WHY_CHOOSE_US_BADGES, list);
}

export function getWhyChooseUsTechs(): WhyChooseUsTech[] {
  return getLocal<WhyChooseUsTech[]>(KEYS.WHY_CHOOSE_US_TECHS, initialWhyChooseUsTechs);
}
export function saveWhyChooseUsTech(tech: WhyChooseUsTech): void {
  const list = getWhyChooseUsTechs();
  const index = list.findIndex(t => t.id === tech.id);
  if (index >= 0) {
    list[index] = tech;
  } else {
    list.push(tech);
  }
  setLocal(KEYS.WHY_CHOOSE_US_TECHS, list);
}
export function deleteWhyChooseUsTech(id: string): void {
  const list = getWhyChooseUsTechs().filter(t => t.id !== id);
  setLocal(KEYS.WHY_CHOOSE_US_TECHS, list);
}

export function getWhyChooseUsCTA(): WhyChooseUsCTA {
  return getLocal<WhyChooseUsCTA>(KEYS.WHY_CHOOSE_US_CTA, initialWhyChooseUsCTA);
}
export function saveWhyChooseUsCTA(cta: WhyChooseUsCTA): void {
  setLocal(KEYS.WHY_CHOOSE_US_CTA, cta);
}

// SERVICES CRUD
export function getServices(): Service[] {
  return getLocal<Service[]>(KEYS.SERVICES, initialServices);
}

export function saveService(service: Service): void {
  const list = getServices();
  const index = list.findIndex(item => item.id === service.id);
  if (index >= 0) {
    list[index] = service;
  } else {
    list.push(service);
  }
  setLocal(KEYS.SERVICES, list);
}

export function deleteService(id: string): void {
  const list = getServices().filter(item => item.id !== id);
  setLocal(KEYS.SERVICES, list);
}

// PORTFOLIO CRUD
export function getPortfolio(): PortfolioItem[] {
  return getLocal<PortfolioItem[]>(KEYS.PORTFOLIO, []);
}

export function savePortfolioItem(item: PortfolioItem): void {
  const list = getPortfolio();
  const index = list.findIndex(p => p.id === item.id);
  if (index >= 0) {
    list[index] = item;
  } else {
    list.push(item);
  }
  setLocal(KEYS.PORTFOLIO, list);
}

export function deletePortfolioItem(id: string): void {
  const list = getPortfolio().filter(item => item.id !== id);
  setLocal(KEYS.PORTFOLIO, list);
}

// BLOG CRUD
export function getBlogs(): BlogPost[] {
  return getLocal<BlogPost[]>(KEYS.BLOGS, initialBlogs);
}

export function saveBlogPost(post: BlogPost): void {
  const list = getBlogs();
  const index = list.findIndex(b => b.id === post.id);
  if (index >= 0) {
    list[index] = post;
  } else {
    list.push(post);
  }
  setLocal(KEYS.BLOGS, list);
}

export function deleteBlogPost(id: string): void {
  const list = getBlogs().filter(item => item.id !== id);
  setLocal(KEYS.BLOGS, list);
}

// FAQ CRUD
export function getFAQs(): FAQ[] {
  return getLocal<FAQ[]>(KEYS.FAQS, initialFAQs);
}

export function saveFAQ(faq: FAQ): void {
  const list = getFAQs();
  const index = list.findIndex(f => f.id === faq.id);
  if (index >= 0) {
    list[index] = faq;
  } else {
    list.push(faq);
  }
  setLocal(KEYS.FAQS, list);
}

export function deleteFAQ(id: string): void {
  const list = getFAQs().filter(item => item.id !== id);
  setLocal(KEYS.FAQS, list);
}

// TESTIMONIALS CRUD
export function getTestimonials(): Testimonial[] {
  return getLocal<Testimonial[]>(KEYS.TESTIMONIALS, initialTestimonials);
}

export function saveTestimonial(testimonial: Testimonial): void {
  const list = getTestimonials();
  const index = list.findIndex(t => t.id === testimonial.id);
  if (index >= 0) {
    list[index] = testimonial;
  } else {
    list.push(testimonial);
  }
  setLocal(KEYS.TESTIMONIALS, list);
}

export function deleteTestimonial(id: string): void {
  const list = getTestimonials().filter(item => item.id !== id);
  setLocal(KEYS.TESTIMONIALS, list);
}

// MESSAGES CRUD
export function getMessages(): ContactMessage[] {
  return getLocal<ContactMessage[]>(KEYS.MESSAGES, []);
}

export function addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  const list = getMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'unread'
  };
  list.unshift(newMsg); // Newest messages first
  setLocal(KEYS.MESSAGES, list);
  return newMsg;
}

export function updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied'): void {
  const list = getMessages();
  const index = list.findIndex(item => item.id === id);
  if (index >= 0) {
    list[index].status = status;
    setLocal(KEYS.MESSAGES, list);
  }
}

export function deleteMessage(id: string): void {
  const list = getMessages().filter(item => item.id !== id);
  setLocal(KEYS.MESSAGES, list);
}

// SUBSCRIBERS CRUD
export function getSubscribers(): Subscriber[] {
  return getLocal<Subscriber[]>(KEYS.SUBSCRIBERS, []);
}

export function addSubscriber(email: string): boolean {
  const list = getSubscribers();
  const cleaned = email.trim().toLowerCase();
  if (list.some(sub => sub.email === cleaned)) {
    return false; // Already subscribed
  }
  list.unshift({
    id: `sub-${Date.now()}`,
    email: cleaned,
    createdAt: new Date().toISOString()
  });
  setLocal(KEYS.SUBSCRIBERS, list);
  return true;
}

export function deleteSubscriber(id: string): void {
  const list = getSubscribers().filter(sub => sub.id !== id);
  setLocal(KEYS.SUBSCRIBERS, list);
}

// SITE SETTINGS
export function getSettings(): SiteSettings {
  return getLocal<SiteSettings>(KEYS.SETTINGS, defaultSiteSettings);
}

export function saveSettings(settings: SiteSettings): void {
  setLocal(KEYS.SETTINGS, settings);
}

// PRICING PACKAGES CRUD
export function getPricingPackages(): PricingPackage[] {
  return getLocal<PricingPackage[]>(KEYS.PRICING_PACKAGES, initialPricingPackages);
}

export function savePricingPackage(pkg: PricingPackage): void {
  const list = getPricingPackages();
  const index = list.findIndex(p => p.id === pkg.id);
  if (index >= 0) {
    list[index] = pkg;
  } else {
    list.push(pkg);
  }
  setLocal(KEYS.PRICING_PACKAGES, list);
}

export function deletePricingPackage(id: string): void {
  const list = getPricingPackages().filter(p => p.id !== id);
  setLocal(KEYS.PRICING_PACKAGES, list);
}

// PRICING ADDONS CRUD
export function getPricingAddons(): PricingAddon[] {
  return getLocal<PricingAddon[]>(KEYS.PRICING_ADDONS, initialPricingAddons);
}

export function savePricingAddon(addon: PricingAddon): void {
  const list = getPricingAddons();
  const index = list.findIndex(a => a.id === addon.id);
  if (index >= 0) {
    list[index] = addon;
  } else {
    list.push(addon);
  }
  setLocal(KEYS.PRICING_ADDONS, list);
}

export function deletePricingAddon(id: string): void {
  const list = getPricingAddons().filter(a => a.id !== id);
  setLocal(KEYS.PRICING_ADDONS, list);
}

// PRICING COMPARISONS CRUD
export function getPricingComparisons(): PricingComparison[] {
  return getLocal<PricingComparison[]>(KEYS.PRICING_COMPARISONS, initialPricingComparisons);
}

export function savePricingComparison(comp: PricingComparison): void {
  const list = getPricingComparisons();
  const index = list.findIndex(c => c.id === comp.id);
  if (index >= 0) {
    list[index] = comp;
  } else {
    list.push(comp);
  }
  setLocal(KEYS.PRICING_COMPARISONS, list);
}

export function deletePricingComparison(id: string): void {
  const list = getPricingComparisons().filter(c => c.id !== id);
  setLocal(KEYS.PRICING_COMPARISONS, list);
}

// PRICING QUOTE REQUESTS CRUD
export function getPricingQuotes(): PricingQuoteRequest[] {
  return getLocal<PricingQuoteRequest[]>(KEYS.PRICING_QUOTES, []);
}

export function addPricingQuote(quote: Omit<PricingQuoteRequest, 'id' | 'createdAt' | 'status'>): PricingQuoteRequest {
  const list = getPricingQuotes();
  const newQuote: PricingQuoteRequest = {
    ...quote,
    id: `quote-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  list.unshift(newQuote);
  setLocal(KEYS.PRICING_QUOTES, list);
  return newQuote;
}

export function updatePricingQuoteStatus(id: string, status: 'pending' | 'reviewed' | 'contacted'): void {
  const list = getPricingQuotes();
  const index = list.findIndex(q => q.id === id);
  if (index >= 0) {
    list[index].status = status;
    setLocal(KEYS.PRICING_QUOTES, list);
  }
}

export function deletePricingQuote(id: string): void {
  const list = getPricingQuotes().filter(q => q.id !== id);
  setLocal(KEYS.PRICING_QUOTES, list);
}

// DATABASE RESET
export function resetDatabaseToDefault(): void {
  localStorage.removeItem(KEYS.SERVICES);
  localStorage.removeItem(KEYS.PORTFOLIO);
  localStorage.removeItem(KEYS.BLOGS);
  localStorage.removeItem(KEYS.FAQS);
  localStorage.removeItem(KEYS.TESTIMONIALS);
  localStorage.removeItem(KEYS.SETTINGS);
  localStorage.removeItem(KEYS.MESSAGES);
  localStorage.removeItem(KEYS.SUBSCRIBERS);
  localStorage.removeItem(KEYS.PRICING_PACKAGES);
  localStorage.removeItem(KEYS.PRICING_ADDONS);
  localStorage.removeItem(KEYS.PRICING_COMPARISONS);
  localStorage.removeItem(KEYS.PRICING_QUOTES);
  localStorage.removeItem(KEYS.CURRENCIES);
  localStorage.removeItem(KEYS.CURRENCY_SETTINGS);
  localStorage.removeItem(KEYS.TESTIMONIAL_CATEGORIES);
  localStorage.removeItem(KEYS.TESTIMONIAL_VIDEOS);
  localStorage.removeItem(KEYS.TESTIMONIAL_STATISTICS);
  localStorage.removeItem(KEYS.CLIENT_LOGOS);
  localStorage.removeItem(KEYS.SUCCESS_STORIES);
  localStorage.removeItem(KEYS.REVIEW_SETTINGS);
  localStorage.removeItem(KEYS.LEGAL_POLICIES);
  localStorage.removeItem(KEYS.LEGAL_REVISIONS);
  localStorage.removeItem(KEYS.COOKIE_CATEGORIES);
  localStorage.removeItem(KEYS.COOKIE_SETTINGS);
  localStorage.removeItem(KEYS.WHY_CHOOSE_US_CARDS);
  localStorage.removeItem(KEYS.WHY_CHOOSE_US_STATS);
  localStorage.removeItem(KEYS.WHY_CHOOSE_US_BADGES);
  localStorage.removeItem(KEYS.WHY_CHOOSE_US_TECHS);
  localStorage.removeItem(KEYS.WHY_CHOOSE_US_CTA);
  localStorage.removeItem(KEYS.PROCESS_STEPS);
  localStorage.removeItem(KEYS.PROCESS_CTA);
  initDB();
}

// CURRENCY CRUD
export function getCurrencies(): Currency[] {
  const defaultCurrencies: Currency[] = [
    {
      id: 'curr-usd',
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      flag: '🇺🇸',
      exchangeRate: 1.0,
      enabled: true,
      isDefault: true,
      sortOrder: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'curr-eur',
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      flag: '🇪🇺',
      exchangeRate: 0.92,
      enabled: true,
      isDefault: false,
      sortOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'curr-gbp',
      name: 'British Pound',
      code: 'GBP',
      symbol: '£',
      flag: '🇬🇧',
      exchangeRate: 0.78,
      enabled: true,
      isDefault: false,
      sortOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'curr-bdt',
      name: 'Bangladeshi Taka',
      code: 'BDT',
      symbol: '৳',
      flag: '🇧🇩',
      exchangeRate: 117.5,
      enabled: true,
      isDefault: false,
      sortOrder: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  return getLocal<Currency[]>(KEYS.CURRENCIES, defaultCurrencies);
}

export function saveCurrency(currency: Currency): void {
  const list = getCurrencies();
  const index = list.findIndex(c => c.id === currency.id);
  if (index >= 0) {
    list[index] = { ...currency, updatedAt: new Date().toISOString() };
  } else {
    list.push({ ...currency, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  setLocal(KEYS.CURRENCIES, list);
}

export function deleteCurrency(id: string): void {
  const list = getCurrencies().filter(c => c.id !== id);
  setLocal(KEYS.CURRENCIES, list);
}

// CURRENCY SETTINGS
export function getCurrencySettings(): CurrencySettings {
  const defaultSettings: CurrencySettings = {
    enableLiveRates: true,
    decimalPrecision: 0,
    defaultCurrencyCode: 'USD'
  };
  return getLocal<CurrencySettings>(KEYS.CURRENCY_SETTINGS, defaultSettings);
}

export function saveCurrencySettings(settings: CurrencySettings): void {
  setLocal(KEYS.CURRENCY_SETTINGS, settings);
}

// TESTIMONIAL CATEGORIES CRUD
export function getTestimonialCategories(): TestimonialCategory[] {
  return getLocal<TestimonialCategory[]>(KEYS.TESTIMONIAL_CATEGORIES, initialTestimonialCategories);
}
export function saveTestimonialCategory(category: TestimonialCategory): void {
  const list = getTestimonialCategories();
  const index = list.findIndex(c => c.id === category.id);
  if (index >= 0) {
    list[index] = category;
  } else {
    list.push(category);
  }
  setLocal(KEYS.TESTIMONIAL_CATEGORIES, list);
}
export function deleteTestimonialCategory(id: string): void {
  const list = getTestimonialCategories().filter(c => c.id !== id);
  setLocal(KEYS.TESTIMONIAL_CATEGORIES, list);
}

// TESTIMONIAL VIDEOS CRUD
export function getTestimonialVideos(): TestimonialVideo[] {
  return getLocal<TestimonialVideo[]>(KEYS.TESTIMONIAL_VIDEOS, initialTestimonialVideos);
}
export function saveTestimonialVideo(video: TestimonialVideo): void {
  const list = getTestimonialVideos();
  const index = list.findIndex(v => v.id === video.id);
  if (index >= 0) {
    list[index] = video;
  } else {
    list.push(video);
  }
  setLocal(KEYS.TESTIMONIAL_VIDEOS, list);
}
export function deleteTestimonialVideo(id: string): void {
  const list = getTestimonialVideos().filter(v => v.id !== id);
  setLocal(KEYS.TESTIMONIAL_VIDEOS, list);
}

// CLIENT MOMENTS CRUD
export function getClientMoments(): ClientMoment[] {
  return getLocal<ClientMoment[]>(KEYS.CLIENT_MOMENTS, initialClientMoments);
}
export function saveClientMoment(moment: ClientMoment): void {
  const list = getClientMoments();
  const index = list.findIndex(m => m.id === moment.id);
  if (index >= 0) {
    list[index] = moment;
  } else {
    list.push(moment);
  }
  setLocal(KEYS.CLIENT_MOMENTS, list);
}
export function deleteClientMoment(id: string): void {
  const list = getClientMoments().filter(m => m.id !== id);
  setLocal(KEYS.CLIENT_MOMENTS, list);
}

// TESTIMONIAL STATISTICS CRUD
export function getTestimonialStatistics(): TestimonialStatistics {
  return getLocal<TestimonialStatistics>(KEYS.TESTIMONIAL_STATISTICS, initialTestimonialStatistics);
}
export function saveTestimonialStatistics(stats: TestimonialStatistics): void {
  setLocal(KEYS.TESTIMONIAL_STATISTICS, stats);
}

// CLIENT LOGOS CRUD
export function getClientLogos(): ClientLogo[] {
  return getLocal<ClientLogo[]>(KEYS.CLIENT_LOGOS, initialClientLogos);
}
export function saveClientLogo(logo: ClientLogo): void {
  const list = getClientLogos();
  const index = list.findIndex(l => l.id === logo.id);
  if (index >= 0) {
    list[index] = logo;
  } else {
    list.push(logo);
  }
  setLocal(KEYS.CLIENT_LOGOS, list);
}
export function deleteClientLogo(id: string): void {
  const list = getClientLogos().filter(l => l.id !== id);
  setLocal(KEYS.CLIENT_LOGOS, list);
}

// SUCCESS STORIES CRUD
export function getSuccessStories(): SuccessStory[] {
  return getLocal<SuccessStory[]>(KEYS.SUCCESS_STORIES, initialSuccessStories);
}
export function saveSuccessStory(story: SuccessStory): void {
  const list = getSuccessStories();
  const index = list.findIndex(s => s.id === story.id);
  if (index >= 0) {
    list[index] = story;
  } else {
    list.push(story);
  }
  setLocal(KEYS.SUCCESS_STORIES, list);
}
export function deleteSuccessStory(id: string): void {
  const list = getSuccessStories().filter(s => s.id !== id);
  setLocal(KEYS.SUCCESS_STORIES, list);
}

// REVIEW SETTINGS CRUD
export function getReviewSettings(): ReviewSettings {
  return getLocal<ReviewSettings>(KEYS.REVIEW_SETTINGS, defaultReviewSettings);
}
export function saveReviewSettings(settings: ReviewSettings): void {
  setLocal(KEYS.REVIEW_SETTINGS, settings);
}

// LEGAL POLICIES CRUD
export function getLegalPolicies(): LegalPolicy[] {
  return getLocal<LegalPolicy[]>(KEYS.LEGAL_POLICIES, initialLegalPolicies);
}

export function saveLegalPolicy(policy: LegalPolicy): void {
  const list = getLegalPolicies();
  const index = list.findIndex(p => p.id === policy.id);
  
  if (index >= 0) {
    const oldPolicy = list[index];
    const sectionsChanged = JSON.stringify(oldPolicy.sections) !== JSON.stringify(policy.sections);
    const versionChanged = oldPolicy.version !== policy.version;
    
    if (sectionsChanged || versionChanged) {
      addLegalRevision({
        id: `rev-${Date.now()}`,
        policyId: policy.id,
        version: policy.version,
        updatedAt: new Date().toISOString(),
        updatedBy: 'Sanjid Ahmed (Chief Legal Officer)',
        changeSummary: sectionsChanged 
          ? `Updated policy content and sections. (Previous: ${oldPolicy.version})` 
          : `Bumped version from ${oldPolicy.version} to ${policy.version}.`,
        sections: policy.sections
      });
    }
    list[index] = policy;
  } else {
    list.push(policy);
  }
  setLocal(KEYS.LEGAL_POLICIES, list);
}

export function deleteLegalPolicy(id: string): void {
  const list = getLegalPolicies().filter(p => p.id !== id);
  setLocal(KEYS.LEGAL_POLICIES, list);
}

// LEGAL REVISIONS CRUD
export function getLegalRevisions(): LegalRevision[] {
  return getLocal<LegalRevision[]>(KEYS.LEGAL_REVISIONS, initialLegalRevisions);
}

export function addLegalRevision(revision: LegalRevision): void {
  const list = getLegalRevisions();
  list.unshift(revision);
  setLocal(KEYS.LEGAL_REVISIONS, list);
}

export function deleteLegalRevision(id: string): void {
  const list = getLegalRevisions().filter(r => r.id !== id);
  setLocal(KEYS.LEGAL_REVISIONS, list);
}

// COOKIE CATEGORIES CRUD
export function getCookieCategories(): CookieCategory[] {
  return getLocal<CookieCategory[]>(KEYS.COOKIE_CATEGORIES, initialCookieCategories);
}

export function saveCookieCategory(category: CookieCategory): void {
  const list = getCookieCategories();
  const index = list.findIndex(c => c.id === category.id);
  if (index >= 0) {
    list[index] = category;
  } else {
    list.push(category);
  }
  setLocal(KEYS.COOKIE_CATEGORIES, list);
}

export function deleteCookieCategory(id: string): void {
  const list = getCookieCategories().filter(c => c.id !== id);
  setLocal(KEYS.COOKIE_CATEGORIES, list);
}

// COOKIE SETTINGS
export function getCookieSettings(): CookieSettings {
  return getLocal<CookieSettings>(KEYS.COOKIE_SETTINGS, defaultCookieSettings);
}

export function saveCookieSettings(settings: CookieSettings): void {
  setLocal(KEYS.COOKIE_SETTINGS, settings);
}

// PROCESS STEPS & CTA GETTERS & SETTERS
export function getProcessSteps(): ProcessStep[] {
  return getLocal<ProcessStep[]>(KEYS.PROCESS_STEPS, initialProcessSteps);
}

export function saveProcessStep(step: ProcessStep): void {
  const list = getProcessSteps();
  const index = list.findIndex(s => s.id === step.id);
  if (index >= 0) {
    list[index] = step;
  } else {
    list.push(step);
  }
  setLocal(KEYS.PROCESS_STEPS, list);
}

export function deleteProcessStep(id: string): void {
  const list = getProcessSteps().filter(s => s.id !== id);
  setLocal(KEYS.PROCESS_STEPS, list);
}

export function getProcessCTA(): ProcessCTA {
  return getLocal<ProcessCTA>(KEYS.PROCESS_CTA, initialProcessCTA);
}

export function saveProcessCTA(cta: ProcessCTA): void {
  setLocal(KEYS.PROCESS_CTA, cta);
}

// Tech Service Cards operations
export function getTechServiceCards(): TechServiceCard[] {
  return getLocal<TechServiceCard[]>(KEYS.TECH_SERVICE_CARDS, initialTechServiceCards);
}

export function saveTechServiceCard(card: TechServiceCard): void {
  const list = getTechServiceCards();
  const index = list.findIndex(c => c.id === card.id);
  if (index >= 0) {
    list[index] = card;
  } else {
    list.push(card);
  }
  setLocal(KEYS.TECH_SERVICE_CARDS, list);
}

export function deleteTechServiceCard(id: string): void {
  const list = getTechServiceCards().filter(c => c.id !== id);
  setLocal(KEYS.TECH_SERVICE_CARDS, list);
}

export function restoreTechServiceCards(): void {
  setLocal(KEYS.TECH_SERVICE_CARDS, initialTechServiceCards);
}




