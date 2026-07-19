/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, PortfolioItem, BlogPost, Testimonial, FAQ, SiteSettings, PricingPackage, PricingAddon, PricingComparison, TechServiceCard } from '@/types';

export const initialServices: Service[] = [
  
  {
    id: '1',
    category: 'Development',
    titleEn: 'Website Development',
    titleBn: 'ওয়েবসাইট ডেভেলপমেন্ট',
    descriptionEn: 'High-converting, responsive, and pixel-perfect corporate and e-commerce websites designed to scale your sales pipeline and global reach.',
    descriptionBn: 'উচ্চ কনভার্সন রেট, রেসপনসিভ এবং পিক্সেল-পারফেক্ট কর্পোরেট ও ই-কমার্স ওয়েবসাইট যা আপনার সেলস ও বৈশ্বিক ব্র্যান্ডিং বৃদ্ধি করবে।',
    featuresEn: ['Corporate Brand Websites', 'Ultra-fast WooCommerce & Shopify', 'Bespoke Jamstack Landing Pages', 'Custom Headless CMS Engine', 'Full Website Redesign'],
    featuresBn: ['কর্পোরেট ব্র্যান্ড ওয়েবসাইট', 'আল্ট্রা-ফাস্ট ই-কমার্স', ' Jamstack ল্যান্ডিং পেজ', 'কাস্টম হেডলেস সিএমএস', 'সম্পূর্ণ ওয়েবসাইট রিডিজাইন'],
    benefitsEn: ['Stunning initial engagement rates', 'Optimized visual loading speeds', 'Effortless content publishing systems', 'Seamless payment collection integrations'],
    benefitsBn: ['চমৎকার ভিজিটর এনগেজমেন্ট', 'দ্রুত লোডিং স্পিড', 'সহজ কন্টেন্ট পাবলিশিং সিস্টেম', 'নিরাপদ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন'],
    price: '$1,999',
    icon: 'Code2',
    slug: 'web-development',
    processEn: ['Persona & Competitor Discovery', 'Wireframing & Typography System', 'Fluid Tailwind Code Assemblies', 'SEO Meta Tags & Sitemap Generation', 'Fast Global Cloudflare Edge Launch'],
    processBn: ['প্রতিযোগী ও অডিয়েন্স রিসার্চ', 'ওয়্যারফ্রেমিং ও টাইপোগ্রাফি', 'Tailwind কোড ডেভেলপমেন্ট', 'এসইও মেটা ট্যাগ ও সাইটম্যাপ', 'ক্লাউডফ্লেয়ার এজ লঞ্চ'],
    techUsed: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Shopify', 'WooCommerce', 'PHP', 'Laravel', 'Supabase', 'Cloudflare', 'Vercel'],
    subtitleEn: 'Stunning, fast corporate identities, high-conversion landing pages, and robust multi-vendor e-commerce portals.',
    subtitleBn: 'চমৎকার, দ্রুত কর্পোরেট ওয়েবসাইট, হাই-কনভার্সন ল্যান্ডিং পেজ এবং শক্তিশালী মাল্টি-ভেন্ডর ই-কমার্স পোর্টাল।',
    whyNeedEn: 'Your website is your 24/7 global storefront. A slow or poorly laid out page results in direct client loss to faster competitors.',
    whyNeedBn: 'আপনার ওয়েবসাইট হল আপনার ২৪/৭ বৈশ্বিক শোরুম। একটি ধীরগতির পেজ সরাসরি কাস্টমারদের প্রতিযোগীদের দিকে ধাবিত করে।',
    whoForEn: 'B2B corporations, online retailers, real estate brokerages, educational institutions, and luxury lifestyle brands.',
    whoForBn: 'বিটুবি কর্পোরেশন, অনলাইন রিটেইলার, রিয়েল এস্টেট ব্রোকারেজ, শিক্ষা প্রতিষ্ঠান এবং লাক্সারি লাইফস্টাইল ব্র্যান্ড।',
    businessImpactEn: 'Achieves a 100/100 Google Lighthouse speed index, increases leads inquiries by up to 85%, and builds outstanding brand trust.',
    businessImpactBn: 'গুগল লাইটহাউস স্পিড ইনডেক্স ১০০/১০০ অর্জন করে, লিড ইনকোয়ারি ৮৫% পর্যন্ত বৃদ্ধি করে এবং গভীর ব্র্যান্ড বিশ্বাস গড়ে তোলে।',
    subServicesJson: JSON.stringify([
      { titleEn: 'Business Website', titleBn: 'ব্যবসায়িক ওয়েবসাইট', descEn: 'Professional identity layouts optimized for local leads.', descBn: 'স্থানীয় লিডের জন্য অপ্টিমাইজড পেশাদার ওয়েবসাইট।' },
      { titleEn: 'Ecommerce Website', titleBn: 'ই-কমার্স ওয়েবসাইট', descEn: 'High conversion shopping carts and secure checkouts.', descBn: 'উচ্চ কনভার্সন শপিং কার্ট এবং নিরাপদ চেকআউট।' },
      { titleEn: 'Landing Page', titleBn: 'ল্যান্ডিং পেজ', descEn: 'Single-focus product validation pages with heavy CTA hooks.', descBn: 'ভারী সিটিএ হুক সহ একক-ফোকাস প্রোডাক্ট পেজ।' },
      { titleEn: 'Multi Vendor Ecommerce', titleBn: 'মাল্টি ভেন্ডর ই-কমার্স', descEn: 'Complex marketplace enabling external vendor registration.', descBn: 'বহিরাগত বিক্রেতাদের জন্য ই-কমার্স মার্কেটপ্লেস।' },
      { titleEn: 'Custom CMS Portal', titleBn: 'কাস্টম সিএমএস পোর্টাল', descEn: 'Bespoke administrator panels built with custom databases.', descBn: 'কাস্টম ডাটাবেস সহ বেসপোক এডমিন প্যানেল।' },
      { titleEn: 'Website Redesign', titleBn: 'ওয়েবসাইট রিডিজাইন', descEn: 'Total modern visual restructuring for legacy frontends.', descBn: 'পুরানো ফ্রন্টএন্ডের জন্য সম্পূর্ণ আধুনিক ভিজ্যুয়াল পুনর্গঠন।' },
      { titleEn: 'Website Speed Optimization', titleBn: 'স্পিড অপ্টিমাইজেশন', descEn: 'Asset minification, image compression and global caching.', descBn: 'অ্যাসেট মিনিফিকেশন, ইমেজ কম্প্রেশন এবং বৈশ্বিক ক্যাশিং।' },
      { titleEn: 'Hospital & School Portals', titleBn: 'হাসপাতাল ও স্কুল পোর্টাল', descEn: 'Specialized reservation, student and schedule portals.', descBn: 'বিশেষায়িত রিজার্ভেশন, স্টুডেন্ট এবং শিডিউল পোর্টাল।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Is my website going to be mobile-friendly?', questionBn: 'আমার ওয়েবসাইটটি কি মোবাইল-বান্ধব হবে?', answerEn: 'Yes, every single page is designed with strict responsive CSS, rendering beautifully across all mobile and tablet resolutions.', answerBn: 'হ্যাঁ, প্রতিটি পেজ নিখুঁত মোবাইল রেসপনসিভ ডিজাইনে তৈরি করা হয়।' },
      { questionEn: 'Do you help with domain purchase and hosting configuration?', questionBn: 'আপনারা কি ডোমেইন এবং হোস্টিং কনফিগারেশনে সাহায্য করেন?', answerEn: 'Absolutely. We set up your DNS, configure SSL certificates, and hook up free high-speed CDN distribution.', answerBn: 'অবশ্যই। আমরা ডিএনএস সেটআপ, এসএসএল সার্টিফিকেট এবং হাই-স্পিড সিডিএন কনফিগার করে দিই।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'Corporate Site', nameBn: 'কর্পোরেট সাইট', price: '$1,999', periodEn: 'Complete Build', periodBn: 'সম্পূর্ণ বিল্ড', featuresEn: ['Up to 10 Premium Pages', '100% Custom Figma Layout', 'Responsive Tailwind Styling', 'Contact Leads Database Integration', 'SEO Schema Setup', '3 Months System Maintenance'], featuresBn: ['১০টি পর্যন্ত প্রিমিয়াম পেজ', '১০০% কাস্টম ফিগমা লেআউট', 'রেসপনসিভ Tailwind স্টাইলিং', 'লিডস ডাটাবেস ইন্টিগ্রেশন', 'এসইও স্কিমা সেটআপ', '৩ মাসের সিস্টেম রক্ষণাবেক্ষণ'] },
      { nameEn: 'Custom E-Commerce', nameBn: 'কাস্টম ই-কমার্স', price: '$3,499', periodEn: 'Scale Package', periodBn: 'স্কেল প্যাকেজ', featuresEn: ['Fully Functional Online Store', 'Secure Payment Gateways (Stripe/SSL)', 'Admin Inventory & CRM Suite', 'Auto Invoice & Email Notification', 'Customer Accounts System', '6 Months Free Tech SLA Support'], featuresBn: ['সম্পূর্ণ ই-কমার্স অনলাইন স্টোর', 'নিরাপদ পেমেন্ট গেটওয়ে (Stripe/SSL)', 'ইনভেন্টরি ও সিআরএম স্যুট', 'অটো ইনভয়েস ও ইমেল নোটিফিকেশন', 'গ্রাহক অ্যাকাউন্ট সিস্টেম', '৬ মাসের ফ্রি টেকনিক্যাল এসএলএ সাপোর্ট'] }
    ])
  },
  {
    id: '2',
    category: 'Design',
    titleEn: 'UI/UX Design',
    titleBn: 'ইউআই/ইউএক্স এবং প্রোডাক্ট ডিজাইন',
    descriptionEn: 'Immersive and user-centric interfaces designed to maximize engagement, elevate brand perception, and simplify complex workflows.',
    descriptionBn: 'ব্যবহারকারী-কেন্দ্রিক ডিজাইন যা সর্বোচ্চ এনগেজমেন্ট, ব্র্যান্ড ভ্যালু বৃদ্ধি এবং জটিল ওয়ার্কф্লোকে সহজ করতে সাহায্য করে।',
    featuresEn: ['Interactive High-Fi Prototypes', 'Comprehensive Design Systems', 'User Research & Persona Mapping', 'Wireframing & Site Maps', 'Usability Testing Sessions'],
    featuresBn: ['ইন্টারেক্টিভ হাই-ফাই প্রোটোটাইপ', 'বিস্তৃত ডিজাইন সিস্টেম', 'ব্যবহারকারী গবেষণা ও পার্সোনা ম্যাপিং', 'ওয়্যারফ্রেমিং ও সাইট ম্যাপ', 'ব্যবহারযোগ্যতা পরীক্ষা সেশন'],
    benefitsEn: ['Higher user retention rates', 'Reduced support overhead', 'Flawless multi-device consistency', 'Clear visual hierarchy'],
    benefitsBn: ['উচ্চতর ইউজার রিটেনশন রেট', 'সাপোর্ট ওভারহেড হ্রাস', 'নিখুঁত মাল্টি-ডিভাইস সামঞ্জস্যতা', 'স্পষ্ট ভিজ্যুয়াল হায়ারার্কি'],
    price: '$2,999',
    icon: 'Layout',
    slug: 'ui-ux-design',
    processEn: ['Empathize & Discover User Goals', 'Information Architecture Planning', 'Figma Wireframing & Prototyping', 'User Feedback Loop & Iteration', 'Developer Handoff with Clean Design Assets'],
    processBn: ['ব্যবহারকারীর লক্ষ্য আবিষ্কার', 'তথ্য আর্কিটেকচার পরিকল্পনা', 'ফিগমা ওয়্যারফ্রেমিং ও প্রোটোটাইপিং', 'ব্যবহারকারীর মতামত ও সংস্করণ পরিবর্তন', 'সহজ ডেভেলপার হ্যান্ডঅফ'],
    techUsed: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop'],
    subtitleEn: 'Converting raw concepts into jaw-dropping digital products with high-fidelity interactive wireframes and unified design systems.',
    subtitleBn: 'হাই-ফিডেলিটি ওয়্যারফ্রেম এবং ইউনিফাইড ডিজাইন সিস্টেমের সাহায্যে কাঁচা ধারণাগুলোকে আকর্ষণীয় ডিজিটাল প্রোডাক্টে রূপান্তর করা।',
    whyNeedEn: 'An intuitive design system removes cognitive friction. If users cannot find what they need in 3 seconds, they leave.',
    whyNeedBn: 'সহজ ইউজার ইন্টারফেস ব্যবহারকারীর মানসিক ক্লান্তি দূর করে। যদি ৩ সেকেন্ডে প্রয়োজনীয় জিনিস খুঁজে না পাওয়া যায়, তবে ব্যবহারকারী সাইট ছেড়ে চলে যান।',
    whoForEn: 'SaaS companies, fintech portals, digital healthcare products, and complex consumer mobile applications.',
    whoForBn: 'সাশ কোম্পানি, ফিনটেক পোর্টাল, ডিজিটাল হেলথকেয়ার প্রোডাক্ট এবং জটিল কনজিউমার মোবাইল অ্যাপ্লিকেশন।',
    businessImpactEn: 'Triggers a massive 200% jump in product activation rates and significantly reduces support ticketing volume by making workflows self-explanatory.',
    businessImpactBn: 'প্রোডাক্ট অ্যাক্টিভেশন রেট ২০০% পর্যন্ত বাড়িয়ে দেয় এবং ওয়ার্কফ্লোকে সহজ করার মাধ্যমে সাপোর্ট টিকিটের চাপ অনেক কমিয়ে দেয়।',
    subServicesJson: JSON.stringify([
      { titleEn: 'Website UI Design', titleBn: 'ওয়েবসাইট ইউআই ডিজাইন', descEn: 'High contrast web landing structures to optimize clicks.', descBn: 'ক্লিক অপ্টিমাইজ করতে উচ্চ-কন্ট্রাস্ট ওয়েব ল্যান্ডিং লেআউট।' },
      { titleEn: 'Dashboard UI Layout', titleBn: 'ড্যাশবোর্ড ইউআই', descEn: 'Clean, dense visual representation of complex analytics.', descBn: 'জটিল অ্যানালিটিক্স ডেটার পরিচ্ছন্ন ও ঘন ভিজ্যুয়াল উপস্থাপন।' },
      { titleEn: 'Mobile App UI', titleBn: 'মোবাইল অ্যাপ ইউআই', descEn: 'Pixel perfect iOS and Android layouts.', descBn: 'আইওএস এবং অ্যান্ড্রয়েডের জন্য পিক্সেল পারফেক্ট লেআউট।' },
      { titleEn: 'Comprehensive Design System', titleBn: 'ডিজাইন সিস্টেম', descEn: 'Reusable components, tokens, typography rules, and guides.', descBn: 'পুনর্ব্যবহারযোগ্য উপাদান, টোকেন এবং টাইপোগ্রাফি নিয়ম।' },
      { titleEn: 'Interactive Prototyping', titleBn: 'ইন্টারেক্টিভ প্রোটোটাইপিং', descEn: 'Clickable realistic desktop animations for validation.', descBn: 'যাচাইকরণের জন্য ক্লিকযোগ্য বাস্তবসম্মত অ্যানিমেশন প্রোটোটাইপ।' },
      { titleEn: 'Expert Design Audit', titleBn: 'ডিজাইন অডিট', descEn: 'Detailed analytical reports targeting usability bottlenecks.', descBn: 'ইউজাবিলিটির দুর্বলতাগুলো চিহ্নিত করে বিস্তারিত বিশ্লেষণাত্মক রিপোর্ট।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Do you design in Figma?', questionBn: 'আপনারা কি ফিজমাতে ডিজাইন করেন?', answerEn: 'Yes, our primary designing workspace is Figma, facilitating real-time comments and flawless developer collaboration.', answerBn: 'হ্যাঁ, আমাদের প্রধান ডিজাইনিং টুল হলো Figma, যা রিয়েল-টাইম কমেন্ট ও সহজে কোড করার সুবিধা দেয়।' },
      { questionEn: 'What is a design system and why do we need it?', questionBn: 'ডিজাইন সিস্টেম কী এবং কেন এটি প্রয়োজন?', answerEn: 'A design system is a central visual library containing typography rules, colors, and reusable button variants to maintain absolute UI consistency across web and mobile products.', answerBn: 'ডিজাইন সিস্টেম হলো একটি সেন্ট্রাল ভিজ্যুয়াল লাইব্রেরি যা ওয়েব ও মোবাইল অ্যাপে ডিজাইনের সামঞ্জস্য বজায় রাখে।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'Prototyping Kit', nameBn: 'প্রোটোটাইপিং কিট', price: '$2,999', periodEn: 'Single Scope', periodBn: 'একক স্কোপ', featuresEn: ['Up to 8 Custom Viewports', 'User Flow Matrix Diagram', 'Figma Interactive Clicking Prototype', 'Typography & Palette Guide', 'Developer Asset Handoff Pack'], featuresBn: ['৮টি পর্যন্ত কাস্টম ভিউপোর্ট', 'ইউজার ফ্লো ম্যাট্রিক্স ডায়াগ্রাম', 'ফিগমা ইন্টারেক্টিভ প্রোটোটাইপ', 'টাইপোগ্রাফি ও কালার গাইড', 'সহজ ডেভেলপার অ্যাসেট হ্যান্ডঅফ'] },
      { nameEn: 'Full Design System', nameBn: 'কমপ্লিট ডিজাইন সিস্টেম', price: '$5,999', periodEn: 'Product Package', periodBn: 'প্রোডাক্ট প্যাকেজ', featuresEn: ['Up to 30 Premium App Views', 'Comprehensive Design System Tokens', 'Multi-device UI Layouts (Web/iOS)', 'User Validation Testing Session', 'Dedicated Senior Design Architect', 'Weekly Iterations Sprint Sync'], featuresBn: ['৩০টি পর্যন্ত প্রিমিয়াম অ্যাপ ভিউ', 'সম্পূর্ণ ডিজাইন সিস্টেম টোকেন', 'মাল্টি-ডিভাইস ইউআই লেআউট (Web/iOS)', 'ইউজার ভ্যালিডেশন টেস্টিং সেশন', 'ডেডিকেটেড সিনিয়র ডিজাইন আর্কিটেক্ট', 'সাপ্তাহিক ইটারেশন স্প্রিন্ট সিঙ্ক'] }
    ])
  },
  {
    id: '3',
    category: 'Marketing',
    titleEn: 'Digital Marketing',
    titleBn: 'ডিজিটাল মার্কেটিং এবং গ্রোথ',
    descriptionEn: 'High-ROI digital advertising campaigns and conversion rate optimization campaigns designed to supercharge acquisition.',
    descriptionBn: 'উচ্চ-আরওআই ডিজিটাল বিজ্ঞাপন ক্যাম্পেইন এবং কনভার্সন রেট অপ্টিমাইজেশন ক্যাম্পেইন যা নতুন কাস্টমার আকর্ষণ ত্বরান্বিত করে।',
    featuresEn: ['Paid Ads (Google, Meta, LinkedIn)', 'Conversion Rate Optimization (CRO)', 'Funnel Strategy & Architecture', 'Email Marketing Automations', 'Advanced Analytics Dashboarding'],
    featuresBn: ['পেইড অ্যাডস (গুগল, মেটা, লিঙ্কডইন)', 'কনভার্সন রেট অপ্টিমাইজেশন', 'ফানেল স্ট্র্যাটেজি ও আর্কিটেকচার', 'ইমেল মার্কেটিং অটোমেশন', 'উন্নত অ্যানালিটিক্স ড্যাশবোর্ড'],
    benefitsEn: ['Instant customer acquisition scaling', 'Optimized CAC/LTV ratios', 'Predictable pipeline growth', 'Hyper-targeted audience reach'],
    benefitsBn: ['তাত্ক্ষণিক কাস্টমার একুইজিশন স্কেলিং', 'অপ্টিমাইজড সিএসি/এলটিভি রেশিও', 'পূর্বাভাসযোগ্য পাইপলাইন বৃদ্ধি', 'হাইপার-টার্গেটেড অডিয়েন্স রিচ'],
    price: '$2,499',
    icon: 'Megaphone',
    slug: 'digital-marketing',
    processEn: ['Audience Persona Research', 'Multi-Channel Funnel Architecture', 'Creative & Ad Copy Engineering', 'A/B Testing & Budget Optimization', 'Live Performance Attribution Tracking'],
    processBn: ['অডিয়েন্স পার্সোনা রিসার্চ', 'মাল্টি-চ্যানেল ফানেল আর্কিটেকচার', 'ক্রিয়েটিভ ও অ্যাড কপি ইঞ্জিনিয়ারিং', 'এ/বি টেস্টিং ও বাজেট অপ্টিমাইজেশন', 'লাইভ পারফরম্যান্স ট্র্যাকিং'],
    techUsed: ['Meta Ads Manager', 'Google Ads', 'Google Analytics', 'Google Tag Manager', 'Search Console', 'Ahrefs', 'SEMrush'],
    subtitleEn: 'Accelerating digital user acquisition, customer retention, and scalable business revenue via calculated multi-channel marketing campaigns.',
    subtitleBn: 'মাল্টি-চ্যানেল মার্কেটিং ক্যাম্পেইনের মাধ্যমে ডিজিটাল ইউজার একুইজিশন, কাস্টমার রিটেনশন এবং রেভিনিউ বৃদ্ধি করা।',
    whyNeedEn: 'With traditional media fading, digital ad campaigns provide hyper-targeted client parameters, real-time ROI transparency, and rapid scaling metrics.',
    whyNeedBn: 'ডিজিটাল বিজ্ঞাপন ক্যাম্পেইন হাইপার-টার্গেটেড অডিয়েন্স প্যারামিটার, রিয়েল-টাইম আরওআই এবং দ্রুত স্কেলিংয়ের সুযোগ দেয়।',
    whoForEn: 'E-commerce operations, local service businesses, SaaS platforms, and enterprise business units hungry for predictable lead pipelines.',
    whoForBn: 'ই-কমার্স অপারেশন, স্থানীয় সেবামূলক ব্যবসা, সাশ প্ল্যাটফর্ম এবং এন্টারপ্রাইজ যারা নিয়মিত কাস্টমার লিড পেতে চায়।',
    businessImpactEn: 'Drastically lowers client acquisition costs (CAC) by up to 50% and scales sales revenue using calculated and structured funnel layouts.',
    businessImpactBn: 'কাস্টমার একুইজিশন খরচ (CAC) ৫০% পর্যন্ত কমিয়ে দেয় এবং সুনির্দিষ্ট ফানেলের সাহায্যে সেলস রেভিনিউ বাড়ায়।',
    subServicesJson: JSON.stringify([
      { titleEn: 'Facebook & Instagram Ads', titleBn: 'মেটা বিজ্ঞাপন', descEn: 'Immersive graphic campaigns with custom pixel event tracking.', descBn: 'কাস্টম পিক্সেল ইভেন্ট ট্র্যাকিং সহ মেটা বিজ্ঞাপন।' },
      { titleEn: 'Google Search & Display Ads', titleBn: 'গুগল বিজ্ঞাপন', descEn: 'High-intent search campaigns targeting active customers.', descBn: 'সক্রিয় ক্রেতাদের টার্গেট করে হাই-ইনটেন্ট সার্চ ক্যাম্পেইন।' },
      { titleEn: 'Lead Generation Funnels', titleBn: 'লিড জেনারেশন ফানেল', descEn: 'Landing layout capture zones optimized for high conversion.', descBn: 'উচ্চ কনভার্সনের জন্য অপ্টিমাইজড ল্যান্ডিং পেজ ক্যাপচার জোন।' },
      { titleEn: 'Email Marketing Automation', titleBn: 'ইমেল মার্কেটিং অটোমেশন', descEn: 'Automated newsletter sequences to nurture leads.', descBn: 'লিড নার্চার করার জন্য স্বয়ংক্রিয় নিউজলেটার সিকোয়েন্স।' },
      { titleEn: 'Social Media Management', titleBn: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট', descEn: 'Consistent profile curation, templates and audience sync.', descBn: 'নিয়মিত প্রোফাইল কিউরেশন, টেমপ্লেট এবং অডিয়েন্স ম্যানেজমেন্ট।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Is ad spend included in your retainer fee?', questionBn: 'বিজ্ঞাপনের খরচ কি আপনাদের ফি-এর অন্তর্ভুক্ত?', answerEn: 'No, ad budgets are paid directly to Meta or Google. Our agency fee strictly covers campaign design, copywriting, monitoring, and funnel engineering.', answerBn: 'না, বিজ্ঞাপনের বাজেট সরাসরি মেটা বা গুগলকে প্রদান করতে হয়। আমাদের ফি শুধুমাত্র ক্যাম্পেইন ডিজাইন ও অপ্টিমাইজেশনের জন্য।' },
      { questionEn: 'How long does it take to see positive ROI?', questionBn: 'ইতিবাচক আরওআই দেখতে কত সময় লাগে?', answerEn: 'Typically, the testing phase takes 14 to 30 days, after which we scale winning campaigns to secure maximum return on ad spend.', answerBn: 'সাধারণত টেস্টিং ফেজ ১৪ থেকে ৩০ দিন সময় নেয়, এরপর ক্যাম্পেইন স্কেল করে সর্বোচ্চ রিটার্ন নিশ্চিত করা হয়।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'Growth Launchpad', nameBn: 'গ্রোথ লঞ্চপ্যাড', price: '$1,499', periodEn: 'Per Month', periodBn: 'প্রতি মাসে', featuresEn: ['1 Core Advertising Channel', 'Up to 5 Ad Creatives Designs', 'Landing Page Copy Audit', 'Meta Pixel Set Up & Debugging', 'Bi-weekly Analytical Reports'], featuresBn: ['১টি প্রধান বিজ্ঞাপন চ্যানেল', '৫টি পর্যন্ত অ্যাড ক্রিয়েটিভ ডিজাইন', 'ল্যান্ডিং পেজ কপি অডিট', 'মেটা পিক্সেল সেটআপ ও ডিব্যাগিং', 'পাক্ষিক অ্যানালিটিক্যাল রিপোর্ট'] },
      { nameEn: 'Enterprise Scaling', nameBn: 'এন্টারপ্রাইজ স্কেলিং', price: '$2,999', periodEn: 'Per Month', periodBn: 'প্রতি মাসে', featuresEn: ['Multi-channel Ads (Meta + Google)', 'Conversion Rate Optimization (CRO)', 'Email Nurturing Sequences Set Up', 'Advanced Google Tag Manager Setup', 'A/B Creative Matrix Tests', 'Weekly Video Sync Reviews'], featuresBn: ['মাল্টি-চ্যানেল অ্যাডস (মেটা + গুগল)', 'কনভার্সন রেট অপ্টিমাইজেশন (CRO)', 'ইমেল নার্চারিং সিকোয়েন্স সেটআপ', 'উন্নত গুগল ট্যাগ ম্যানেজার সেটআপ', 'সাপ্তাহিক ভিডিও রিভিউ মিটিং'] }
    ])
  },
  {
    id: '4',
    category: 'Marketing',
    titleEn: 'Search Engine Optimization (SEO)',
    titleBn: 'সার্চ ইঞ্জিন অপ্টিমাইজেশন (এসইও)',
    descriptionEn: 'Data-driven search engine optimization to rank you at the top of Google, capture organic high-intent traffic, and scale revenue.',
    descriptionBn: 'গুগলের শীর্ষে আপনার র‍্যাংক নিশ্চিত করতে ডেটা-চালিত সার্চ ইঞ্জিন অপ্টিমাইজেশন, যা অর্গানিক ট্রাফিক ও রেভিনিউ বৃদ্ধি করে।',
    featuresEn: ['Deep Keyword Intelligence', 'On-Page Content Engineering', 'Technical Architecture SEO audit', 'Premium Editorial Link Building', 'Schema.org JSON-LD Markup'],
    featuresBn: ['গভীর কিওয়ার্ড ইন্টেলিজেন্স', 'অন-পেজ কন্টেন্ট ইঞ্জিনিয়ারিং', 'টেকনিক্যাল অডিট', 'প্রিমিয়াম লিঙ্ক বিল্ডিং', 'স্কিমা মার্কআপ'],
    benefitsEn: ['Consistent passive leads flow', 'Reduced dependent ad-spend', 'Industry authority positioning', 'Sustainable long-term growth'],
    benefitsBn: ['ধারাবাহিক প্যাসিভ লিড ফ্লো', 'বিজ্ঞাপন খরচের উপর নির্ভরশীলতা হ্রাস', 'ইন্ডাস্ট্রি অথরিটি পজিশনিং', 'টেকসই দীর্ঘমেয়াদী প্রবৃদ্ধি'],
    price: '$1,499',
    icon: 'Search',
    slug: 'seo',
    processEn: ['Comprehensive Technical Audit', 'Keyword Intent Mapping & Competitor Intel', 'On-Page Copy Optimization', 'High-Authority Backlink Acquisition', 'Monthly KPI & Revenue Growth Reporting'],
    processBn: ['টেকনিক্যাল অডিট', 'কিওয়ার্ড ইনটেন্ট ম্যাপিং', 'অন-পেজ কপি অপ্টিমাইজেশন', 'ব্যাকলিংক অর্জন', 'মাসিক প্রবৃদ্ধি রিপোর্ট'],
    techUsed: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Google Analytics', 'Screaming Frog'],
    subtitleEn: 'Conquer Google’s first page, capture high-intent passive search queries, and scale long-term organic traffic revenue.',
    subtitleBn: 'গুগলের প্রথম পৃষ্ঠা দখল করুন, হাই-ইনটেন্ট প্যাসিভ সার্চ কুয়েরি ক্যাপচার করুন এবং দীর্ঘমেয়াদী অর্গানিক ট্রাফিক বৃদ্ধি করুন।',
    whyNeedEn: 'Paid ads vanish once budget stops. SEO creates an evergreen, compounding digital asset that generates high-intent leads day and night for free.',
    whyNeedBn: 'বিজ্ঞাপনের বাজেট শেষ হলে লিড আসা বন্ধ হয়ে যায়। কিন্তু এসইও দীর্ঘমেয়াদী অর্গানিক ট্রাফিক ও ফ্রি কাস্টমার লিড নিশ্চিত করে।',
    whoForEn: 'Local service businesses, global e-commerce brands, legal offices, medical systems, and high-quality content portals.',
    whoForBn: 'স্থানীয় সেবামূলক প্রতিষ্ঠান, বিশ্বব্যাপী ই-কমার্স ব্র্যান্ড, আইনি প্রতিষ্ঠান, চিকিৎসা ব্যবস্থা এবং ব্লগ পোর্টাল।',
    businessImpactEn: 'Triggers exponential growth in passive search traffic, reduces dependence on paid search advertising by 60%, and drives authority status.',
    businessImpactBn: 'প্যাসিভ সার্চ ট্রাফিকে অবিশ্বাস্য প্রবৃদ্ধি নিশ্চিত করে, পেইড বিজ্ঞাপনের নির্ভরতা ৬০% পর্যন্ত কমিয়ে দেয় এবং ব্র্যান্ড অথরিটি বাড়ায়।',
    subServicesJson: JSON.stringify([
      { titleEn: 'Technical SEO & Audit', titleBn: 'টেকনিক্যাল এসইও ও অডিট', descEn: 'Eliminate crawl budget errors and index blocks.', descBn: 'ক্রলিং ও ইনডেক্সিংয়ের সব ধরনের টেকনিক্যাল জটিলতা দূরীকরণ।' },
      { titleEn: 'On-Page Content Engineering', titleBn: 'অন-পেজ কন্টেন্ট অপ্টিমাইজেশন', descEn: 'High performance semantic keyword stuffing avoidance.', descBn: 'এসইও ফ্রেন্ডলি কন্টেন্ট স্ট্রাকচারিং ও কি-ওয়ার্ড প্লেসমেন্ট।' },
      { titleEn: 'Local Google Map SEO', titleBn: 'লোকাল এসইও', descEn: 'Conquer local area map-pack boundaries for brick stores.', descBn: 'স্থানীয় গ্রাহকদের আকৃষ্ট করতে গুগল ম্যাপ র‍্যাংকিং বৃদ্ধি।' },
      { titleEn: 'High Authority Link Building', titleBn: 'লিঙ্ক বিল্ডিং', descEn: 'Secure editorial mentions from elite digital portals.', descBn: 'শীর্ষস্থানীয় ওয়েবসাইটগুলো থেকে হাই-অথরিটি ব্যাকলিংক অর্জন।' },
      { titleEn: 'E-commerce SEO Audit', titleBn: 'ই-কমার্স এসইও', descEn: 'Product schema markup, custom description rules.', descBn: 'প্রোডাক্ট স্কিমা মার্কআপ এবং কাস্টম ডেসক্রিপশন রুলস সেটআপ।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Do you guarantee Google Rank Number 1?', questionBn: 'আপনারা কি গুগলে ১ নম্বর র‍্যাংকের গ্যারান্টি দেন?', answerEn: 'Google explicitly states no one can guarantee rankings. However, our methodology consistently places over 80% of targeted client keywords in the top 3 spots.', answerBn: 'গুগল স্পষ্টভাবে জানিয়েছে যে কেউ র‍্যাংকিংয়ের শতভাগ গ্যারান্টি দিতে পারে না। তবে আমাদের কৌশলে ৮০% কি-ওয়ার্ড টপ ৩-এ স্থান পায়।' },
      { questionEn: 'How long before we see substantial traffic growth?', questionBn: 'অর্গানিক ট্রাফিক বাড়তে কতদিন সময় লাগবে?', answerEn: 'SEO is a compounding game. Initial crawl indexing improvements show in 30 days, while robust traffic growth is usually achieved within 4 to 6 months.', answerBn: 'এসইও হলো একটি দীর্ঘমেয়াদী খেলা। প্রাথমিক ফলাফল ৩০ দিনে এবং চমৎকার ট্রাফিক বৃদ্ধি ৪ থেকে ৬ মাসের মধ্যে দৃশ্যমান হয়।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'Authority Core', nameBn: 'অথরিটি কোর', price: '$1,499', periodEn: 'Per Month', periodBn: 'প্রতি মাসে', featuresEn: ['Up to 30 Target Keywords', 'Full Technical Schema Fixes', '5 High-Authority Guest Posts', 'On-page Optimization (15 Pages)', 'Search Console Diagnostics Reports'], featuresBn: ['৩০টি পর্যন্ত টার্গেট কি-ওয়ার্ড', 'সম্পূর্ণ টেকনিক্যাল স্কিমা ফিক্স', '৫টি হাই-অথরিটি গেস্ট পোস্ট', 'অন-পেজ অপ্টিমাইজেশন (১৫ পেজ)', 'সার্চ কনসোল ডায়াগনস্টিক রিপোর্ট'] }
    ])
  },
  {
    id: '5',
    category: 'Design',
    titleEn: 'Graphic Design',
    titleBn: 'গ্রাফিক্স ডিজাইন',
    descriptionEn: 'Pixel-perfect visual identities, logos, brochures, social designs, and layouts that elevate brand perception.',
    descriptionBn: 'পিক্সেল-পারফেক্ট ভিজ্যুয়াল লোগো, ব্রোশিওর, সোশ্যাল ডিজাইন এবং লেআউট যা আপনার ব্র্যান্ডের মান বাড়ায়।',
    featuresEn: ['Logo & Brand Identity Book', 'Social Media Graphics', 'Print-ready Brochures', 'Packaging Concept Mockups', 'Custom Vector Illustrations'],
    featuresBn: ['লোগো ও ব্র্যান্ড গাইড বুক', 'সোশ্যাল মিডিয়া গ্রাফিক্স', 'প্রিন্ট-রেডি ব্রোশিওর', 'প্যাকেজিং মকআপ ডিজাইন', 'কাস্টম ভেক্টর ইলাস্ট্রেশন'],
    benefitsEn: ['Cohesive visual presence', 'Outstanding print quality', 'Enhanced market positioning', 'Premium consumer appeal'],
    benefitsBn: ['সামঞ্জস্যপূর্ণ ভিজ্যুয়াল ব্র্যান্ডিং', 'চমৎকার প্রিন্ট কোয়ালিটি', 'মার্কেট পজিশনিং শক্তিশালীকরণ', 'গ্রাহকদের আকর্ষণ বৃদ্ধি'],
    price: '$1,899',
    icon: 'Palette',
    slug: 'graphic-design',
    processEn: ['Creative Concept & Moodboards', 'Color & Typography Selection', 'Vector Layout Draftings', 'Collaborative Review Cycles', 'High-res Vector Delivery'],
    processBn: ['ধারণা ও মুডবোর্ড তৈরি', 'রঙ ও টাইপোগ্রাফি নির্বাচন', 'ভেক্টর লেআউট ড্রাফটিং', 'রিভিউ ও ফিডব্যাক', 'সোর্স ভেক্টর ফাইল সরবরাহ'],
    techUsed: ['Adobe Illustrator', 'Photoshop', 'Canva', 'Figma'],
    subtitleEn: 'Stunning visual assets, complete brand identities, and high-impact graphic assets built to tell your story.',
    subtitleBn: 'আপনার গল্প বলার জন্য নির্মিত আকর্ষণীয় ভিজ্যুয়াল অ্যাসেট, সম্পূর্ণ ব্র্যান্ড আইডেন্টিটি এবং হাই-ইম্প্যাক্ট গ্রাফিক উপাদান।',
    whyNeedEn: 'First impressions are purely visual. Amateur graphics degrade trust instantly, causing potential customers to doubt product quality.',
    whyNeedBn: 'প্রথম ইম্প্রেশন সম্পূর্ণ ভিজ্যুয়াল। দুর্বল গ্রাফিক্স বিশ্বাসযোগ্যতাকে তাৎক্ষণিকভাবে ক্ষতিগ্রস্ত করে।',
    whoForEn: 'E-commerce brands, high-end product makers, corporate firms, and content publishers seeking visual distinctiveness.',
    whoForBn: 'ই-কমার্স ব্র্যান্ড, উন্নত প্রোডাক্ট ম্যানুফ্যাকচারার, কর্পোরেট ফার্ম এবং কন্টেন্ট পাবলিশার যারা ভিজ্যুয়াল অনন্যতা বজায় রাখতে চায়।',
    businessImpactEn: 'Dramatically raises perceived product value by up to 120%, builds seamless multi-channel aesthetic alignment, and commands premium market pricing.',
    businessImpactBn: 'প্রোডাক্টের ভিজ্যুয়াল ভ্যালু ১২০% পর্যন্ত বাড়িয়ে দেয়, বিভিন্ন চ্যানেলে চমৎকার ভিজ্যুয়াল সামঞ্জস্যতা গড়ে তোলে এবং প্রিমিয়াম লুক দেয়।',
    subServicesJson: JSON.stringify([
      { titleEn: 'Logo & Brand Identity', titleBn: 'লোগো ও ব্র্যান্ড আইডেন্টিটি', descEn: 'Minimalist scalable vector logos with complete usage guidelines.', descBn: 'ব্যবহারের নির্দেশিকাসহ মিনিমালিস্ট স্কেলেবল ভেক্টর লোগো ডিজাইন।' },
      { titleEn: 'Social Media Post Design', titleBn: 'সোশ্যাল মিডিয়া গ্রাফিক্স', descEn: 'Engaging, clean and tailored creative design templates.', descBn: 'সোশ্যাল মিডিয়ার জন্য আকর্ষণীয় ও কাস্টমাইজড ক্রিয়েটিভ ডিজাইন।' },
      { titleEn: 'Flyers & Brochure layouts', titleBn: 'ব্রোশিওর ও লিফলেট', descEn: 'High resolution printable layout booklets for distribution.', descBn: 'বিতরণের জন্য হাই-রেজোলিউশন প্রিন্ট-রেডি ব্রোশিওর ডিজাইন।' },
      { titleEn: 'Packaging & Print layouts', titleBn: 'প্যাকেজিং ও প্রিন্ট ডিজাইন', descEn: 'Physical product box shapes and retail bag outlines.', descBn: 'পণ্য বাজারজাতকরণের জন্য প্রিমিয়াম বক্স এবং প্যাকেট ডিজাইন।' },
      { titleEn: 'Presentation Templates', titleBn: 'প্রেজেন্টেশন স্লাইড', descEn: 'Beautiful investor pitch decks and company profiles.', descBn: 'ইনভেস্টরদের আকর্ষণের জন্য চমৎকার প্রেজেন্টেশন স্লাইড ডিজাইন।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Do we get source file delivery?', questionBn: 'আমরা কি ডিজাইন সোর্স ফাইল পাবো?', answerEn: 'Yes, we supply complete high-resolution print exports alongside raw Adobe Illustrator (.ai) and Photoshop (.psd) files.', answerBn: 'হ্যাঁ, আমরা র হাই-রেজোলিউশন প্রিন্ট ফাইলের পাশাপাশি অ্যাডোবি ইলাস্ট্রেটর (.ai) এবং ফটোশপ (.psd) সোর্স ফাইল প্রদান করি।' },
      { questionEn: 'How many logo iterations do you offer?', questionBn: 'আপনারা লোগো ডিজাইনের জন্য কতগুলো রিভিউ দেন?', answerEn: 'Our standard identity package includes 3 distinct visual concepts and unlimited revisions on the selected winner route.', answerBn: 'আমাদের স্ট্যান্ডার্ড প্যাকেজে ৩টি ভিন্ন ভিজ্যুয়াল কনসেপ্ট এবং চূড়ান্ত লোগোর ওপর আনলিমিটেড রিভিশন সুবিধা রয়েছে।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'Brand Identity Book', nameBn: 'ব্র্যান্ড আইডেন্টিটি বুক', price: '$1,899', periodEn: 'Single Scope', periodBn: 'একক স্কোপ', featuresEn: ['1 Bespoke Vector Logo design', 'Comprehensive Style Guide Booklet', 'Corporate Stationery Suite', 'Social Media Launcher templates', 'All Raw Source Files Included'], featuresBn: ['১টি কাস্টম ভেক্টর লোগো ডিজাইন', 'বিস্তারিত ব্র্যান্ড স্টাইল গাইড বুক', 'কর্পোরেট স্টেশনারি সেটআপ', 'সোশ্যাল মিডিয়া কভার ও প্রোফাইল', 'সকল সোর্স ফাইল সরবরাহ'] },
      { nameEn: 'Retainer Studio Pack', nameBn: 'স্টুডিও রিটেইনার প্যাক', price: '$2,499', periodEn: 'Per Month', periodBn: 'প্রতি মাসে', featuresEn: ['Unlimited Monthly Ad Graphics', 'Social Media template designs', 'Physical Package & Retail Mockups', 'Custom Presentation updates', 'Priority SLA 24 Hour Delivery', 'Direct designer Slack channel access'], featuresBn: ['আনলিমিটেড মাসিক গ্রাফিক্স ডিজাইন', 'সোশ্যাল মিডিয়া টেমপ্লেট ও পোস্ট', 'পণ্য প্যাকেজিং ও রিটেইল মকআপ', 'কাস্টম প্রেজেন্টেশন স্লাইড আপডেট', '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি', 'ডিজাইনারের সাথে সরাসরি স্ল্যাক কানেক্ট'] }
    ])
  },
  {
    id: '6',
    category: 'Development',
    titleEn: 'AI Automation & AI Agents',
    titleBn: 'এআই অটোমেশন এবং এআই এজেন্ট',
    descriptionEn: 'Intelligent AI-driven workflow automations, custom LLM models integration, and conversational support bots to cut operations cost.',
    descriptionBn: 'বুদ্ধিমান এআই-চালিত ওয়ার্কফ্লো অটোমেশন, কাস্টম এলএলএম মডেল ইন্টিগ্রেশন এবং অপারেশন খরচ কমাতে চমৎকার সাপোর্ট বট।',
    featuresEn: ['AI Chatbot Integrations', 'n8n & Make Workflow automation', 'Custom Gemini & GPT integration', 'AI Voice & Sales Agents', 'Secure API LLM Fine-Tuning'],
    featuresBn: ['এআই চ্যাটবট ইন্টিগ্রেশন', 'n8n এবং Make অটোমেশন', 'কাস্টম জেমিনি ও জিপিটি সংযোগ', 'এআই ভয়েস ও সেলস এজেন্ট', 'নিরাপদ এপিআই এলএলএম টিউনিং'],
    benefitsEn: ['24/7 instant client answers', 'Up to 70% support ticket reduction', 'Zero manual entry data errors', 'Fast analytical summaries'],
    benefitsBn: ['২৪/৭ তাত্ক্ষণিক গ্রাহক সেবা', '৭০% পর্যন্ত সাপোর্ট টিকিট হ্রাস', 'ম্যানুয়াল ডেটা এন্ট্রির ভুল শূন্য', 'দ্রুত ব্যবসায়িক ডেটার সারাংশ বিশ্লেষণ'],
    price: '$4,999',
    icon: 'Cpu',
    slug: 'ai-automation',
    processEn: ['Workflows Mapping & Audit', 'LLM Prompt Engineering & Context Injection', 'Integration Set Up via n8n/Make', 'Safety Thresholds & Guards Setup', 'Deployment & Analytics Dashboarding'],
    processBn: ['ওয়ার্কফ্লো ম্যাপিং ও অডিট', 'এলএলএম প্রম্পট ও কনটেক্সট সেটআপ', 'n8n/Make দ্বারা ইন্টিগ্রেশন সেটআপ', 'নিরাপত্তা গার্ডস ও টেস্ট ড্রাইভ', 'ডেপ্লয়মেন্ট ও অ্যানালিটিক্স ড্যাশবোর্ড'],
    techUsed: ['OpenAI', 'Gemini', 'Claude', 'n8n', 'Make', 'LangChain', 'Pinecone', 'Supabase Vector', 'MCP', 'Zapier'],
    subtitleEn: 'Integrate custom LLM context databases, build automated workflow cron loops, and unleash conversational sales AI agents.',
    subtitleBn: 'কাস্টম এলএলএম কনটেক্সট ডাটাবেস একীভূত করুন, স্বয়ংক্রিয় ওয়ার্কফ্লো লুপ তৈরি করুন এবং কথোপকথনমূলক এআই সেলস এজেন্ট চালু করুন।',
    whyNeedEn: 'Staff spend 30% of their work hours copy-pasting data or answering repetitive support emails. AI agents solve this in seconds with zero downtime.',
    whyNeedBn: 'কর্মীরা তাদের কাজের ৩০% সময় ডেটা এন্ট্রি করতে বা একই উত্তর বারবার দিতে ব্যয় করেন। এআই এজেন্টরা খুব দ্রুত এই সমস্যার সমাধান করে।',
    whoForEn: 'High volume Customer Support offices, digital marketplaces, complex booking portals, and corporate hubs seeking maximum digital efficiency.',
    whoForBn: 'উচ্চ ভলিউম কাস্টমার সাপোর্ট অফিস, ডিজিটাল মার্কেটপ্লেস, বুকিং পোর্টাল এবং কর্পোরেট কোম্পানি যারা কাজের গতি বাড়াতে চায়।',
    businessImpactEn: 'Reduces operational wait times to exactly 0 seconds, automates data migrations across CRM systems, and slashes support costs by 50%.',
    businessImpactBn: 'গ্রাহকের অপেক্ষার সময় ০ সেকেন্ডে নামিয়ে আনে, বিভিন্ন সিআরএম সিস্টেমে স্বয়ংক্রিয়ভাবে ডেটা সিঙ্ক করে এবং সাপোর্ট খরচ ৫০% কমায়।',
    subServicesJson: JSON.stringify([
      { titleEn: 'Conversational Support Bots', titleBn: 'গ্রাহক সেবা চ্যাটবট', descEn: 'Intelligent AI chatbots trained on your internal wiki database.', descBn: 'আপনার কোম্পানির নিজস্ব ডাটার ওপর ট্রেইনড চ্যাটবট ইন্টিগ্রেশন।' },
      { titleEn: 'n8n & Make Workflow Loop', titleBn: 'ওয়ার্কফ্লো অটোমেশন', descEn: 'Automated data pipelines syncing Slack, Gmail, and Airtable.', descBn: 'স্ল্যাক, জিমেইল এবং এয়ারটেবিলের মধ্যে স্বয়ংক্রিয় ডেটা আদান-প্রদান।' },
      { titleEn: 'AI Voice & Sales Agent', titleBn: 'এআই ভয়েস ও সেলস এজেন্ট', descEn: 'Intelligent automated speech assistants to schedule bookings.', descBn: 'গ্রাহকের কল এবং শিডিউল বুকিং পরিচালনার জন্য ভয়েস অ্যাসিস্ট্যান্ট।' },
      { titleEn: 'OpenAI, Gemini & Claude Setup', titleBn: 'এপিআই ও এলএলএম ইন্টিগ্রেশন', descEn: 'Direct custom client API integrations on secure cloud infrastructure.', descBn: 'নিরাপদ ক্লাউড ইনফ্রাস্ট্রাকচারে সরাসরি কাস্টম এপিআই ইন্টিগ্রেশন।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Will the AI chatbot hallucinate or state incorrect pricing?', questionBn: 'এআই চ্যাটবট কি ভুল বা অবান্তর তথ্য দিতে পারে?', answerEn: 'No, we implement strict guardrails and inject precise markdown context so the bot stays entirely within your corporate boundaries.', answerBn: 'না, আমরা কঠোর গার্ডরেইল এবং নির্দিষ্ট ডেটা কনটেক্সট ব্যবহার করি যেন বটটি কেবল আপনার দেওয়া তথ্যের ভেতর থেকেই উত্তর দেয়।' },
      { questionEn: 'Can n8n automate our legacy sales CRM pipeline?', questionBn: 'n8n কি আমাদের পুরাতন সেলস সিআরএম অটোমেট করতে পারবে?', answerEn: 'Yes, as long as your CRM provides REST API or webhook support, we can build custom n8n pipeline nodes to sync all parameters.', answerBn: 'হ্যাঁ, যদি আপনার সিআরএম-এ এপিআই বা ওয়েবহুক সাপোর্ট থাকে, তবে আমরা n8n কাস্টম কানেকশন তৈরি করতে পারবো।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'AI Core Bot', nameBn: 'এআই কোর চ্যাটবট', price: '$4,999', periodEn: 'Single Set Up', periodBn: 'এককালীন সেটআপ', featuresEn: ['1 Context Trained Support Bot', 'Embedding Vector Setup (Pinecone)', 'WhatsApp / Website Integration', 'Direct CRM Lead Generation Sink', '30 Days Monitoring Validation'], featuresBn: ['১টি কাস্টম ট্রেইনড চ্যাটবট', 'ভেক্টর ডাটাবেস সেটআপ (Pinecone)', 'হোয়াটসঅ্যাপ বা ওয়েবসাইট ইন্টিগ্রেশন', 'সরাসরি সিআরএম-এ লিড ট্রান্সফার', '৩০ দিনের নিবিড় মনিটরিং সাপোর্ট'] },
      { nameEn: 'Flow Master Pack', nameBn: 'অটোমেশন মাস্টার প্যাক', price: '$8,999', periodEn: 'Workflow Package', periodBn: 'ওয়ার্কফ্লো প্যাকেজ', featuresEn: ['Unlimited n8n/Make Automation Loops', 'Cross-platform Sync (CRM + Slack + Mail)', 'Custom LLM Agent Fine-Tuning', 'AI Voice Booking Assistant Module', '90 Days High-Level Tech Support SLA', 'Interactive Performance Dashboards'], featuresBn: ['আনলিমিটেড n8n/Make অটোমেশন লুপ', 'ক্রস-প্ল্যাটফর্ম ডেটা সিঙ্ক', 'কাস্টম এলএলএম মডেল ফাইন-টিউনিং', 'এআই ভয়েস বুকিং অ্যাসিস্ট্যান্ট মডিউল', '৯০ দিনের উন্নত টেকনিক্যাল এসএলএ সাপোর্ট', 'পারফরম্যান্স মনিটরিং ড্যাশবোর্ড'] }
    ])
  },
  {
    id: '7',
    category: 'Design',
    titleEn: 'Video Editing',
    titleBn: 'প্রিমিয়াম ভিডিও এডিটিং',
    descriptionEn: 'Cinematic cuts, storytelling transitions, visual effects, and professional sound design for high-converting ads, corporate reels, and social media.',
    descriptionBn: 'বিজ্ঞাপন, কর্পোরেট রিল এবং সামাজিক যোগাযোগ মাধ্যমের জন্য সিনেমাটিক কাটস, ভিজ্যুয়াল ইফেক্টস এবং পেশাদার সাউন্ড ডিজাইন।',
    featuresEn: ['Corporate Explainer Videos', 'High-Converting Social Reels', 'Cinematic Color Grading', 'Motion Graphics & Text Overlays', 'Audio Enhancements & Sound Effects'],
    featuresBn: ['কর্পোরেট ব্যাখ্যামূলক ভিডিও', 'উচ্চ মানের সামাজিক রিল', 'সিনেমাটিক কালার গ্রেডিং', 'মোশন গ্রাফিক্স ও টেক্সট ওভারলে', 'অডিও বর্ধন ও সাউন্ড ইফেক্ট'],
    benefitsEn: ['Massive viewer retention rate', 'Professional cinematic aesthetics', 'Perfect storytelling flow', 'High social media shares'],
    benefitsBn: ['দর্শকদের দীর্ঘক্ষণ ধরে রাখার ক্ষমতা', 'পেশাদার সিনেমাটিক নান্দনিকতা', 'নিখুঁত গল্প বলার প্রবাহ', 'সামাজিক মাধ্যমে শেয়ার বৃদ্ধি'],
    price: '$1,799',
    icon: 'Video',
    slug: 'video-editing',
    processEn: ['Script & Storyboard Review', 'Footage Selection & Assembly Cut', 'Color Grading & Motion Graphics', 'Audio Mix & Sound Design', 'Final Render & Multi-Platform Delivery'],
    processBn: ['স্ক্রিপ্ট ও স্টোরিবোর্ড রিভিউ', 'ফুটোজ সিলেকশন ও অ্যাসেম্বলি কাট', 'কালার গ্রেডিং ও মোশন গ্রাফিক্স', 'অডিও মিক্স ও সাউন্ড ডিজাইন', 'ফাইনাল রেন্ডার ও ডেলিভারি'],
    techUsed: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
    subtitleEn: 'Crafting cinematic short reels, corporate product launches, and highly viral promotional social videos.',
    subtitleBn: 'সিনেমাটিক শর্ট রিল, কর্পোরেট প্রোডাক্ট লঞ্চ এবং অত্যন্ত ভাইরাল সোশ্যাল প্রচারণামূলক ভিডিও তৈরি করা।',
    whyNeedEn: 'Video is the highest consuming content format online. Low quality cuts, bad audio or boring intros kill your viewer attention instantly.',
    whyNeedBn: 'ভিডিও হলো বর্তমানে সবচেয়ে বেশি আকর্ষণীয় কন্টেন্ট ফরম্যাট। নিম্নমানের অডিও বা বিরক্তিকর ইন্ট্রো দর্শকদের মনোযোগকে নষ্ট করে দেয়।',
    whoForEn: 'YouTube content creators, retail e-commerce brands, corporate sales divisions, and social media influencers.',
    whoForBn: 'ইউটিউব কনটেন্ট ক্রিয়েটর, রিটেইল ই-কমার্স ব্র্যান্ড, কর্পোরেট সেলস ডিভিশন এবং সোশ্যাল মিডিয়া ইনফ্লুয়েন্সার।',
    businessImpactEn: 'Skyrockets social media user engagement and click conversion rates by up to 300% through highly narrative and cinematic visual stories.',
    businessImpactBn: 'চমৎকার এবং সিনেমাটিক ভিজ্যুয়াল গল্পের মাধ্যমে সোশ্যাল মিডিয়া এনগেজমেন্ট এবং কনভার্সন রেট ৩০০% পর্যন্ত বাড়ায়।',
    subServicesJson: JSON.stringify([
      { titleEn: 'YouTube & Long Form', titleBn: 'ইউটিউব ও লং ফর্ম ভিডিও', descEn: 'High retention narrative edits with structural pacing.', descBn: 'উচ্চ রিটেনশন রেট বজায় রেখে দীর্ঘ কন্টেন্ট এডিটিং।' },
      { titleEn: 'TikTok, Reels & Shorts', titleBn: 'টিকটক, রিলস ও শর্টস', descEn: 'Fast cuts, bold sound FX and graphic kinetic captions.', descBn: 'দ্রুত কাটস, সাউন্ড এফেক্টস এবং আকর্ষণীয় সাবটাইটেল।' },
      { titleEn: 'Corporate Explainer Promo', titleBn: 'কর্পোরেট প্রোমোশনাল ভিডিও', descEn: 'Elegant pacing, infographics and professional stock integrations.', descBn: 'তথ্যপূর্ণ মোশন গ্রাফিক্স ও পেশাদার ভয়েসওভার সমন্বয়।' },
      { titleEn: 'High Converting Video Ads', titleBn: 'বিজ্ঞাপন ভিডিও', descEn: 'Calculated hook timing to optimize consumer clicks.', descBn: 'গ্রাহকদের আকর্ষণের জন্য নিখুঁত টাইমিং হুক ডিজাইন।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Do we need to supply professional stock footage?', questionBn: 'আমাদের কি প্রিমিয়াম ভিডিও স্টক সরবরাহ করতে হবে?', answerEn: 'No, we have active enterprise licenses for Storyblocks and Getty Images to enrich your raw timeline with gorgeous secondary footage.', answerBn: 'না, সেকেন্ডারি ফুটেজ দিয়ে ভিডিওকে আকর্ষণীয় করতে আমাদের কাছে স্টোরিব্লকস ও গেটি ইমেজেসের পেইড লাইসেন্স রয়েছে।' },
      { questionEn: 'What is the average timeline for an ad edit?', questionBn: 'একটি বিজ্ঞাপন এডিটের জন্য গড়ে কত সময় লাগে?', answerEn: 'Usually, first drafts are uploaded within 3 to 5 business days, after which we iterate color and audio mix based on your notes.', answerBn: 'সাধারণত প্রথম ড্রাফট ৩ থেকে ৫ কর্মদিবসের মধ্যে আপলোড করা হয় এবং এরপর আপনার রিভিশন অনুযায়ী ফাইনাল করা হয়।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'Social Media Pack', nameBn: 'সোশ্যাল মিডিয়া প্যাক', price: '$999', periodEn: 'Single Pack', periodBn: 'একক প্যাক', featuresEn: ['Up to 10 Edited Reels/Shorts', 'Dynamic Kinetic Subtitles', 'Sound FX & Audio Restoration', '1080p Export optimized formats', '2 Revision Iterations Included'], featuresBn: ['১০টি পর্যন্ত রিলস বা শর্টস ভিডিও', 'ডাইনামিক সাবটাইটেল টেক্সট', 'সাউন্ড এফেক্টস ও অডিও ব্যালেন্সিং', '১০৮০পি হাই-কোয়ালিটি এক্সপোর্ট', '২টি পর্যন্ত রিভিশন সুবিধা অন্তর্ভুক্ত'] },
      { nameEn: 'Cinematic Launch Kit', nameBn: 'সিনেমাটিক লঞ্চ কিট', price: '$2,499', periodEn: 'Production Pack', periodBn: 'প্রোডাকশন প্যাক', featuresEn: ['1 Core Corporate Brand video', 'Professional Storyboard Drafting', 'Custom Motion Graphic templates', 'High-End Cinematic Sound Design', 'Full Color Grading Treatment', 'Unlimited Revisions on active lines'], featuresBn: ['১টি প্রধান কর্পোরেট ব্র্যান্ড ভিডিও', 'পেশাদার স্টোরিবোর্ড ড্রাফটিং', 'কাস্টম মোশন গ্রাফিক্স উপাদান', 'প্রিমিয়াম সিনেমাটিক সাউন্ড ডিজাইন', 'সম্পূর্ণ কালার গ্রেডিং ও এফেক্টস', 'সক্রিয় লাইনে আনলিমিটেড রিভিশন'] }
    ])
  },
  {
    id: '8',
    category: 'Development',
    titleEn: 'Mobile App Development',
    titleBn: 'মোবাইল অ্যাপ ডেভেলপমেন্ট',
    descriptionEn: 'Premium native and cross-platform mobile applications for iOS and Android, built with stunning animations, offline synchronization, and secure features.',
    descriptionBn: 'নেটিভ পারফরম্যান্স, চমৎকার ইউজার ইন্টারফেস এবং অফলাইন সিঙ্ক সহ প্রিমিয়াম আইওএস এবং অ্যান্ড্রয়েড মোবাইল অ্যাপ্লিকেশন।',
    featuresEn: ['Native iOS & Android Apps', 'Cross-Platform (Flutter / React Native)', 'Offline-First Architectures', 'Push Notifications Integration', 'App Store & Play Store Launching'],
    featuresBn: ['নেটিভ আইওএস এবং অ্যান্ড্রয়েড অ্যাপ', 'ক্রস-প্ল্যাটফর্ম (ফ্লাটার/রিয়্যাক্ট নেটিভ)', 'অফলাইন-ফার্স্ট আর্কিটেকচার', 'পুশ নোটিফিকেশন ইন্টিগ্রেশন', 'অ্যাপ স্টোর ও প্লে স্টোর পাবলিশিং'],
    benefitsEn: ['Stunning Mobile-First Engagements', 'Blazing Fast Performance', 'Secure Local Fingerprint/FaceID Sync', 'Instant push reach directly to pockets'],
    benefitsBn: ['সরাসরি কাস্টমার এনগেজমেন্ট', 'অত্যন্ত দ্রুত নেটিভ গতি', 'অনন্য মোবাইল ইউজার এক্সপেরিয়েন্স', 'নিরাপদ অফলাইন ডেটা স্টোরেজ'],
    price: '$4,499',
    icon: 'Smartphone',
    slug: 'mobile-app',
    processEn: ['Persona & App Requirements Definition', 'Mobile UI/UX Wireframing & Prototyping', 'Cross-Platform Framework Development', 'App Store and Play Store Submissions', 'Continuous Post-Launch Optimizations'],
    processBn: ['অ্যাপ ব্লুপ্রিন্ট', 'মোবাইল ইউআই/ইউএক্স ওয়্যারফ্রেম', 'ক্রস-প্ল্যাটফর্ম কোডিং ও টেস্টিং', 'অ্যাপ স্টোর সাবমিশন ও অনুমোদন', 'লঞ্চ পরবর্তী সাপোর্ট'],
    techUsed: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Supabase', 'Node.js', 'GraphQL'],
    subtitleEn: 'Designing and building premium, high-performance mobile apps that connect your business directly to your customers’ pockets.',
    subtitleBn: 'আমরা চমৎকার এবং উচ্চ পারফরম্যান্সের মোবাইল অ্যাপ তৈরি করি যা আপনার ব্যবসাকে সরাসরি গ্রাহকদের হাতের মুঠোয় পৌঁছে দেয়।',
    whyNeedEn: 'With over 60% of all internet users searching on mobile platforms, a dedicated app helps secure customer retention, increase orders, and amplify authority.',
    whyNeedBn: 'বর্তমানে ৬০%-এর বেশি ওয়েব ট্রাফিক মোবাইল থেকে আসে। একটি ডেডিকেটেড মোবাইল অ্যাপ কাস্টমার রিটেনশন এবং ব্র্যান্ড লয়্যালটি বাড়াতে সাহায্য করে।',
    whoForEn: 'E-commerce retailers, smart startups, logistics operations, and service providers aiming for native mobile touch points.',
    whoForBn: 'ই-কমার্স রিটেইলার, বুকিং প্ল্যাটফর্ম, কমিউনিটি নেটওয়ার্ক এবং মোবাইল এক্সপেরিয়েন্সের সন্ধানকারী নতুন স্টার্টআপ।',
    businessImpactEn: 'Boosts repeat purchases by up to 80%, enables direct 24/7 client connection via push alerts, and drives outstanding user engagement.',
    businessImpactBn: 'কাস্টমার রিপিট পারচেজ রেট ৮০% পর্যন্ত বৃদ্ধি করে, পুশ নোটিফিকেশনের মাধ্যমে সরাসরি মার্কেটিং করার সুযোগ দেয় এবং গ্রাহক এনগেজমেন্ট বাড়ায়।',
    subServicesJson: JSON.stringify([
      { titleEn: 'iOS App Development', titleBn: 'আইওএস অ্যাপ ডেভেলপমেন্ট', descEn: 'Bespoke Apple Swift apps optimized for premium iPhone users.', descBn: 'প্রিমিয়াম আইফোন ব্যবহারকারীদের জন্য কাস্টম অ্যাপ ডেভেলপমেন্ট।' },
      { titleEn: 'Android App Development', titleBn: 'অ্যান্ড্রয়েড অ্যাপ ডেভেলপমেন্ট', descEn: 'Robust Kotlin applications targeting global Android audiences.', descBn: 'বিশ্বব্যাপী অ্যান্ড্রয়েড ব্যবহারকারীদের জন্য কাস্টম অ্যান্ড্রয়েড অ্যাপ।' },
      { titleEn: 'Flutter Cross-Platform', titleBn: 'ফ্লাটার ক্রস-প্ল্যাটফর্ম', descEn: 'Single codebase powering gorgeous iOS & Android apps simultaneously.', descBn: 'একটিমাত্র কোডবেস দিয়ে আইওএস ও অ্যান্ড্রয়েড অ্যাপ চালনা।' },
      { titleEn: 'Mobile App UI/UX', titleBn: 'মোবাইল অ্যাপ ইউআই/ইউএক্স', descEn: 'Immersive touch-friendly layouts and smooth gesture transitions.', descBn: 'স্পর্শ-বান্ধব লেআউট এবং মসৃণ জেসচার ট্রানজিশন।' }
    ]),
    faqsJson: JSON.stringify([
      { questionEn: 'Do you assist with Google Play and Apple App Store publishing?', questionBn: 'আপনারা কি গুগল প্লে এবং অ্যাপল অ্যাপ স্টোরে পাবলিশ করতে সাহায্য করেন?', answerEn: 'Yes, we handle the complete deployment, guideline compliance audits, and store listings setups.', answerBn: 'হ্যাঁ, আমরা অ্যাপ পাবলিশিং, গাইডলাইন কমপ্লায়েন্স অডিট এবং স্টোর লিস্টিং সেটআপের সমস্ত কাজ পরিচালনা করি।' }
    ]),
    pricingJson: JSON.stringify([
      { nameEn: 'MVP App', nameBn: 'এমভিপি অ্যাপ', price: '$4,499', periodEn: 'Single Platform', periodBn: 'একক প্ল্যাটফর্ম', featuresEn: ['1 Native OS Target', 'Clean UI/UX Design Assets', 'Core Feature Integrations', 'Push Notifications Integration', '30 Days Play Store Support'], featuresBn: ['১টি নেটিভ ওএস টার্গেট', 'পরিচ্ছন্ন ইউআই/ইউএক্স অ্যাসেটস', 'মূল ফিচার ইন্টিগ্রেশন', 'পুশ নোটিফিকেশন ইন্টিগ্রেশন', '৩০ দিনের প্লে স্টোর সাপোর্ট'] }
    ])
  }
];

export const initialPortfolio: PortfolioItem[] = [
  {
    id: '1',
    category: 'Web Development',
    titleEn: 'AeroBank: The Digital Neobank Solution',
    titleBn: 'অ্যারোব্যাংক: ডিজিটাল নিওব্যাংক সলিউশন',
    descriptionEn: 'A next-generation digital banking application serving over 500k active users with sub-millisecond transaction routing.',
    descriptionBn: '৫ লক্ষের বেশি সক্রিয় ব্যবহারকারীকে সেবা প্রদানকারী একটি পরবর্তী প্রজন্মের ডিজিটাল ব্যাংকিং অ্যাপ্লিকেশন।',
    client: 'AeroBank Global Corp',
    duration: '6 Months',
    budget: '$85,000',
    challengeEn: 'AeroBank needed to completely rebuild their legacy monolith into a blazing fast, secure, mobile-first web app that handles high traffic spikes without downtime.',
    challengeBn: 'অ্যারোব্যাংক-এর তাদের লিগ্যাসি মনোলিথ সিস্টেমকে অত্যন্ত দ্রুত, নিরাপদ এবং মোবাইল-ফার্স্ট ওয়েব অ্যাপ্লিকেশনে রূপান্তর করার প্রয়োজন ছিল, যা কোনো ডাউনটাইম ছাড়াই উচ্চ ট্রাফিক স্পাইক পরিচালনা করতে পারে।',
    solutionEn: 'We designed a modern server-rendered dashboard with optimized database querying, full-stack state caching, and an award-winning glassmorphism design that users love.',
    solutionBn: 'আমরা অপ্টিমাইজড ডাটাবেস কোয়েরি, ফুল-স্ট্যাক স্টেট ক্যাшением এবং চমৎকার গ্লাস মরফিজম ডিজাইনের সমন্বয়ে একটি আধুনিক সার্ভার-রেন্ডারড ড্যাশবোর্ড তৈরি করেছি যা ব্যবহারকারীরা পছন্দ করেছেন।',
    resultEn: 'Transacting volume grew by 240% within 3 months of launch, loading speed decreased to 0.4s worldwide, and system uptime hit 99.99%.',
    resultBn: 'লঞ্চ করার ৩ মাসের মধ্যে ট্রানজেকশন ভলিউম ২৪০% বৃদ্ধি পেয়েছে, লোডিং স্পিড বিশ্বব্যাপী ০.৪ সেকেন্ডে নেমে এসেছে এবং সিস্টেম আপটাইম ৯৯.৯৯% এ পৌঁছেছে।',
    technologies: ['React', 'Tailwind CSS', 'PostgreSQL', 'Vite', 'Express', 'Motion'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    featured: true,
    rating: 5,
    reviewEn: 'Next Solution has completely transformed our business metrics. Their architecture is stellar, fast, and secure.',
    reviewBn: 'নেক্সট সলিউশন আমাদের ব্যবসায়িক ম্যাট্রিক্স সম্পূর্ণরূপে পরিবর্তন করেছে। তাদের আর্কিটেকচার চমৎকার, দ্রুত এবং নিরাপদ।',
    slug: 'aerobank-neobank-solution',
    status: 'published',
    sortOrder: 1,
    industryEn: 'FinTech / Neobanking',
    industryBn: 'ফিনটেক / নিওব্যাংকিং',
    completionYear: '2026',
    clientPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'Chief Product Officer',
    clientRoleBn: 'চিফ প্রোডাক্ট অফিসার',
    featuresEn: ['Sub-millisecond Transaction Routing', 'Interactive Wealth Analytics', 'Biometric Authorization Gateway', 'Zero-Downtime Data Migration'],
    featuresBn: ['সাব-মিলিসেকেন্ড লেনদেন রাউটিং', 'ইন্টারেক্টিভ ওয়েলথ অ্যানালিটিক্স', 'বায়োমেট্রিক অথরাইজেশন গেটওয়ে', 'জিরো-ডাউনটাইম ডেটা মাইগ্রেশন'],
    galleryJson: JSON.stringify([
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'
    ]),
    beforeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    seoTitleEn: 'AeroBank Case Study - High Performance FinTech App | Next Solution',
    seoTitleBn: 'অ্যারোব্যাংক কেস স্টাডি - হাই পারফরম্যান্স ফিনটেক অ্যাপ | নেক্সট সলিউশন',
    seoDescEn: 'See how Next Solution redesigned AeroBank, scaling transaction speed, improving user metrics by 240%, and maintaining 99.99% uptime.',
    seoDescBn: 'জানুন কীভাবে নেক্সট সলিউশন অ্যারোব্যাংক রিডিজাইন করেছে, লেনদেনের গতি বৃদ্ধি করেছে এবং ৯৯.৯৯% আপটাইম বজায় রেখেছে।',
    liveUrl: 'https://aerobank.example.com',
    githubUrl: 'https://github.com/example/aerobank'
  },
  {
    id: '2',
    category: 'UI/UX Design',
    titleEn: 'Apex: Minimalist Fashion E-Commerce',
    titleBn: 'অ্যাপেক্স: মিনিমালিস্ট ফ্যাশন ই-কমার্স',
    descriptionEn: 'A premium, highly interactive e-commerce platform focusing on immersive, high-fashion presentation and ultra-fast visual checkout.',
    descriptionBn: 'উচ্চমানের এবং অত্যন্ত ইন্টারেক্টিভ ই-কমার্স প্ল্যাটফর্ম যা দ্রুত ভিজ্যুয়াল চেকআউট ও প্রিমিয়াম ফ্যাশন প্রদর্শনে গুরুত্ব দেয়।',
    client: 'Apex Apparel Ltd',
    duration: '4 Months',
    budget: '$45,000',
    challengeEn: 'The client struggled with low checkout conversion rates and felt their legacy UI failed to portray their clothing line with premium editorial prestige.',
    challengeBn: 'ক্লায়েন্ট কম চেকআউট কনভার্সন রেটে ভুগছিলেন এবং অনুভব করেছিলেন যে তাদের পুরানো ইউআই তাদের পোশাকের প্রিমিয়াম রূপ ফুটিয়ে তুলতে পারছিল না।',
    solutionEn: 'We engineered a bold typographic look-and-feel with bespoke layout transitions, optimized fluid-grid image loading, and an optimized single-step sliding drawer checkout funnel.',
    solutionBn: 'আমরা একটি চমৎকার টাইপোগ্রাফিক লুক-অ্যান্ড-ফিল তৈরি করেছি যা মসৃণ লেআউট ট্রানজিশন, অপ্টিমাইজড ফ্লুইড-গ্রিড ইমেজ লোডিং এবং ওয়ান-স্টেপ স্লাইডিং ড্রয়ার চেকআউট ফানেল যুক্ত করে।',
    resultEn: 'Conversion rates rose by a staggering 3.8% (yielding $1.2M in additional annualized sales), while cart abandonment dropped by 45%.',
    resultBn: 'কনভার্সন রেট ৩.৮% বৃদ্ধি পেয়েছে (যা বার্ষিক অতিরিক্ত ১.২ মিলিয়ন ডলার বিক্রয় এনে দিয়েছে) এবং কার্ট পরিত্যাগের হার ৪৫% কমেছে।',
    technologies: ['Figma', 'React', 'Tailwind CSS', 'Vite', 'Motion'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    featured: true,
    rating: 5,
    reviewEn: 'Working with Next Solution felt like we had a world-class in-house design team. Truly outstanding.',
    reviewBn: 'নেক্সট সলিউশনের সাথে কাজ করার সময় মনে হয়েছিল আমাদের নিজস্ব একটি বিশ্বমানের ডিজাইন টিম রয়েছে। সত্যিই অনন্য।',
    slug: 'apex-fashion-ecommerce',
    status: 'published',
    sortOrder: 2,
    industryEn: 'Retail & E-Commerce',
    industryBn: 'রিটেইল ও ই-কমার্স',
    completionYear: '2025',
    clientPhoto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'Creative Director',
    clientRoleBn: 'ক্রিয়েটিভ ডিরেক্টর',
    featuresEn: ['Single-step sliding drawer checkout', 'Immersive editorial gallery grid', 'Fluid scroll layout animations', 'Dynamic live inventory sync'],
    featuresBn: ['ওয়ান-স্টেপ স্লাইডিং ড্রয়ার চেকআউট', 'ইমার্সিভ এডিটরিয়াল গ্যালারি গ্রিড', 'ফ্লুইড স্ক্রল লেআউট অ্যানিমেশন', 'ডাইনামিক লাইভ ইনভেন্টরি সিঙ্ক'],
    galleryJson: JSON.stringify([
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1441984969893-c534e9749045?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800'
    ]),
    beforeImage: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    seoTitleEn: 'Apex Fashion E-Commerce UI/UX Case Study | Next Solution',
    seoTitleBn: 'অ্যাপেক্স ফ্যাশন ই-কমার্স ইউআই/ইউএক্স কেস স্টাডি | নেক্সট সলিউশন',
    seoDescEn: 'Discover how Next Solution designed Apex, a high-converting editorial e-commerce platform that reduced cart abandonment by 45%.',
    seoDescBn: 'জানুন কীভাবে নেক্সট সলিউশন অ্যাপেক্স-এর জন্য এমন একটি এডিটরিয়াল ডিজাইন তৈরি করেছে যা কার্ট পরিত্যাগের হার ৪৫% কমিয়েছে।',
    liveUrl: 'https://apex-apparel.example.com',
    githubUrl: ''
  },
  {
    id: '3',
    category: 'SEO',
    titleEn: 'Organic Boost for EdTech Pioneer',
    titleBn: 'এডটেক পাইওনিয়ারের জন্য অর্গানিক বুস্ট',
    descriptionEn: 'A full-scale technical audit and high-intent keyword cluster strategy that multiplied search traffic by ten times.',
    descriptionBn: 'এডটেক ব্র্যান্ডের সার্চ ট্রাফিক ১০ গুণ বৃদ্ধি করতে একটি সম্পূর্ণ টেকনিক্যাল অডিট এবং হাই-ইনটেন্ট কিওয়ার্ড ক্লাস্টার স্ট্র্যাটেজি।',
    client: 'Socrates Academy',
    duration: '5 Months',
    budget: '$22,000',
    challengeEn: 'Socrates Academy was losing search visibility to venture-backed competitors and struggled with core web vital speeds.',
    challengeBn: 'সক্রেটিস একাডেমি বড় প্রতিযোগীদের কাছে সার্চ ভিজিবিলিটি হারাচ্ছিল এবং তাদের সাইটের কোর ওয়েব ভাইটাল স্পিড কম ছিল।',
    solutionEn: 'We executed deep technical audits, optimized script payloads, structured rich-snippets (JSON-LD JSON blueprints), and launched a highly researched editorial SEO cluster program.',
    solutionBn: 'আমরা টেকনিক্যাল অডিট করেছি, স্ক্রিপ্ট পেলোড অপ্টিমাইজ করেছি, রিচ-সনিপেটস (JSON-LD) স্ট্রাকচার করেছি এবং চমৎকারভাবে পরিকল্পিত এডিটরিয়াল এসইও ক্লাস্টার প্রোগ্রাম চালু করেছি।',
    resultEn: 'Monthly organic traffic surged from 40,000 to 450,000, bringing a 350% increase in inbound registrations without any ad spend.',
    resultBn: 'মাসিক অর্গানিক ট্রাফিক ৪০,০০০ থেকে ৪,৫০,০০০-এ উন্নীত হয়েছে, যা কোনো বিজ্ঞাপন খরচ ছাড়াই ইনবাউন্ড রেজিস্ট্রেশন ৩৫০% বাড়িয়ে দিয়েছে।',
    technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'Next.js'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    featured: false,
    rating: 5,
    reviewEn: 'They don\'t just build links; they understand the business intent. Our revenue directly correlates to their SEO work.',
    reviewBn: 'তারা শুধু লিঙ্ক তৈরি করে না; তারা ব্যবসায়িক উদ্দেশ্য বোঝে। আমাদের রেভিনিউ সরাসরি তাদের এসইও কাজের সাথে সম্পর্কিত।',
    slug: 'socrates-academy-seo-growth',
    status: 'published',
    sortOrder: 3,
    industryEn: 'EdTech / Education',
    industryBn: 'এডটেক / শিক্ষা',
    completionYear: '2025',
    clientPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'Head of Growth',
    clientRoleBn: 'হেড অফ গ্রোথ',
    featuresEn: ['Core Web Vitals Speed Optimization', 'Schema Markup Integration (JSON-LD)', 'Semantic Content Clusters', 'High-Domain Authority Link Building'],
    featuresBn: ['কোর ওয়েব ভাইটালস স্পিড অপ্টিমাইজেশন', 'স্কিমা মার্কআপ ইন্টিগ্রেশন (JSON-LD)', 'সিমেন্টিক কন্টেন্ট ক্লাস্টারস', 'উচ্চ ডোমেন অথরিটি লিঙ্ক বিল্ডিং'],
    galleryJson: JSON.stringify([
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
    ]),
    beforeImage: '',
    afterImage: '',
    seoTitleEn: 'SEO Success Story: Socrates Academy | Next Solution',
    seoTitleBn: 'এসইও সাফল্যের গল্প: সক্রেটিস একাডেমি | নেক্সট সলিউশন',
    seoDescEn: 'How Next Solution multiplied organic search traffic for Socrates Academy by 10x, growing registrations by 350% without ad-spend.',
    seoDescBn: 'জানুন কীভাবে নেক্সট সলিউশন সক্রেটিস একাডেমির অর্গানিক সার্চ ট্রাফিক ১০ গুণ বাড়িয়েছে এবং রেজিস্ট্রেশন ৩৫০% বৃদ্ধি করেছে।',
    liveUrl: 'https://socrates.example.edu',
    githubUrl: ''
  },
  {
    id: '4',
    category: 'Mobile App',
    titleEn: 'SwiftFit: AI-Powered Fitness Tracker',
    titleBn: 'সুইফটফিট: এআই-চালিত ফিটনেস ট্র্যাকার',
    descriptionEn: 'A custom cross-platform iOS and Android application featuring real-time biometric tracking and dynamic offline sync.',
    descriptionBn: 'রিয়েল-টাইম বায়োমেট্রিক ট্র্যাকিং এবং ডাইনামিক অফলাইন সিঙ্ক সমৃদ্ধ একটি ক্রস-প্ল্যাটফর্ম আইওএস এবং অ্যান্ড্রয়েড অ্যাপ।',
    client: 'SwiftFit Global',
    duration: '4 Months',
    budget: '$55,000',
    challengeEn: 'SwiftFit needed a native-performing mobile app built with a single codebase that could synchronize workout data flawlessly while offline.',
    challengeBn: 'সুইফটফিট-এর একটি সিঙ্গেল কোডবেস ভিত্তিক নেটিভ-পারফর্মিং মোবাইল অ্যাপের প্রয়োজন ছিল যা অফলাইনেও নির্ভুলভাবে ওয়ার্কআউট ডেটা সিঙ্ক করতে পারে।',
    solutionEn: 'We engineered a React Native application with SQLite offline caching, custom charts using D3, and lazy synchronization protocols.',
    solutionBn: 'আমরা SQLite অফলাইন ক্যাশিং, D3 চার্ট এবং অত্যন্ত অপ্টিমাইজড সিঙ্ক্রোনাইজেশন প্রোটোকল সহ একটি রিয়্যাক্ট নেটিভ অ্যাপ্লিকেশন তৈরি করেছি।',
    resultEn: 'Active monthly users surged by 150k within 60 days, and the app holds a steady 4.8 rating on both Google Play and Apple App Store.',
    resultBn: '৬০ দিনের মধ্যে ১.৫ লক্ষ সক্রিয় ব্যবহারকারী যুক্ত হয়েছে এবং অ্যাপটি গুগল প্লে ও অ্যাপল অ্যাপ স্টোরে ৪.৮ রেটিং বজায় রেখেছে।',
    technologies: ['React Native', 'Expo', 'FastAPI', 'SQLite', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    featured: true,
    rating: 5,
    reviewEn: 'The team delivered our mobile app on time with flawless native execution. Highly recommended!',
    reviewBn: 'নেক্সট সলিউশন আমাদের মোবাইল অ্যাপটি নির্ধারিত সময়ে চমৎকারভাবে সম্পন্ন করে দিয়েছে। অত্যন্ত প্রশংসনীয়!',
    slug: 'swiftfit-fitness-tracker',
    status: 'published',
    sortOrder: 4,
    industryEn: 'Health & Wellness',
    industryBn: 'স্বাস্থ্য ও ফিটনেস',
    completionYear: '2026',
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'Founder & CEO',
    clientRoleBn: 'প্রতিষ্ঠাতা ও সিইও',
    featuresEn: ['Full Offline Offline Sync', 'Advanced Interactive Workout Insights', 'Custom Push Alert Engines', 'Cross-Platform App Store Publishing'],
    featuresBn: ['সম্পূর্ণ অফলাইন সিঙ্ক', 'উন্নত ইন্টারেক্টিভ ওয়ার্কআউট ড্যাশবোর্ড', 'কাস্টম পুশ নোটিফিকেশন ইঞ্জিন', 'ক্রস-প্ল্যাটফর্ম অ্যাপ পাবলিশিং'],
    galleryJson: JSON.stringify([
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    ])
  },
  {
    id: '5',
    category: 'Graphic Design',
    titleEn: 'Cosmic Brand Identity System',
    titleBn: 'কসমিক ব্র্যান্ড আইডেন্টিটি সিস্টেম',
    descriptionEn: 'A high-end visual identity package including modern vector logos, complete color guidelines, and stationery systems.',
    descriptionBn: 'আধুনিক ভেক্টর লোগো, কালার গাইডলাইন এবং স্টেশনারি সিস্টেম সহ একটি চমৎকার ব্র্যান্ড আইডেন্টিটি প্যাকেজ।',
    client: 'Cosmic Ventures LLC',
    duration: '2 Months',
    budget: '$18,000',
    challengeEn: 'Cosmic Ventures wanted a distinctive brand refresh that projects premium enterprise prestige across all physical and digital collateral.',
    challengeBn: 'কসমিক ভেঞ্চার্স একটি স্বতন্ত্র ব্র্যান্ড রিফ্রেশ চেয়েছিল যা তাদের সমস্ত ফিজিক্যাল এবং ডিজিটাল অ্যাসেটে প্রিমিয়াম ইমেজ ফুটিয়ে তুলবে।',
    solutionEn: 'We designed a cohesive visual design grid, utilizing minimalist geometric vector layouts and sleek, futuristic typography.',
    solutionBn: 'আমরা মিনিমালিস্ট জ্যামিতিক ভেক্টর লেআউট এবং মার্জিত ফিউচারিস্টিক টাইপোগ্রাফির সমন্বয়ে একটি চমৎকার ভিজ্যুয়াল ডিজাইন গ্রিড তৈরি করেছি।',
    resultEn: 'The new identity increased brand perception indices by 85%, creating a standardized brand language across 12 countries.',
    resultBn: 'নতুন ব্র্যান্ড ডিজাইনটি কাস্টমার পারসেপশন ৮৫% বৃদ্ধি করেছে এবং ১২টি দেশে একটি স্ট্যান্ডার্ড ব্র্যান্ড ল্যাঙ্গুয়েজ প্রতিষ্ঠা করেছে।',
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Adobe Dimension'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    featured: true,
    rating: 5,
    reviewEn: 'Outstanding design capability. They created a complete branding guide that perfectly captures our corporate vision.',
    reviewBn: 'অসাধারণ ডিজাইন দক্ষতা। তারা একটি চমৎকার ব্র্যান্ডিং গাইড তৈরি করেছে যা আমাদের কোম্পানি ভিশনকে সুন্দরভাবে ফুটিয়ে তুলেছে।',
    slug: 'cosmic-brand-identity',
    status: 'published',
    sortOrder: 5,
    industryEn: 'Venture Capital',
    industryBn: 'ভেঞ্চার ক্যাপিটাল',
    completionYear: '2025',
    clientPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'Managing Director',
    clientRoleBn: 'ব্যবস্থাপনা পরিচালক',
    featuresEn: ['Complete Vector Logo Kit', 'Comprehensive Corporate Brand Guidelines', 'Full Packaging & Stationery Mockups', 'Custom Premium SVG Marketing Assets'],
    featuresBn: ['সম্পূর্ণ ভেক্টর লোগো কিট', 'বিস্তারিত ব্র্যান্ড নির্দেশিকা ম্যানুয়াল', 'প্যাকেজিং ও স্টেশনারি মকআপ', 'কাস্টম প্রিমিয়াম এসভিজি অ্যাসেটস']
  },
  {
    id: '6',
    category: 'Video Editing',
    titleEn: 'Aurora Cinematic Brand Reel',
    titleBn: 'অরোরা সিনেমাটিক ব্র্যান্ড রিল',
    descriptionEn: 'An ultra-stylized 4K promotional product film with custom 3D typography and premium color grading.',
    descriptionBn: 'কাস্টম ৩ডি টাইপোগ্রাফি এবং কালার গ্রেডিং সমৃদ্ধ একটি আল্ট্রা-স্টাইলিশ ৪কে প্রমোশনাল প্রোডাক্ট ফিল্ম।',
    client: 'Aurora Watches',
    duration: '3 Weeks',
    budget: '$15,000',
    challengeEn: 'Aurora needed an eye-catching commercial for their global watch launch to capture high-intent social media conversions.',
    challengeBn: 'অরোরা ঘড়ির গ্লোবাল লঞ্চিং ক্যাম্পেইনে সোশ্যাল মিডিয়া কনভার্সন বাড়াতে একটি আকর্ষণীয় সিনেমাটিক ভিডিওর প্রয়োজন ছিল।',
    solutionEn: 'We designed a 4K motion showcase featuring custom audio design, DaVinci Resolve color mapping, and rapid-cut frame edits.',
    solutionBn: 'আমরা কাস্টম অডিও ডিজাইন, দাভিঞ্চি রিজলভ কালার ম্যাপিং এবং আধুনিক ফ্রেম এডিট সহ একটি চমৎকার সিনেমাটিক ভিডিও তৈরি করেছি।',
    resultEn: 'Social engagement increased by 300% within the first week, generating over 10M total combined video impressions.',
    resultBn: 'প্রথম সপ্তাহেই সোশ্যাল এনগেজমেন্ট ৩০০% বৃদ্ধি পেয়েছে এবং ১ কোটির বেশি ভিডিও ভিউ অর্জিত হয়েছে।',
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Blender'],
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    featured: true,
    rating: 5,
    reviewEn: 'The video editing is breathtaking. Their attention to sound details and visual pacing is unmatched.',
    reviewBn: 'ভিডিও এডিটিং এককথায় অসাধারণ। সাউন্ড ডিটেলস এবং ভিজ্যুয়াল পেসিংয়ের প্রতি তাদের যত্ন প্রশংসনীয়।',
    slug: 'aurora-cinematic-reel',
    status: 'published',
    sortOrder: 6,
    industryEn: 'Luxury Retail',
    industryBn: 'লাক্সারি রিটেইল',
    completionYear: '2026',
    clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'Head of Marketing',
    clientRoleBn: 'হেড অফ মার্কেটিং',
    featuresEn: ['Commercial 4K Video Production', '3D Motion Typography Intro', 'Premium Sound Design & Sync', 'DaVinci Resolve Advanced Color Grading'],
    featuresBn: ['কমার্শিয়াল ৪কে ভিডিও প্রোডাকশন', '৩ডি মোশন টাইপোগ্রাফি ইন্ট্রো', 'প্রিমিয়াম সাউন্ড ডিজাইন ও সিঙ্ক', 'দাভিঞ্চি রিজলভ কালার গ্রেডিং']
  },
  {
    id: '7',
    category: 'Digital Marketing',
    titleEn: 'ScaleMax: 10x Growth Funnel Campaign',
    titleBn: 'স্কেলম্যাক্স: ১০ গুণ গ্রোথ ফানেল ক্যাম্পেইন',
    descriptionEn: 'A comprehensive multi-channel digital acquisition campaign with automated email nurture funnel pipelines.',
    descriptionBn: 'স্বয়ংক্রিয় ইমেইল নার্চার ফানেল পাইপলাইন সহ একটি সমন্বিত মাল্টি-চ্যানেল ডিজিটাল একুইজিশন ক্যাম্পেইন।',
    client: 'ScaleMax SaaS',
    duration: '3 Months',
    budget: '$28,000',
    challengeEn: 'ScaleMax had high traffic but low conversions from sign-ups to paid plans, losing high volumes of valuable leads.',
    challengeBn: 'স্কেলম্যাক্স-এর ট্রাফিক বেশি থাকা সত্ত্বেও ফ্রী সাইন-আপ থেকে পেইড প্ল্যানে কনভার্সন অনেক কম ছিল, ফলে তারা সম্ভাব্য গ্রাহক হারাচ্ছিল।',
    solutionEn: 'We designed a complete performance marketing loop, optimized copy, automated email trigger flows, and set up landing page heatmaps.',
    solutionBn: 'আমরা একটি কমপ্লিট পারফরম্যান্স মার্কেটিং লুপ, কাস্টম কপিরাইটিং এবং অটোমেটেড ইমেইল ট্রিগার ফ্লো সেটআপ করেছি।',
    resultEn: 'Trial-to-paid conversions increased by 185%, lowering customer acquisition costs (CAC) by 40% overall.',
    resultBn: 'ট্রায়াল থেকে পেইড কনভার্সন ১৮৫% বৃদ্ধি পেয়েছে এবং কাস্টমার একুইজিশন কস্ট (CAC) ৪০% হ্রাস পেয়েছে।',
    technologies: ['Google Analytics 4', 'Meta Business Suite', 'HubSpot', 'Zapier'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    featured: true,
    rating: 5,
    reviewEn: 'The marketing funnel they designed started converting immediately. It was worth every single penny.',
    reviewBn: 'তাদের ডিজাইন করা মার্কেটিং ফানেলটি সাথে সাথেই কনভার্ট করা শুরু করেছে। এটি সত্যিই অসাধারণ কাজ করেছে।',
    slug: 'scalemax-marketing-funnel',
    status: 'published',
    sortOrder: 7,
    industryEn: 'B2B SaaS / Growth',
    industryBn: 'বিটুবি স্যাস / গ্রোথ',
    completionYear: '2026',
    clientPhoto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'Chief Growth Officer',
    clientRoleBn: 'চিফ গ্রোথ অফিসার',
    featuresEn: ['Targeted Performance Marketing Setup', 'High-Converting Copywriting & Design', 'Automated Trigger Email Funnel', 'Unified Google/Meta Tracking Systems'],
    featuresBn: ['টার্গেটেড পারফরম্যান্স মার্কেটিং সেটআপ', 'হাই-কনভার্টিং কপিরাইটিং ও ডিজাইন', 'অটোমেটেড ইমেইল ফানেল ফ্লো', 'ইউনিফায়েড গুগল/মেটা ট্র্যাকিং সিস্টেম']
  },
  {
    id: '8',
    category: 'AI Automation & Agent',
    titleEn: 'OmniBot: Enterprise AI Customer Success Agent',
    titleBn: 'ওমনিবট: এন্টারপ্রাইজ এআই কাস্টমার সাকসেস এজেন্ট',
    descriptionEn: 'A custom LLM agent integrated directly with corporate Knowledgebases to automate complex customer interactions.',
    descriptionBn: 'জটিল কাস্টমার ইন্টারেকশন স্বয়ংক্রিয় করতে কোম্পানির নলেজবেসের সাথে সরাসরি যুক্ত কাস্টম এলএলএম এজেন্ট।',
    client: 'Omni Retail Ltd',
    duration: '2 Months',
    budget: '$40,000',
    challengeEn: 'Omni Retail faced overwhelming customer ticket counts, resulting in average support response delays of over 12 hours.',
    challengeBn: 'ওমনি রিটেল প্রচুর টিকিট সংখ্যার মুখোমুখি হচ্ছিল, যার কারণে রেসপন্স টাইম গড়ে ১২ ঘণ্টার বেশি বিলম্বিত হচ্ছিল।',
    solutionEn: 'We engineered an intelligent customer assistant using Google Gemini API, semantic search embeddings, and direct API ticketing hooks.',
    solutionBn: 'আমরা গুগল জেমিনি এপিআই, সিমেন্টিক সার্চ এম্বেডিংস এবং এপিআই টিকেটিং হুক ব্যবহার করে একটি কাস্টম এআই অ্যাসিস্ট্যান্ট তৈরি করেছি।',
    resultEn: 'Support ticket count dropped by 72% via instant automation, and average CSAT scores rose to an all-time high of 98.4%.',
    resultBn: 'তাত্ক্ষণিক অটোমেশনের মাধ্যমে টিকিট সংখ্যা ৭২% হ্রাস পেয়েছে এবং কাস্টমার স্যাটিসফ্যাকশন (CSAT) সর্বোচ্চ ৯৮.৪% এ উন্নীত হয়েছে।',
    technologies: ['Gemini API', 'Node.js', 'Pinecone', 'Express', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    featured: true,
    rating: 5,
    reviewEn: 'OmniBot has completely revolutionized our support desk. It answers user requests instantly with perfect corporate brand tone.',
    reviewBn: 'ওমনিবট আমাদের সাপোর্ট ডেস্কের কাজের ধরণ বদলে দিয়েছে। এটি ব্র্যান্ড টোন বজায় রেখে তাত্ক্ষণিকভাবে প্রশ্নের উত্তর দেয়।',
    slug: 'omnibot-ai-customer-agent',
    status: 'published',
    sortOrder: 8,
    industryEn: 'Retail Tech / Automation',
    industryBn: 'রিটেইল টেক / অটোমেশন',
    completionYear: '2026',
    clientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    clientRoleEn: 'VP of Customer Success',
    clientRoleBn: 'ভিপি অফ কাস্টমার সাকসেস',
    featuresEn: ['Semantic Vector Database RAG Integration', 'Continuous Gemini API Fine-tuning', 'Automated Ticketing System CRM Sync', 'Secure High-Concurrency API Infrastructure'],
    featuresBn: ['সিমেন্টিক ভেক্টর ডেটাবেস RAG ইন্টিগ্রেশন', 'কন্টিনিউয়াস জেমিনি এপিআই অপ্টিমাইজেশন', 'স্বয়ংক্রিয় টিকেটিং ও সিআরএম সিঙ্ক', 'নিরাপদ এবং অত্যন্ত গতিশীল এপিআই ফ্রেমওয়ার্ক']
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: '1',
    titleEn: 'The Future of Web Engineering in 2026',
    titleBn: '২০২৬ সালে ওয়েব ইঞ্জিনিয়ারিংয়ের ভবিষ্যৎ',
    excerptEn: 'From Edge computations to AI-assisted compiling, explore the architectural breakthroughs defining modern digital experiences.',
    excerptBn: 'এজ কম্পিউটেশন থেকে এআই-সহায়তা কম্পাইলিং পর্যন্ত, আধুনিক ডিজিটাল অভিজ্ঞতার সংজ্ঞা নির্ধারণকারী চমৎকার আর্কিটেকচারাল অগ্রগতি অন্বেষণ করুন।',
    contentEn: `## Introduction
We stand on the precipice of a new era of digital computing. The old paradigms of server-to-client cycles are changing rapidly as ultra-low latency serverless models take command.

In this article, we outline why speed is the single most critical conversion factor in 2026, and how frameworks like React combined with custom Edge-API configurations deliver blistering speeds of under 100ms globally.

> "The web is no longer about static content delivery; it is about instant, context-aware personalized application rendering at the physical edge of the network."

### Key Architectural Shifts

| Architectural Element | Legacy Paradigm (2020) | Future Paradigm (2026) |
|---|---|---|
| Computing Location | Centralized Server Region | Distributed Edge Network |
| Code Optimization | Manual Minification | AI-Assisted Compilation |
| Data Caching | Periodic CDN Invalidation | Instant Stale-While-Revalidate |

### Code Implementation Example
Here is a sample Edge-optimized route handler configured for high-concurrency client data fetching:

\`\`\`typescript
export async function onRequest(context) {
  const { request, env } = context;
  const cache = caches.default;
  
  // Instant retrieval if cached in local edge memory
  let response = await cache.match(request);
  if (response) return response;
  
  // Lazy refresh if cache is expired
  const data = await fetch("https://api.nextsolution.com/v1/metrics");
  response = new Response(JSON.stringify(await data.json()), {
    headers: { "Cache-Control": "public, max-age=60" }
  });
  
  context.waitUntil(cache.put(request, response.clone()));
  return response;
}
\`\`\`

[Tip] **Pro Tip:** Always isolate your server-side secrets from client environments. Always proxy your database calls through serverless edge routes to protect your sensitive API tokens.

### Conclusion
As we look ahead, digital agencies must abandon sluggish monolithic architectures in favor of tight, typesafe, compiled digital portals that score 100/100 on Google Lighthouse.`,
    contentBn: `## ভূমিকা
আমরা ডিজিটাল কম্পিউটিংয়ের এক নতুন যুগের দ্বারপ্রান্তে দাঁড়িয়ে আছি। সার্ভার-টু-ক্লায়েন্ট চক্রের পুরানো প্যারাডাইমগুলি দ্রুত পরিবর্তিত হচ্ছে কারণ আল্ট্রা-লো ল্যাটেন্সি সার্ভারহীন মডেলগুলি নেতৃত্ব দিচ্ছে।

এই আর্টিকেলে, আমরা আলোচনা করেছি কেন গতি ২০২৬ সালে সবচেয়ে গুরুত্বপূর্ণ রূপান্তরকারী উপাদান এবং কীভাবে কাস্টম এজ-এপিআই কনফিগারেশনের সাথে যুক্ত রিয়্যাক্ট বিশ্বব্যাপী ১০০ মিলিসেকেন্ডের কম গতি প্রদান করে।

> "ওয়েব আর কেবল স্ট্যাটিক কন্টেন্ট পরিবেশনের জন্য নয়; এটি নেটওয়ার্কের ফিজিক্যাল এজে তাত্ক্ষণিক, প্রসঙ্গ-সংবেদনশীল ব্যক্তিগতকৃত অ্যাপ্লিকেশন রেন্ডারিংয়ের কাজ।"

### মূল আর্কিটেকচারাল পরিবর্তনসমূহ

| উপাদান | পুরানো মডেল (২০২০) | নতুন মডেল (২০২৬) |
|---|---|---|
| কম্পিউটিং লোকেশন | সেন্ট্রালাইজড সার্ভার | ডিস্ট্রিবিউটেড এজ নেটওয়ার্ক |
| কোড অপ্টিমাইজেশন | ম্যানুয়াল মিনিফিকেশন | এআই-সহায়তা কম্পাইলেশন |
| ডেটা ক্যাশিং | সাধারণ সিডিএন | ইনস্ট্যান্ট স্টেল-হোয়াইল-রিভ্যালিডেট |

### কোড উদাহরণ
এখানে একটি এজ-অপ্টিমাইজড রুট হ্যান্ডলারের কোড উদাহরণ দেওয়া হলো:

\`\`\`typescript
export async function onRequest(context) {
  const { request, env } = context;
  const cache = caches.default;
  
  let response = await cache.match(request);
  if (response) return response;
  
  const data = await fetch("https://api.nextsolution.com/v1/metrics");
  response = new Response(JSON.stringify(await data.json()), {
    headers: { "Cache-Control": "public, max-age=60" }
  });
  
  context.waitUntil(cache.put(request, response.clone()));
  return response;
}
\`\`\`

[Warning] **সতর্কতা:** ক্লায়েন্ট সাইড এনভায়রনমেন্টে সরাসরি সিক্রেট কি ব্যবহার করবেন না। সর্বদা সার্ভারলেস মিডলওয়্যারের মাধ্যমে ডাটাবেস কোয়েরি করুন।`,
    categoryEn: 'Technology',
    categoryBn: 'প্রযুক্তি',
    tags: ['WebDev', 'EdgeAPI', 'React', 'Speed', 'NextJS'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    author: 'Sanjid Rahman',
    readTime: '5 Min Read',
    publishedAt: '2026-07-01',
    status: 'published',
    views: 4890,
    engagement: 382,
    isFeatured: true,
    isTrending: true,
    slug: 'the-future-of-web-engineering-in-2026',
    seoTitleEn: 'The Future of Web Engineering in 2026 | Next Solution',
    seoTitleBn: '২০২৬ সালে ওয়েব ইঞ্জিনিয়ারিংয়ের ভবিষ্যৎ | নেক্সট সলিউশন',
    seoDescEn: 'Dive into edge computing, serverless architectures, and AI compile steps driving sub-100ms load speeds globally.',
    seoDescBn: 'জানুন কীভাবে ২০২৬ সালের আধুনিক আর্কিটেকচার ও এজ কম্পিউটিং বিশ্বজুড়ে ১০০ মিলিসেকেন্ডের কম গতি নিশ্চিত করছে।',
    canonicalUrl: 'https://next-solution.com/blog/the-future-of-web-engineering-in-2026',
    ogImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    authorRoleEn: 'Founder & CTO',
    authorRoleBn: 'প্রতিষ্ঠাতা ও সিটিও',
    authorBioEn: 'Sanjid is a veteran SaaS architect and system developer with over 12 years of core full-stack experience.',
    authorBioBn: 'সানজিদ ১২ বছরেরও বেশি ফুল-স্ট্যাক ও ক্লাউড সিস্টেমস অভিজ্ঞতাসম্পন্ন একজন জ্যেষ্ঠ স্যাস আর্কিটেক্ট।',
    authorPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    authorTwitter: 'sanjid_tech',
    authorLinkedin: 'sanjid-rahman-next'
  },
  {
    id: '2',
    titleEn: 'Designing for Human Delight: Next-Gen UX Strategy',
    titleBn: 'মানুষের আনন্দের জন্য ডিজাইন: ইউএক্স স্ট্র্যাটেজি',
    excerptEn: 'Learn how cognitive layout hierarchies and tactile animation interfaces combine to generate double-digit revenue metrics.',
    excerptBn: 'জানুন কীভাবে কগনিটিভ লেআউট হায়ারার্কি এবং টেকটাইল অ্যানিমেশন ইন্টারফেস মিলে ডাবল-ডিজিট রেভিনিউ অর্জন করতে সাহায্য করে।',
    contentEn: `## Designing with Purpose
Design is not just what it looks like and feels like; design is how it works. When we design enterprise products at Next Solution, we begin by mapping the emotional journeys of users.

### The Delight Matrix
Delight is created at the intersection of clarity, animation, and instant feedback. 

* **Clear Cognitive Hierarchies:** Giving elements generous white space so the human brain can process options in milliseconds.
* **Micro-Animations:** Fluid, micro-interactions that confirm actions with a soft, natural response.
* **Tactile Boundaries:** Visual borders and high contrast backgrounds that maintain structure across all devices.

> "A design is only successful if it reduces user cognitive load to zero, turning complex, layered workflows into self-explanatory steps."

[Note] **Note:** Avoid flashing screens or excessive spinning indicators. Always prefer instant skeletal loaders to enhance perceived speed.`,
    contentBn: `## উদ্দেশ্যভিত্তিক ডিজাইন
ডিজাইন কেবল কেমন দেখায় বা কেমন অনুভূতি দেয় তা নয়; ডিজাইন হলো এটি কীভাবে কাজ করে। যখন আমরা নেক্সট সলিউশনে এন্টারপ্রাইজ প্রোডাক্ট ডিজাইন করি, তখন আমরা ব্যবহারকারীদের আবেগপূর্ণ ভ্রমণ ম্যাপিং দিয়ে শুরু করি।

### ডেল্টা ম্যাট্রিক্স
স্পষ্টতা, অ্যানিমেশন এবং তাত্ক্ষণিক প্রতিক্রিয়ার সমন্বয়ে চমৎকার ডিজাইন গঠিত হয়।

* **কগনিটিভ হায়ারার্কি:** উপাদানগুলিতে উদার খালি স্থান (হোয়াইটস্পেস) দেওয়া যাতে মস্তিষ্ক মিলিসেকেন্ডে অপশনগুলি বুঝতে পারে।
* **মাইক্রো-অ্যানিমেশন:** মসৃণ এবং প্রাকৃতিক প্রতিক্রিয়া প্রদানকারী চমৎকার মাইক্রো-ইন্টারঅ্যাকশন।
* **সহজ বাউন্ডারি:** পরিষ্কার এবং উচ্চ কনট্রাস্ট ব্যাকগ্রাউন্ড যা সমস্ত ডিভাইসে সামঞ্জস্য রক্ষা করে।

> "একটি ডিজাইন তখনই সফল হয় যখন এটি ব্যবহারকারীর চিন্তা করার চাপ শূন্যে নামিয়ে আনে।"

[Note] **নোট:** কন্টেন্ট লোড হওয়ার আগে স্কেলিটন স্ক্রিন ব্যবহার করুন যা ব্যবহারকারীর কাছে ওয়েবসাইটটিকে আরও গতিশীল মনে করায়।`,
    categoryEn: 'UI/UX Design',
    categoryBn: 'ইউআই/ইউএক্স ডিজাইন',
    tags: ['UIUX', 'Figma', 'Strategy', 'Cognitive', 'Framer'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    author: 'Tasnim Ahmed',
    readTime: '7 Min Read',
    publishedAt: '2026-07-05',
    status: 'published',
    views: 3120,
    engagement: 294,
    isEditorsPick: true,
    slug: 'designing-for-human-delight-next-gen-ux-strategy',
    seoTitleEn: 'Designing for Human Delight: Next-Gen UX Strategy',
    seoTitleBn: 'মানুষের আনন্দের জন্য ডিজাইন: ইউএক্স স্ট্র্যাটেজি | নেক্সট সলিউশন',
    seoDescEn: 'Learn how cognitive layout hierarchies, spacious paddings, and deliberate micro-animations drive outstanding retention rates.',
    seoDescBn: 'জানুন কীভাবে কগনিটিভ লেআউট হায়ারার্কি, ফাঁকা স্থান এবং মাইক্রো-অ্যানিমেশন আপনার প্রোডাক্টের কনভার্সন রেট বৃদ্ধি করে।',
    canonicalUrl: 'https://next-solution.com/blog/designing-for-human-delight-next-gen-ux-strategy',
    ogImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    authorRoleEn: 'Chief Design Officer',
    authorRoleBn: 'চিফ ডিজাইন অফিসার',
    authorBioEn: 'Tasnim directs the frontend design and brand identity systems at Next Solution, focusing on pixel perfection.',
    authorBioBn: 'তাসনিম নেক্সট সলিউশনের ব্র্যান্ড আইডেন্টিটি এবং পিক্সেল পারফেক্ট ডিজাইন সলিউশন নিয়ে কাজ করেন।',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    authorTwitter: 'tasnim_design',
    authorLinkedin: 'tasnim-ahmed-design'
  },
  {
    id: '3',
    titleEn: 'Decoding Search Algorithms: SEO Secrets Exposed',
    titleBn: 'সার্চ অ্যালগরিদম ডিকোডিং: এসইও সিক্রেট',
    excerptEn: 'Google\'s 2026 leak confirmed the vital importance of search intent matching over link density. Here is your transition playbook.',
    excerptBn: 'গুগলের সাম্প্রতিক লিকে লিঙ্ক ডেনসিটির চেয়ে সার্চ ইনটেন্ট ম্যাপিংয়ের গুরুত্ব প্রমাণিত হয়েছে। এখানে আপনার ট্রানজিশন প্লেবুক রয়েছে।',
    contentEn: `## The Leak That Changed SEO
The old playbook of stuffing keywords and buying questionable bulk backlinks is dead. Modern search engines are powered by highly intelligent semantic neural nets that read and evaluate the absolute contextual depth of your pages.

### Core Ranking Pillars in 2026

1. **User Intent Precision:** Does your content directly answer the searcher's query or do they bounce back to search?
2. **Contextual Semantic Clustering:** Grouping your articles into high-authority networks rather than disjointed logs.
3. **Immaculate Core Web Vitals:** Sub-0.5s visual loading on standard mobile connections.

> "Google's leaked parameters confirm that genuine expert analysis paired with rich interactive tables is indexed 300% faster than generic text."

[Warning] **Warning:** Avoid low-effort generic text generators. Google's search classifier actively penalizes repetitive templates lacking authentic screenshots or original expert insights.`,
    contentBn: `## এসইও পরিবর্তনকারী ঘটনা
কিওয়ার্ড স্টাফিং এবং নিম্নমানের বাল্ক ব্যাকলিংক কেনার পুরানো প্লেবুক এখন অকেজো। আধুনিক সার্চ ইঞ্জিনগুলি অত্যন্ত বুদ্ধিমান সিমেন্টিক নিউরাল নেট দ্বারা চালিত যা আপনার পেজের সম্পূর্ণ প্রাসঙ্গিক গভীরতা বিশ্লেষণ করে।

### ২০২৬ সালের মূল র‍্যাংকিং ফ্যাক্টরসমূহ

১. **ইউজার ইনটেন্ট ম্যাচিং:** আপনার কন্টেন্ট কি সরাসরি ব্যবহারকারীর জিজ্ঞাসার উত্তর দিচ্ছে নাকি তারা পেজ থেকে চলে যাচ্ছে?
২. **সিমেন্টিক ক্লাস্টারিং:** সম্পর্কিত পোস্টগুলোকে একসাথে একটি শক্তিশালী টপিকাল অথরিটিতে রূপান্তর করা।
৩. **কোর ওয়েব ভাইটালস স্পিড:** যেকোনো মোবাইল কানেকশনে ০.৫ সেকেন্ডের কম লোডিং গতি।

> "গুগলের লিক হওয়া প্যারামিটার প্রমান করে যে আসল বিশেষজ্ঞ পর্যালোচনা এবং ইন্টারেক্টিভ ডেটা সাধারণ লেখার চেয়ে ৩০০% দ্রুত সার্চের শীর্ষে আসে।"

[Warning] **সতর্কতা:** রোবোটিক বা এআই জেনারেটেড রি রাইট কন্টেন্ট ব্যবহার বন্ধ করুন। গুগল এই ধরণের সাইটগুলিকে পেনাল্টি দিচ্ছে।`,
    categoryEn: 'SEO',
    categoryBn: 'সার্চ ইঞ্জিন অপ্টিমাইজেশন (এসইও)',
    tags: ['SEO', 'Marketing', 'Search', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    author: 'Asif Karim',
    readTime: '6 Min Read',
    publishedAt: '2026-07-08',
    status: 'published',
    views: 5240,
    engagement: 410,
    isTrending: true,
    slug: 'decoding-search-algorithms-seo-secrets-exposed',
    seoTitleEn: 'Decoding Search Algorithms: SEO Secrets Exposed | Next Solution',
    seoTitleBn: 'সার্চ অ্যালগরিদম ডিকোডিং: এসইও সিক্রেট | নেক্সট সলিউশন',
    seoDescEn: 'A deep analysis of ranking parameters, content cluster frameworks, and core web vitals optimization strategy.',
    seoDescBn: 'গুগলের র‍্যাংকিং প্যারামিটার এবং সিমেন্টিক কন্টেন্ট ক্লাস্টার তৈরির নির্ভরযোগ্য এসইও প্লেবুক জানুন।',
    canonicalUrl: 'https://next-solution.com/blog/decoding-search-algorithms-seo-secrets-exposed',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    authorRoleEn: 'Director of Growth & SEO',
    authorRoleBn: 'পরিচালক, গ্রোথ ও এসইও',
    authorBioEn: 'Asif leads the editorial search and link building pipeline at Next Solution, helping brands scale organic leads by over 400%.',
    authorBioBn: 'আসিফ নেক্সট সলিউশনের সার্চ ইঞ্জিন অপ্টিমাইজেশন এবং অর্গানিক ট্রাফিক বৃদ্ধির প্রধান পরামর্শক।',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    authorTwitter: 'asif_seo',
    authorLinkedin: 'asif-karim-seo'
  },
  {
    id: '4',
    titleEn: 'Complete Web Development Guide for Modern Agencies',
    titleBn: 'আধুনিক এজেন্সির জন্য ওয়েব ডেভেলপমেন্ট কমপ্লিট গাইড',
    excerptEn: 'An exhaustive roadmap covering frontend compilers, high-performance database schemas, and global deployment SLA strategies.',
    excerptBn: 'ফ্রন্টএন্ড কম্পাইলার, হাই-পারফরম্যান্স ডাটাবেস স্কিমা এবং বৈশ্বিক ডেপ্লয়মেন্ট কৌশল সহ একটি সম্পূর্ণ গাইড।',
    contentEn: `## Modern Full-Stack Roadmap
Building websites that scale requires deep attention to every layer of the technology stack. In this learning guide, we cover the essential roadmap.

### Layer 1: The Compiled Frontend
Avoid heavy, unoptimized asset loading. NextJS paired with Tailwind CSS compiles into flat HTML and CSS files distributed to edge locations globally.

### Layer 2: The Relational DB Hub
Always structure your relational schemas cleanly. We recommend PostgreSQL or Supabase with appropriate indices on foreign keys to support sub-millisecond query execution.

### Layer 3: DevOps & Global SLA Orchestration
Configure automated CI/CD checks to lint, build, and test your codebase on every push.

\`\`\`yaml
# Standard GitHub Action workflow snippet
name: Quality Build CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run lint
      - run: npm run build
\`\`\`

[Tip] **SLA Rule:** Never run manual builds on live production instances. Use automated pipelines for repeatable launches.`,
    contentBn: `## আধুনিক ফুল-স্ট্যাক রোডম্যাপ
উচ্চ মানের স্কেলেবল ওয়েবসাইট তৈরিতে প্রতিটি স্তরের প্রযুক্তি ব্যবহারের নির্ভরযোগ্য গাইড।

### লেভেল ১: কম্পাইলড ফ্রন্টএন্ড
Next.js এবং Tailwind CSS ব্যবহারের মাধ্যমে পিক্সেল পারফেক্ট লোডিং স্পিড নিশ্চিত করা যায়।

### লেভেল ২: রিলেশনাল ডিবি
উচ্চ গতির কুয়েরির জন্য পোস্টগ্রেএসকিউএল বা সুপাবেস ব্যবহার করুন। ইনডেক্স ব্যবহারের মাধ্যমে কুয়েরি স্পিড বাড়ান।

### লেভেল ৩: ডেভঅপ্স পাইপলাইন
প্রতিটি পুশ কমান্ডে স্বয়ংক্রিয়ভাবে লিন্ট, টেস্ট এবং বিল্ড রান করতে গিটহাব অ্যাকশন সেটআপ করুন।

\`\`\`yaml
name: Quality Build CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run lint
      - run: npm run build
\`\`\`

[Tip] **টিপ:** লাইভ সার্ভারে ম্যানুয়াল কোড আপলোড বন্ধ করুন। স্বয়ংক্রিয় পাইপলাইন ব্যবহার করুন।`,
    categoryEn: 'Web Development',
    categoryBn: 'ওয়েব ডেভেলপমেন্ট',
    tags: ['NextJS', 'PostgreSQL', 'CI-CD', 'SaaS'],
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
    author: 'Sanjid Rahman',
    readTime: '12 Min Read',
    publishedAt: '2026-07-09',
    status: 'published',
    views: 6410,
    engagement: 512,
    isLearningGuide: true,
    slug: 'complete-web-development-guide',
    seoTitleEn: 'Complete Web Development Guide | Next Solution',
    seoTitleBn: 'আধুনিক এজেন্সির জন্য ওয়েব ডেভেলপমেন্ট কমপ্লিট গাইড | নেক্সট সলিউশন',
    seoDescEn: 'An exhaustive step-by-step developer guide on compilers, relational database structures, and automated CI/CD deployments.',
    seoDescBn: 'আধুনিক কম্পাইলার, রিলেশনাল ডাটাবেস ডিজাইন এবং স্বয়ংক্রিয় সিআই/সিডি ডেপ্লয়মেন্টের বিস্তারিত গাইড।',
    canonicalUrl: 'https://next-solution.com/blog/complete-web-development-guide',
    ogImage: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
    authorRoleEn: 'Founder & CTO',
    authorRoleBn: 'প্রতিষ্ঠাতা ও সিটিও',
    authorBioEn: 'Sanjid is a veteran SaaS architect and system developer with over 12 years of core full-stack experience.',
    authorBioBn: 'সানজিদ ১২ বছরেরও বেশি ফুল-স্ট্যাক ও ক্লাউড সিস্টেমস অভিজ্ঞতাসম্পন্ন একজন জ্যেষ্ঠ স্যাস আর্কিটেক্ট।',
    authorPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    authorTwitter: 'sanjid_tech',
    authorLinkedin: 'sanjid-rahman-next'
  },
  {
    id: '5',
    titleEn: 'AI Agents: Transforming Complex Business Workflows',
    titleBn: 'এআই এজেন্ট: জটিল ব্যবসায়িক ওয়ার্কফ্লো রূপান্তর',
    excerptEn: 'How Next Solution is engineering autonomous systems to automate administrative tasks and eliminate processing backlogs.',
    excerptBn: 'নেক্সট সলিউশন কীভাবে প্রশাসনিক কাজ স্বয়ংক্রিয় করতে এবং ব্যাকলগ দূর করতে স্বায়ত্তশাসিত এআই এজেন্ট তৈরি করছে।',
    contentEn: `## The Rise of Cognitive Systems
We are moving from passive tools that require manual clicks to active agents that observe, reason, and act. Autonomous AI Agents are currently restructuring internal CRMs and customer pipelines.

### Agent Workflow Logic

* **Observation:** The agent monitors incoming mail, chats, or database triggers in real-time.
* **Reasoning:** Armed with a vector database of company guidelines, the model formulates an accurate action step.
* **Execution:** The agent issues API calls to ship packages, update invoices, or notify staff.

> "AI agents do not replace humans; they free professionals from repetitive, compliance-heavy administrative chores, allowing them to focus entirely on strategy."

### Measurable Results
Agencies using AI agents report a 70% decrease in support response time and immediate reduction in database backlogs.`,
    contentBn: `## কগনিটিভ সিস্টেমের উত্থান
আমরা প্যাসিভ ইউজার ইন্টারফেস থেকে সক্রিয় এআই এজেন্টের দিকে ধাবিত হচ্ছি যা পর্যবেক্ষণ, যুক্তিপ্রদান ও স্বয়ংক্রিয় সিদ্ধান্ত নিতে পারে।

### এজেন্টের কার্যপ্রণালী

* **পর্যবেক্ষণ:** এজেন্ট ইমেল, চ্যাট বা ডাটাবেস ট্রিগার রিয়েল টাইমে পর্যবেক্ষণ করে।
* **যুক্তিপ্রদান:** নিজস্ব কোম্পানির নির্দেশিকা মেনে কাস্টমার কুয়েরির সঠিক সমাধান নির্ধারণ করে।
* **সম্পাদন:** এপিআই-এর সাহায্যে ইনভয়েস আপডেট, ইমেল প্রেরণ বা স্টাফ নোটিফিকেশন সম্পন্ন করে।

> "এআই এজেন্ট মানুষকে প্রতিস্থাপন করে না; এটি বিরক্তিকর ও পুনরাবৃত্তিমূলক কাজগুলো থেকে মানুষকে মুক্তি দেয়।"

### পরিমাপযোগ্য ফলাফল
এআই এজেন্ট ব্যবহারের মাধ্যমে ক্লায়েন্ট সাপোর্ট সময় প্রায় ৭০% কমে আসে এবং কর্মদক্ষতা বৃদ্ধি পায়।`,
    categoryEn: 'AI Automation',
    categoryBn: 'এআই অটোমেশন',
    tags: ['AIAgents', 'Automation', 'SaaS', 'API'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    author: 'Sanjid Rahman',
    readTime: '8 Min Read',
    publishedAt: '2026-07-10',
    status: 'published',
    views: 4120,
    engagement: 350,
    isTrending: false,
    slug: 'ai-agents-transforming-complex-business-workflows',
    seoTitleEn: 'AI Agents: Transforming Complex Business Workflows',
    seoTitleBn: 'এআই এজেন্ট: জটিল ব্যবসায়িক ওয়ার্কফ্লো রূপান্তর | নেক্সট সলিউশন',
    seoDescEn: 'Discover how autonomous AI agents integrate with APIs and vector databases to automate repetitive enterprise workflows.',
    seoDescBn: 'জানুন কীভাবে এআই এজেন্ট এবং এপিআই অটোমেশন জটিল ব্যবসায়িক কাজগুলো স্বয়ংক্রিয়ভাবে সম্পন্ন করে।',
    canonicalUrl: 'https://next-solution.com/blog/ai-agents-transforming-complex-business-workflows',
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    authorRoleEn: 'Founder & CTO',
    authorRoleBn: 'প্রতিষ্ঠাতা ও সিটিও',
    authorBioEn: 'Sanjid is a veteran SaaS architect and system developer with over 12 years of core full-stack experience.',
    authorBioBn: 'সানজিদ ১২ বছরেরও বেশি ফুল-স্ট্যাক ও ক্লাউড সিস্টেমস অভিজ্ঞতাসম্পন্ন একজন জ্যেষ্ঠ স্যাস আর্কিটেক্ট।',
    authorPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    authorTwitter: 'sanjid_tech',
    authorLinkedin: 'sanjid-rahman-next'
  },
  {
    id: '6',
    titleEn: 'Agency Updates: Next Solution Achieves Vitals Standard',
    titleBn: 'এজেন্সি আপডেট: নেক্সট সলিউশন কোর ভাইটালস স্ট্যান্ডার্ড অর্জন করেছে',
    excerptEn: 'We are thrilled to announce that all customer projects deployed in Q2 have officially achieved perfect 100/100 Core Web Vitals.',
    excerptBn: 'আমরা অত্যন্ত আনন্দের সাথে জানাচ্ছি যে দ্বিতীয় প্রান্তিকে সম্পন্ন হওয়া আমাদের প্রতিটি প্রজেক্ট গুগলের নিখুঁত স্পিড স্ট্যান্ডার্ড স্পর্শ করেছে।',
    contentEn: `## Commitment to Speed
At Next Solution, speed is not an afterthought; it is our primary design constraint. We are proud to share that all customer portals launched in Q2 have achieved a perfect 100/100 on Google Lighthouse.

### How We Achieved Perfect Score

1. **Native Dynamic Compiling:** Converting bulky React pages to pre-compiled static markup.
2. **Lossless WebP Conversions:** Compressing large illustrative hero banners automatically.
3. **Zero-Layout Shifts (CLS):** Reserving physical spaces for dynamic elements before loading completes.

> "Our continuous build testing pipeline ensures that any code causing performance degradation below 95 points is automatically caught and blocked before production launch."

### What This Means for Your Business
Faster loading websites translate to an average 25% increase in form submissions and lower advertising acquisition cost.`,
    contentBn: `## গতির প্রতি আমাদের অঙ্গীকার
নেক্সট সলিউশনে স্পিডকে আমরা সবচেয়ে বড় গুরুত্ব দিই। আমাদের দ্বিতীয় প্রান্তিকে সম্পন্ন হওয়া প্রতিটি প্রজেক্ট গুগলের নিখুঁত স্পিড স্ট্যান্ডার্ড স্পর্শ করেছে।

### যেভাবে আমরা এই নিখুঁত স্কোর অর্জন করেছি

১. **ডাইনামিক কম্পাইলিং:** ভারী রিয়্যাক্ট কম্পোনেন্টকে হালকা স্ট্যাটিক পেজে রূপান্তর করা।
২. **ক্ষতিহীন ইমেজ কম্প্রেশন:** ডাইনামিক ইমেজ অপ্টিমাইজারের সাহায্যে ফাইলের আকার কমানো।
৩. **জিরো লেআউট শিফট (CLS):** পেজ লোড হওয়ার সময় লেখা ও ছবির ঝাঁকুনি দূর করা।

> "আমাদের বিল্ড টেস্ট পাইপলাইনে লাইটহাউস স্পিড স্কোর ৯৫-এর নিচে নামলে কোডটি ডেপ্লয় হতে ব্লক করা হয়।"

### আপনার ব্যবসার জন্য এর অর্থ কী?
গতিশীল লোডিং আপনার ফর্ম সাবমিশন এবং অ্যাড ক্যাম্পেইনের কার্যকারিতা গড়ে ২৫% পর্যন্ত বাড়িয়ে দিতে পারে।`,
    categoryEn: 'News',
    categoryBn: 'সংবাদ',
    tags: ['Updates', 'Lighthouse', 'SLA', 'NextSolution'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800',
    author: 'Tasnim Ahmed',
    readTime: '3 Min Read',
    publishedAt: '2026-07-11',
    status: 'published',
    views: 1850,
    engagement: 142,
    isLatestNews: true,
    slug: 'agency-updates-next-solution-core-speed-standard-hit',
    seoTitleEn: 'Agency Updates: Perfect Core Web Vitals | Next Solution',
    seoTitleBn: 'এজেন্সি আপডেট: কোর ভাইটালস স্ট্যান্ডার্ড অর্জন | নেক্সট সলিউশন',
    seoDescEn: 'All Q2 enterprise projects designed and launched by Next Solution officially hit perfect 100/100 Google Lighthouse scores.',
    seoDescBn: 'নেক্সট সলিউশন দ্বারা নির্মিত সকল এন্টারপ্রাইজ প্রজেক্টে গুগল লাইটহাউসের নিখুঁত ১০০/১০০ গতি অর্জনের খবর জানুন।',
    canonicalUrl: 'https://next-solution.com/blog/agency-updates-next-solution-core-speed-standard-hit',
    ogImage: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800',
    authorRoleEn: 'Chief Design Officer',
    authorRoleBn: 'চিফ ডিজাইন অফিসার',
    authorBioEn: 'Tasnim directs the frontend design and brand identity systems at Next Solution, focusing on pixel perfection.',
    authorBioBn: 'তাসনিম নেক্সট সলিউশনের ব্র্যান্ড আইডেন্টিটি এবং পিক্সেল পারফেক্ট ডিজাইন সলিউশন নিয়ে কাজ করেন।',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    authorTwitter: 'tasnim_design',
    authorLinkedin: 'tasnim-ahmed-design'
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: '1',
    categoryEn: 'Process',
    categoryBn: 'প্রক্রিয়া',
    questionEn: 'How long does a custom enterprise portal design and build take?',
    questionBn: 'একটি কাস্টম এন্টারপ্রাইজ পোর্টাল ডিজাইন এবং তৈরিতে কত সময় লাগে?',
    answerEn: 'Typically, a full-scale design and agile software build takes between 8 to 16 weeks depending on database complexity and custom logic. We operate in bi-weekly milestones with live staging environments so you can track exact progress.',
    answerBn: 'সাধারণত, ডাটাবেস জটিলতা এবং কাস্টম লজিকের উপর ভিত্তি করে একটি সম্পূর্ণ ডিজাইন এবং সফটওয়্যার বিল্ড করতে ৮ থেকে ১৬ সপ্তাহ সময় লাগে। আমরা লাইভ স্টেজিং পরিবেশের সাথে প্রতি দুই সপ্তাহে মাইলস্টোন হিসেবে কাজ করি যাতে আপনি কাজের অগ্রগতি পর্যবেক্ষণ করতে পারেন।',
    helpfulCount: 24
  },
  {
    id: '2',
    categoryEn: 'Database & Code',
    categoryBn: 'ডাটাবেস ও কোড',
    questionEn: 'Do I get full ownership of the developed source code and system assets?',
    questionBn: 'আমি কি তৈরি করা সোর্স কোড এবং সিস্টেম অ্যাসেটের সম্পূর্ণ মালিকানা পাব?',
    answerEn: 'Yes, absolutely. Upon successful project sign-off and milestone completion, 100% intellectual property rights and full clean Git repository access are officially transferred to your organization.',
    answerBn: 'হ্যাঁ, অবশ্যই। প্রকল্প সফলভাবে সমাপ্ত হলে, সোর্স কোডের শতভাগ মেধা সম্পত্তি অধিকার এবং পরিষ্কার গিট রিপোজিটরি অ্যাক্সেস আনুষ্ঠানিকভাবে আপনার সংস্থায় স্থানান্তরিত করা হবে।',
    helpfulCount: 18
  },
  {
    id: '3',
    categoryEn: 'Support',
    categoryBn: 'সহায়তা',
    questionEn: 'What happens after the digital application goes live to the public?',
    questionBn: 'ডিজিটাল অ্যাপ্লিকেশনটি লাইভ হওয়ার পর কি ধরনের সহায়তা পাওয়া যায়?',
    answerEn: 'We provide 30 days of comprehensive hyper-care support for free. Following that, we offer custom monthly SLA (Service Level Agreement) options covering secure database backups, platform updates, and ongoing visual improvements.',
    answerBn: 'আমরা বিনামূল্যে ৩০ দিনের জন্য বিস্তৃত হাইপার-কেয়ার সাপোর্ট প্রদান করি। এর পরে, আমরা ডাটাবেস ব্যাকআপ, প্ল্যাটফর্ম আপডেট এবং চলমান ভিজ্যুয়াল উন্নতির জন্য কাস্টম মাসিক এসএলএ (পরিষেবা স্তরের চুক্তি) অফার করি।',
    helpfulCount: 12
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    roleEn: 'VP of Digital Experience',
    roleBn: 'ভিপি অফ ডিজিটাল এক্সপেরিয়েন্স',
    company: 'Fintech Spark Inc.',
    feedbackEn: 'Next Solution operates on an entirely different level of design sophistication. They delivered our secure banking dashboard 3 weeks ahead of schedule and our speed stats blew past our competitors.',
    feedbackBn: 'নেক্সট সলিউশন সম্পূর্ণ ভিন্ন স্তরের ডিজাইন পরিশীলিততায় কাজ করে। তারা আমাদের নির্ধারিত সময়ের ৩ সপ্তাহ আগেই সিকিউর ব্যাংকিং ড্যাশবোর্ড সরবরাহ করেছে এবং সাইটের স্পিড প্রতিদ্বন্দ্বীদের ছাড়িয়ে গেছে।',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '2',
    name: 'David Chen',
    roleEn: 'Founder & CEO',
    roleBn: 'প্রতিষ্ঠাতা ও সিইও',
    company: 'Sora Web3 Labs',
    feedbackEn: 'Their UI/UX team is unmatched. They built a custom design system that unified our web portal, dashboards, and landing pages. Our conversion rates shot up by 42% on week one of deployment.',
    feedbackBn: 'তাদের ইউআই/ইউএক্স টিম অতুলনীয়। তারা একটি কাস্টম ডিজাইন সিস্টেম তৈরি করেছে যা আমাদের পোর্টাল, ড্যাশবোর্ড এবং ল্যান্ডিং পেজগুলিকে একত্রিত করেছে। প্রথম সপ্তাহেই আমাদের কনভার্সন রেট ৪২% বৃদ্ধি পেয়েছে।',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '3',
    name: 'Ziaul Hoque',
    roleEn: 'Chief Operations Officer',
    roleBn: 'প্রধান পরিচালন কর্মকর্তা',
    company: 'Pioneer BD Logistics',
    feedbackEn: 'From initial technical diagram architecture to final deployment, Next Solution handled everything with absolute precision. Their team communication was flawless, transparent, and direct.',
    feedbackBn: 'প্রাথমিক কারিগরি ডায়াগ্রাম আর্কিটেকচার থেকে চূড়ান্ত ডেপ্লয়মেন্ট পর্যন্ত, নেক্সট সলিউশন সবকিছু অত্যন্ত সূক্ষ্মতার সাথে পরিচালনা করেছে। তাদের যোগাযোগের মাধ্যম ছিল নিখুঁত ও স্বচ্ছ।',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const defaultSiteSettings: SiteSettings = {
  id: '1',
  agencyName: 'Next Solution',
  taglineEn: 'Transforming Ideas Into Digital Success.',
  taglineBn: 'আইডিয়াকে রূপান্তরিত করুন ডিজিটাল সাফল্যে।',
  addressEn: 'Suite 404, Silicon High-Street, Dhaka, Bangladesh',
  addressBn: 'স্যুট ৪০৪, সিলিকন হাই-স্ট্রিট, ঢাকা, বাংলাদেশ',
  phone: '+880 1711 000000',
  email: 'hello@nextsolution.co',
  facebook: 'https://facebook.com/nextsolution',
  linkedin: 'https://linkedin.com/company/nextsolution',
  twitter: 'https://twitter.com/nextsolution',
  instagram: 'https://instagram.com/nextsolution',
  workingHoursEn: 'Mon - Fri: 9:00 AM - 6:00 PM (GMT+6)',
  workingHoursBn: 'সোম - শুক্র: সকাল ৯:০০ - সন্ধ্যা ৬:০০ (জিএমটি+৬)',
  
  aboutMissionEn: 'To build high-performance, resilient software architectures paired with gorgeous user interfaces that turn product ideas into scalable business successes.',
  aboutMissionBn: 'উচ্চ-ক্ষমতাসম্পন্ন, টেকসই সফটওয়্যার আর্কিটেকচার এবং মার্জিত ইউজার ইন্টারফেস তৈরি করা যা নতুন প্রোডাক্ট আইডিয়াকে বড় ব্যবসায়িক সাফল্যে রূপান্তর করে।',
  aboutVisionEn: 'To be the ultimate global benchmark for digital craftsmanship, cutting-edge software engineering, and transparent client partnerships.',
  aboutVisionBn: 'ডিজিটাল কারুকাজ, অত্যাধুনিক সফটওয়্যার ইঞ্জিনিয়ারিং এবং স্বচ্ছ কাস্টমার পার্টনারশিপের জন্য বৈশ্বিক মানদণ্ড বা প্রধান গন্তব্য হওয়া।',
  
  statsProjects: 142,
  statsClients: 98,
  statsTeam: 15,
  statsExperience: 8,
  statsCountries: 12,
  statsSatisfaction: 99,
  statsIndustries: 14,
  statsTechs: 24,

  aboutTeamJson: JSON.stringify([
    {
      name: 'Sanjid Rahman',
      roleEn: 'Chief Technology Officer (CTO)',
      roleBn: 'প্রধান প্রযুক্তি কর্মকর্তা (সিটিও)',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      bioEn: 'Ex-Senior Full Stack Architect with a deep passion for typesafe compilations and scale.',
      bioBn: 'পূর্বে সিনিয়র ফুল-স্ট্যাক স্থপতি, টাইপ-সেফ কম্পাইলেশন এবং স্কেলিংয়ে দক্ষ।',
      skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Go'],
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Tasnim Ahmed',
      roleEn: 'Chief Design Officer (CDO)',
      roleBn: 'প্রধান ডিজাইন কর্মকর্তা (সিডিও)',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      bioEn: 'Awwwards-winning Visual and Interaction Designer who believes in spacious, human layouts.',
      bioBn: 'পুরস্কার বিজয়ী ভিজ্যুয়াল এবং ইন্টারঅ্যাকশন ডিজাইনার যিনি ফাঁকা স্থান এবং মানবিক লেআউটে বিশ্বাসী।',
      skills: ['Figma', 'Mobile App', 'Design Systems', 'Framer'],
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    },
    {
      name: 'Dr. Asif Karim',
      roleEn: 'VP of Organic Search Strategy',
      roleBn: 'অর্গানিক সার্চ স্ট্র্যাটেজি ভিপি',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      bioEn: 'SEO veteran who decodes semantic crawling algorithms and drives double-digit lead ratios.',
      bioBn: 'এসইও বিশেষজ্ঞ যিনি সার্চ ইঞ্জিন ক্রলিং অ্যালগরিদম ডিকোড করে কাস্টমার লিড বাড়াতে কাজ করেন।',
      skills: ['SEO Strategy', 'Data Analytics', 'Marketing Automation'],
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  ]),

  aboutTimelineJson: JSON.stringify([
    {
      year: '2018',
      titleEn: 'Company Founded',
      titleBn: 'কোম্পানি প্রতিষ্ঠা',
      descEn: 'Next Solution started in a small room with 2 engineers and a single vision.',
      descBn: 'মাত্র ২ জন প্রকৌশলী এবং এক দূরদর্শী ভিশন নিয়ে একটি ছোট রুমে যাত্রা শুরু হয়।'
    },
    {
      year: '2020',
      titleEn: 'First Enterprise Client',
      titleBn: 'প্রথম এন্টারপ্রাইজ ক্লায়েন্ট',
      descEn: 'Partnered with Fintech Spark to build their secure payment gateway systems.',
      descBn: 'ফিনটেক পার্কের সাথে চুক্তিবদ্ধ হয়ে প্রথম সিকিউর পেমেন্ট গেটওয়ে সিস্টেম চালু।'
    },
    {
      year: '2022',
      titleEn: 'Global Office Expansion',
      titleBn: 'বৈশ্বিক অফিস সম্প্রসারণ',
      descEn: 'Expanded the engineering core and opened our high-speed development center.',
      descBn: 'উন্নয়ন দলের সম্প্রসারণ এবং ঢাকায় হাই-স্পিড ডেভেলপমেন্ট সেন্টার উদ্বোধন।'
    },
    {
      year: '2024',
      titleEn: '100+ Completed Projects',
      titleBn: '১০০টিরও বেশি প্রজেক্ট সম্পন্ন',
      descEn: 'Successfully deployed more than 100 high-performance mobile apps worldwide.',
      descBn: 'বিশ্বব্যাপী ১০০টিরও বেশি উচ্চ-ক্ষমতাসম্পন্ন ওয়েব অ্যাপ্লিকেশন সফলভাবে স্থাপন।'
    },
    {
      year: '2026',
      titleEn: 'Leading with AI Solutions',
      titleBn: 'এআই সলিউশনে নেতৃত্ব',
      descEn: 'Pioneered AI agents, LLM integrations, and custom database automation workflows.',
      descBn: 'এআই এজেন্ট, এলএলএম ইন্টিগ্রেশন এবং কাস্টম ডাটাবেস অটোমেশন প্রবর্তন।'
    }
  ]),

  aboutTechsJson: JSON.stringify([
    { name: 'Next.js', descEn: 'React Framework for production-grade static & dynamic scaling.', descBn: 'উৎপাদন-মানের স্ট্যাটিক এবং ডাইনামিক স্কেলিংয়ের জন্য রিঅ্যাক্ট ফ্রেমওয়ার্ক।', color: 'bg-black/5 text-black border-black/10' },
    { name: 'TypeScript', descEn: 'Static typing that guarantees flawless runtimes and refactoring.', descBn: 'রানটাইমে নিখুঁত কোড এবং রিফ্যাক্টরিংয়ের নিশ্চয়তা দিতে স্ট্যাটিক টাইপিং।', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { name: 'React', descEn: 'Interactive client views rendered through fine-grained fiber trees.', descBn: 'চমৎকার ইউজার ইন্টারেকশনের জন্য আধুনিক ক্লায়েন্ট ভিউ রেন্ডারিং ইঞ্জিন।', color: 'bg-sky-50 text-sky-600 border-sky-100' },
    { name: 'Tailwind CSS', descEn: 'High-speed utility classes that enable elegant, fluid responsive visuals.', descBn: 'সহজে সুন্দর ও রেসপনসিভ ইউজার ইন্টারফেস তৈরির জন্য আধুনিক সিএসএস।', color: 'bg-teal-50 text-teal-600 border-teal-100' },
    { name: 'Supabase', descEn: 'Real-time database triggers, secure auth, and optimized storage buckets.', descBn: 'রিয়েল-টাইম ডাটাবেস ট্রিগার, সুরক্ষিত অথেনটিকেশন এবং স্টোরেজ ক্লাউড।', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'PostgreSQL', descEn: 'Relational logic with indexes, foreign keys, and absolute integrity.', descBn: 'ইনডেক্স এবং ফরেন কি সমন্বিত বিশ্বমানের রিলেশনাল ডাটাবেস ইঞ্জিন।', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { name: 'Figma', descEn: 'Vector design workspaces for collaborative wireframes and redlines.', descBn: 'চমৎকার ইউজার এক্সপেরিয়েন্স ও প্রোটোটাইপিংয়ের জন্য ভেক্টর আর্ট বোর্ড।', color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { name: 'Framer Motion', descEn: 'Physics-based animations for delightful interaction loops.', descBn: 'ইউজার ইন্টারঅ্যাকশনে চমৎকার অনুভূতি যোগ করতে ফিজিক্স-ভিত্তিক অ্যানিমেশন।', color: 'bg-pink-50 text-pink-600 border-pink-100' }
  ])
};

export const initialPricingPackages: PricingPackage[] = [
  // 1. ALL-IN-ONE AGENCY PACKAGES
  {
    id: 'agency-starter',
    category: 'Agency Packages',
    nameEn: 'Starter Scale',
    nameBn: 'স্টার্টার স্কেল',
    priceMonthly: 1499,
    priceYearly: 1199,
    descriptionEn: 'Perfect for startups and small businesses requiring pristine MVP design and rapid launch execution.',
    descriptionBn: 'ডিজিটাল প্ল্যাটফর্মের দ্রুত শুরু ও রেসপন্সিভ ওয়েবসাইট ডেভেলপমেন্টের জন্য আদর্শ।',
    featuresEn: [
      'Discovery Consultation',
      'Custom Responsive Website',
      'Basic On-Page SEO Setup',
      'Interactive Contact Form',
      'Speed Optimization (Sub-1s Paint)',
      'Basic SSL & Security Config',
      '100% Mobile Responsive Layout',
      'Social Media Integration',
      '1 Month Hyper-Care Support'
    ],
    featuresBn: [
      'ডিসকভারি কনসালটেশন',
      'কাস্টম রেসপন্সিভ ওয়েবসাইট',
      'বেসিক অন-পেজ এসইও সেটআপ',
      'ইন্টারেক্টিভ কন্টাক্ট ফর্ম',
      'স্পিড অপ্টিমাইজেশন (১ সেকেন্ডের কম)',
      'বেসিক এসএসএল ও সিকিউরিটি কনফিগ',
      '১০০% মোবাইল রেসপন্সিভ লেআউট',
      'সোশ্যাল মিডিয়া ইন্টিগ্রেশন',
      '১ মাসের হাইপার-কেয়ার সাপোর্ট'
    ],
    ctaEn: 'Get Started with Starter',
    ctaBn: 'স্টার্টার দিয়ে শুরু করুন',
    popular: false,
    enabled: true,
    sortOrder: 1,
    badgeEn: 'Startups',
    badgeBn: 'স্টার্টআপস'
  },
  {
    id: 'agency-business',
    category: 'Agency Packages',
    nameEn: 'Enterprise Business',
    nameBn: 'এন্টারপ্রাইজ বিজনেস',
    priceMonthly: 3499,
    priceYearly: 2799,
    descriptionEn: 'The absolute sweet-spot for growing businesses requiring custom designs, CMS integrations, and analytics.',
    descriptionBn: 'মাঝারি আকারের করপোরেট পোর্টাল, ই-কমার্স এবং উন্নত সিআরএম প্ল্যাটফর্মের জন্য সেরা প্ল্যান।',
    featuresEn: [
      'Everything in Starter plus:',
      'Premium Custom Design System',
      'Custom Headless CMS Integration',
      'Optimized Company Blog Layout',
      'Advanced Semantic Keyword SEO',
      'Premium Speed & Core Web Vitals',
      'Framer Motion Micro-Interactions',
      'Advanced Analytics (GA4 / Hotjar)',
      '3 Months Priority Support',
      'Team CMS Training Session'
    ],
    featuresBn: [
      'স্টার্টার প্যাকেজের সবকিছু এবং:',
      'প্রিমিয়াম কাস্টম ডিজাইন সিস্টেম',
      'কাস্টম হেডলেস সিএমএস ইন্টিগ্রেশন',
      'অপ্টিমাইজড কোম্পানি ব্লগ লেআউট',
      'উন্নত সিমেন্টিক কিওয়ার্ড এসইও',
      'প্রিমিয়াম স্পিড ও কোর ওয়েব ভাইটালস',
      'ফ্রেমেক্স মোশন মাইক্রো-ইন্টারেকশন',
      'অ্যাডভান্সড অ্যানালিটিক্স (GA4 / Hotjar)',
      '৩ মাসের অগ্রাধিকার সাপোর্ট',
      'টিম সিএমএস ট্রেইনিং সেশন'
    ],
    ctaEn: 'Choose Business Plan',
    ctaBn: 'বিজনেস প্ল্যান বেছে নিন',
    popular: true,
    enabled: true,
    sortOrder: 2,
    badgeEn: 'Popular Choice',
    badgeBn: 'জনপ্রিয় পছন্দ'
  },
  {
    id: 'agency-enterprise',
    category: 'Agency Packages',
    nameEn: 'Custom Elite',
    nameBn: 'কাস্টম এলিট',
    priceMonthly: 7999,
    priceYearly: 6399,
    descriptionEn: 'Complete architectural autonomy with dedicated senior staff engineers and priority security SLA guarantees.',
    descriptionBn: 'নিবেদিত সিনিয়র স্টাফ ইঞ্জিনিয়ার এবং অত্যন্ত দ্রুত এসএলএ পারফরম্যান্স সহ সম্পূর্ণ আর্কিটেকচারাল স্বাধীনতা।',
    featuresEn: [
      'Everything in Business plus:',
      'Custom Enterprise mobile app',
      'Bespoke Fine-Tuned AI Integrations',
      'Automated Backend Workflow Systems',
      'Enterprise CRM/ERP Syncing',
      'Advanced Custom API Integration',
      '99.99% Cloud SLA Guarantees',
      'Deep Zero-Trust Security Hardening',
      'Load Testing & Scalability Planning',
      'Dedicated Senior Solutions Manager',
      '12 Months Extended Warranty Support'
    ],
    featuresBn: [
      'বিজনেস প্যাকেজের সবকিছু এবং:',
      'কাস্টম এন্টারপ্রাইজ ওয়েব অ্যাপ্লিকেশন',
      'বেসপোক ফাইন-টিউনড এআই ইন্টিগ্রেশন',
      'স্বয়ংক্রিয় ব্যাকএন্ড ওয়ার্কফ্লো সিস্টেম',
      'এন্টারপ্রাইজ সিআরএম/ইআরপি সিঙ্কিং',
      'উন্নত কাস্টম এপিআই ইন্টিগ্রেশন',
      '৯৯.৯৯% ক্লাউড এসএলএ গ্যারান্টি',
      'গভীর জিরো-ট্রাস্ট সিকিউরিটি হার্ডেনিং',
      'লোড টেস্টিং এবং স্কেলিং পরিকল্পনা',
      'নিবেদিত সিনিয়র সলিউশন ম্যানেজার',
      '১২ মাসের বর্ধিত ওয়ারেন্টি সাপোর্ট'
    ],
    ctaEn: 'Contact Enterprise Sales',
    ctaBn: 'এন্টারপ্রাইজ সেলসের সাথে কথা বলুন',
    popular: false,
    enabled: true,
    sortOrder: 3,
    badgeEn: 'Enterprises',
    badgeBn: 'এন্টারপ্রাইজ'
  },

  // 2. WEB DEVELOPMENT PRICING
  {
    id: 'webdev-basic',
    category: 'Web Development',
    nameEn: 'Web Basic',
    nameBn: 'ওয়েব বেসিক',
    priceMonthly: 999,
    priceYearly: 799,
    descriptionEn: 'High-speed responsive landing pages or simple 5-page business brochures styled with modern Tailwind CSS.',
    descriptionBn: 'আধুনিক টেলউইন্ড সিএসএস স্টাইলিং সহ হাই-স্পিড রেসপনসিভ ল্যান্ডিং পেজ বা ৫ পেজের সাধারণ ব্রোশিওর ওয়েবসাইট।',
    featuresEn: [
      'Responsive Website (Up to 5 Pages)',
      'Modern Tailwind CSS Layouts',
      'Interactive Contact Forms',
      'Basic Search Engine Schema Markup',
      'Mobile-First Fluid Layout',
      'Git Source Repository Access'
    ],
    featuresBn: [
      'রেসপনসিভ ওয়েবসাইট (সর্বোচ্চ ৫ পেজ)',
      'আধুনিক টেলউইন্ড সিএসএস লেআউট',
      'ইন্টারেক্টিভ কন্টাক্ট ফর্ম',
      'বেসিক সার্চ ইঞ্জিন স্কিমা মার্কআপ',
      'মোবাইল-ফার্স্ট ফ্লুইড লেআউট',
      'গিট সোর্স রিপোজিটরি এক্সেস'
    ],
    ctaEn: 'Choose Web Basic',
    ctaBn: 'ওয়েব বেসিক বেছে নিন',
    techEn: 'HTML5, React, Tailwind CSS, Vite',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'webdev-standard',
    category: 'Web Development',
    nameEn: 'Web Standard',
    nameBn: 'ওয়েব স্ট্যান্ডার্ড',
    priceMonthly: 1999,
    priceYearly: 1599,
    descriptionEn: 'Full-featured company portals with headless CMS, complete speed audit, blog, and high-intent analytics integrations.',
    descriptionBn: 'হেডলেস সিএমএস, স্পিড অডিট, ব্লগ এবং অ্যানালিটিক্স ইন্টিগ্রেশন সহ সম্পূর্ণ ফিচারড কোম্পানি পোর্টাল ওয়েবসাইট।',
    featuresEn: [
      'Everything in Basic plus:',
      'Headless Content Management (CMS)',
      'SEO Optimized Corporate Blog',
      'Advanced Speed Auditing (100% Core Vitals)',
      'Unified Analytics (GA4/GTM)',
      'Up to 10 Tailored Core Pages',
      '3 Months System Maintenance'
    ],
    featuresBn: [
      'বেসিকের সবকিছু এবং:',
      'হেডলেস কনটেন্ট ম্যানেজমেন্ট (সিএমএস)',
      'এসইও অপ্টিমাইজড করপোরেট ব্লগ',
      'উন্নত স্পিড অডিট (১০০% কোর ভাইটালস)',
      'ইউনিফায়েড অ্যানালিটিক্স (GA4/GTM)',
      'সর্বোচ্চ ১০টি টেইলার্ড কোর পেজ',
      '৩ মাসের সিস্টেম রক্ষণাবেক্ষণ'
    ],
    ctaEn: 'Choose Web Standard',
    ctaBn: 'ওয়েব স্ট্যান্ডার্ড বেছে নিন',
    techEn: 'Next.js, Tailwind CSS, Sanity CMS, Vercel',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'webdev-premium',
    category: 'Web Development',
    nameEn: 'Web Premium',
    nameBn: 'ওয়েব প্রিমিয়াম',
    priceMonthly: 3999,
    priceYearly: 3199,
    descriptionEn: 'Enterprise portal with customized admin controls, full performance optimization, and deep API integrations.',
    descriptionBn: 'কাস্টমাইজড অ্যাডমিন কন্ট্রোল, ফুল পারফরম্যান্স অপ্টিমাইজেশন এবং গভীর এপিআই ইন্টিগ্রেশন সহ এন্টারপ্রাইজ পোর্টাল।',
    featuresEn: [
      'Everything in Standard plus:',
      'Bespoke Interactive Animations',
      'Custom Secured Admin Dashboard',
      'Deep Third-Party API Integrations',
      'Advanced Semantic Rank-Tracker SEO',
      'Ultra-Speed Database Caching Config',
      '12 Months Code Warranty & SLAs'
    ],
    featuresBn: [
      'স্ট্যান্ডার্ডের সবকিছু এবং:',
      'বেসপোক ইন্টারেক্টিভ অ্যানিমেশন',
      'কাস্টম সিকিউরড অ্যাডমিন ড্যাশবোর্ড',
      'গভীর থার্ড-পার্টি এপিআই ইন্টিগ্রেশন',
      'উন্নত সিমেন্টিক র্যাঙ্ক-ট্র্যাকার এসইও',
      'আল্ট্রা-স্পিড ডাটাবেস ক্যাশিং কনফিগ',
      '১২ মাসের কোড ওয়ারেন্টি ও এসএলএ গ্যারান্টি'
    ],
    ctaEn: 'Choose Web Premium',
    ctaBn: 'ওয়েব প্রিমিয়াম বেছে নিন',
    techEn: 'Next.js, Supabase, Node.js, PostgreSQL',
    enabled: true,
    sortOrder: 3
  },

  // 3. mobile app PRICING
  {
    id: 'webapp-basic',
    category: 'Web App',
    nameEn: 'App MVP',
    nameBn: 'অ্যাপ এমভিপি',
    priceMonthly: 2499,
    priceYearly: 1999,
    descriptionEn: 'Pragmatic MVP design with user login, robust database logic, and responsive admin dashboard grids.',
    descriptionBn: 'ইউজার লগইন, শক্তিশালী ডাটাবেস লজিক এবং রেসপনসিভ অ্যাডমিন ড্যাশবোর্ড গ্রিড সহ মিনিমাম ভায়াবল প্রোডাক্ট (MVP)।',
    featuresEn: [
      'Custom Web Dashboard Interface',
      'Secure User Authentication (OAuth)',
      'Relational Database Modeling',
      'Standard Role Management (Admin/User)',
      'Basic Reporting Analytics Dashboard',
      '10 Core Functional App Screens'
    ],
    featuresBn: [
      'কাস্টম ওয়েব ড্যাশবোর্ড ইন্টারফেস',
      'সুরক্ষিত ইউজার অথেনটিকেশন (OAuth)',
      'রিলেশনাল ডাটাবেস মডেলিং',
      'স্ট্যান্ডার্ড রোল ম্যানেজমেন্ট (অ্যাডমিন/ইউজার)',
      'বেসিক রিপোর্টিং অ্যানালিটিক্স ড্যাশবোর্ড',
      '১০টি কোর ফাংশনাল অ্যাপ স্ক্রিন'
    ],
    ctaEn: 'Launch MVP Tier',
    ctaBn: 'এমভিপি টায়ার শুরু করুন',
    techEn: 'React, Node.js, Express, MongoDB',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'webapp-standard',
    category: 'Web App',
    nameEn: 'App Scale',
    nameBn: 'অ্যাপ স্কেল',
    priceMonthly: 4999,
    priceYearly: 3999,
    descriptionEn: 'Production-ready software architectures with booking, payment, ERP systems, and secure API gateways.',
    descriptionBn: 'বুকিং, পেমেন্ট, ইআরপি সিস্টেম এবং সুরক্ষিত এপিআই গেটওয়ে সহ প্রোডাকশন-রেডি সফটওয়্যার আর্কিটেকচার।',
    featuresEn: [
      'Everything in MVP plus:',
      'Interactive Booking or Booking Scheduling',
      'Secure Stripe/Paypal Payment Gateways',
      'Custom ERP or Inventory Tracking System',
      'Multi-Tenant Role Permissions Layouts',
      'Comprehensive PDF Receipt Render Engine',
      'Real-Time Live Webpack Notifications'
    ],
    featuresBn: [
      'এমভিপির সবকিছু এবং:',
      'ইন্টারেক্টিভ বুকিং বা শিডিউলিং সিস্টেম',
      'সুরক্ষিত স্ট্রাইপ/পেপ্যাল পেমেন্ট গেটওয়ে',
      'কাস্টম ইআরপি বা ইনভেন্টরি ট্র্যাকিং সিস্টেম',
      'মাল্টি-টেন্যান্ট রোল পারমিশন লেআউট',
      ' can render dynamic PDF receipts directly',
      'রিয়েল-টাইম লাইভ নোটিফিকেশন সিস্টেম'
    ],
    ctaEn: 'Choose App Scale',
    ctaBn: 'অ্যাপ স্কেল বেছে নিন',
    techEn: 'Next.js, Supabase, Postgres, Stripe',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'webapp-premium',
    category: 'Web App',
    nameEn: 'App Enterprise',
    nameBn: 'অ্যাপ এন্টারপ্রাইজ',
    priceMonthly: 9999,
    priceYearly: 7999,
    descriptionEn: 'High-availability mobile apps built for extreme throughput, custom AI loops, and redundant servers.',
    descriptionBn: 'উচ্চ ধারণক্ষমতার ওয়েব অ্যাপ্লিকেশন যা চরম কর্মক্ষমতা, কাস্টম এআই লুপ এবং রিডান্ডেন্ট সার্ভারের জন্য তৈরি।',
    featuresEn: [
      'Everything in Scale plus:',
      'Custom Integrated AI Automation Co-pilots',
      'Complex External API Gateway Integrations',
      'Server-Authoritative Real-Time Syncs',
      'Zero-Trust Security & Row-Level Encryptions',
      'High-Load Testing Audits (100k+ Users)',
      'Sub-hour SLA Technical Emergency Line'
    ],
    featuresBn: [
      'স্কেলের সবকিছু এবং:',
      'কাস্টম ইন্টিগ্রেটেড এআই অটোমেশন কো-পাইলট',
      'জটিল এক্সটার্নাল এপিআই গেটওয়ে ইন্টিগ্রেশন',
      'সার্ভার-অথরিটেটিভ রিয়েল-টাইম সিঙ্কিং',
      'জিরো-ট্রাস্ট সিকিউরিটি এবং রো-লেভেল এনক্রিপশন',
      'হাই-লোড টেস্টিং অডিট (১ লাখ+ ইউজার)',
      '১ ঘণ্টার কম সময়ের এসএলএ ইমার্জেন্সি লাইন'
    ],
    ctaEn: 'Choose App Enterprise',
    ctaBn: 'অ্যাপ এন্টারপ্রাইজ বেছে নিন',
    techEn: 'React, Go / Node, AWS, PostgreSQL',
    enabled: true,
    sortOrder: 3
  },

  // 4. UI/UX DESIGN PRICING
  {
    id: 'uiux-basic',
    category: 'UI/UX Design',
    nameEn: 'UX Concept',
    nameBn: 'ইউএক্স কনসেপ্ট',
    priceMonthly: 799,
    priceYearly: 599,
    descriptionEn: 'Low-fidelity layouts, interactive digital wireframes, and mood board assets aligning visual ideas.',
    descriptionBn: 'ডিজিটাল ওয়্যারফ্রেম, লো-ফিডেলিটি লেআউট এবং ভিজ্যুয়াল আইডিয়া সাজানোর জন্য মুড বোর্ড অ্যাসেটস।',
    featuresEn: [
      'Detailed Concept Discovery Audit',
      'Interactive Figma Wireframe Blueprinting',
      'Aesthetic Typography Pairings Mood Boards',
      'Up to 5 Core Screen Visual Architecture',
      'Digital Vector Brand Alignment Review'
    ],
    featuresBn: [
      'বিস্তারিত কনসেপ্ট ডিসকভারি অডিট',
      'ইন্টারেক্টিভ ফিগমা ওয়্যারফ্রেম ব্লুপ্রিন্টিং',
      'টাইপোগ্রাফি ও কালার মুড বোর্ড',
      'সর্বোচ্চ ৫টি কোর স্ক্রিন ভিজ্যুয়াল আর্কিটেকচার',
      'ডিজিটাল ভেক্টর ব্র্যান্ড অ্যালাইনমেন্ট রিভিউ'
    ],
    ctaEn: 'Choose UX Concept',
    ctaBn: 'ইউএক্স কনসেপ্ট বেছে নিন',
    techEn: 'Figma, FigJam, Adobe Illustrator',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'uiux-standard',
    category: 'UI/UX Design',
    nameEn: 'UX Professional',
    nameBn: 'ইউএক্স প্রফেশনাল',
    priceMonthly: 1799,
    priceYearly: 1399,
    descriptionEn: 'High-fidelity layouts with interactive Figma design prototypes, fully componentized buttons and spacing guides.',
    descriptionBn: 'ইন্টারেক্টিভ ফিগমা প্রোটোটাইপ সহ হাই-ফিডেলিটি লেআউট, সম্পূর্ণ কম্পোনেন্টাইজড বাটন ও স্পেসিং গাইড।',
    featuresEn: [
      'Everything in UX Concept plus:',
      'High-Fidelity UI Interface Layout Design',
      'Fully Interactive Clickable Prototypes',
      'Global Design System Variables Config',
      'Developer Redline Specs Hand-off Manual',
      'Up to 15 Screens Visual Specifications',
      '2 Rounds of Complete Design Revisions'
    ],
    featuresBn: [
      'ইউএক্স কনসেপ্টের সবকিছু এবং:',
      'হাই-ফিডেলিটি ইউআই ইন্টারফেস লেআউট ডিজাইন',
      'সম্পূর্ণ ইন্টারেক্টিভ ক্লিকেবল প্রোটোটাইপ',
      'গ্লোবাল ডিজাইন সিস্টেম ভ্যারিয়েবলস কনফিগ',
      'ডেভেলপার রেডলাইন স্পেকস হ্যান্ড-অফ ম্যানুয়াল',
      'সর্বোচ্চ ১৫টি স্ক্রিনের ভিজ্যুয়াল স্পেকস',
      '২ রাউন্ড সম্পূর্ণ ডিজাইন রিভিশন'
    ],
    ctaEn: 'Choose UX Professional',
    ctaBn: 'ইউএক্স প্রফেশনাল বেছে নিন',
    techEn: 'Figma, Principle, Zeplin',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'uiux-premium',
    category: 'UI/UX Design',
    nameEn: 'UX Premium Scale',
    nameBn: 'ইউএক্স প্রিমিয়াম স্কেল',
    priceMonthly: 2999,
    priceYearly: 2399,
    descriptionEn: 'Enterprise scale visual product systems, unlimited design revisions, and micro-interaction documentation.',
    descriptionBn: 'এন্টারপ্রাইজ স্কেল ভিজ্যুয়াল প্রোডাক্ট সিস্টেম, আনলিমিটেড ডিজাইন রিভিশন এবং মাইক্রো-ইন্টারেকশন ডকুমেন্টেশন।',
    featuresEn: [
      'Everything in UX Professional plus:',
      'Dynamic Interaction Animation Layouts',
      'Responsive Web + Native Mobile Design System',
      'Comprehensive Brand Alignment Kit Assemblies',
      'Unlimited Iterative Layout Revisions',
      'Dedicated Interface Asset Export Deliverables',
      'Weekly Live Creative Review Sessions'
    ],
    featuresBn: [
      'ইউএক্স প্রফেশনালের সবকিছু এবং:',
      'ডাইনামিক ইন্টারঅ্যাকশন অ্যানিমেশন লেআউট',
      'রেসপনসিভ ওয়েব + নেティブ মোবাইল ডিজাইন সিস্টেম',
      ' can render fluid micro-animations',
      'আনলিমিটেড ইটারেটিভ লেআউট রিভিশন',
      'ডেডিকেটেড ইন্টারফেস অ্যাসেট এক্সপোর্ট ফাইলস',
      'প্রতি সপ্তাহে লাইভ ক্রিয়েটিভ রিভিউ সেশন'
    ],
    ctaEn: 'Choose UX Premium Scale',
    ctaBn: 'ইউএক্স প্রিমিয়াম স্কেল বেছে নিন',
    techEn: 'Figma, Adobe Creative Suite, Principle',
    enabled: true,
    sortOrder: 3
  },

  // 5. GRAPHIC DESIGN PRICING
  {
    id: 'graphic-basic',
    category: 'Graphic Design',
    nameEn: 'Design Core',
    nameBn: 'ডিজাইন কোর',
    priceMonthly: 399,
    priceYearly: 299,
    descriptionEn: 'Premium vector logo design paired with matching business cards and social media header designs.',
    descriptionBn: 'প্রিমিয়াম ভেক্টর লোগো ডিজাইন এবং সাথে ম্যাচিং বিজনেস কার্ড ও সোশ্যাল মিডিয়া হেডার ডিজাইন।',
    featuresEn: [
      '3 Independent Custom Vector Logo Concepts',
      'High-Resolution Print-Ready Business Cards',
      'Social Media Cover Artwork Templates',
      'Source Files Included (SVG / AI / PDF)',
      '2 Comprehensive Revision Rounds'
    ],
    featuresBn: [
      '৩টি সম্পূর্ণ ভিন্ন কাস্টম ভেক্টর লোগো কনসেপ্ট',
      'হাই-রেজোলিউশন প্রিন্ট-রেডি বিজনেস কার্ড',
      'সোশ্যাল মিডিয়া কভার আর্টওয়ার্ক টেমপ্লেট',
      'সোর্স ফাইল সরবরাহ (SVG / AI / PDF)',
      '২টি বিস্তারিত রিভিশন রাউন্ড'
    ],
    ctaEn: 'Choose Design Core',
    ctaBn: 'ডিজাইন কোর বেছে নিন',
    techEn: 'Adobe Illustrator, Photoshop',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'graphic-standard',
    category: 'Graphic Design',
    nameEn: 'Brand Suite',
    nameBn: 'ব্র্যান্ড সুইট',
    priceMonthly: 899,
    priceYearly: 699,
    descriptionEn: 'Full corporate brand systems featuring flyer templates, custom presentation slides, and custom banners.',
    descriptionBn: 'ফ্লায়ার টেমপ্লেট, কাস্টম প্রেজেন্টেশন স্লাইড এবং কাস্টম ব্যানার সহ সম্পূর্ণ করপোরেট ব্র্যান্ড সিস্টেম।',
    featuresEn: [
      'Everything in Design Core plus:',
      'Complete Corporate Brand Identity Manual',
      'Flyer Templates & Interactive PDF Brochure',
      'Custom Brand-Aligned Presentation Slide Desk',
      'Interactive Packaging or Box Die-cut Outline',
      'Up to 10 Social Media Graphics Templates'
    ],
    featuresBn: [
      'ডিজাইন কোরের সবকিছু এবং:',
      'সম্পূর্ণ করপোরেট ব্র্যান্ড আইডেন্টিটি ম্যানুয়াল',
      'ফ্লায়ার টেমপ্লেট এবং ইন্টারেক্টিভ পিডিএফ ব্রোশিওর',
      'কাস্টম ব্র্যান্ড-অ্যালাইন্ড প্রেজেন্টেশন স্লাইড ডেক',
      'ইন্টারেক্টিভ প্যাকেজিং বা বক্স ডাই-কাট আউটলাইন',
      'সর্বোচ্চ ১০টি সোশ্যাল মিডিয়া গ্রাফিক্স টেমপ্লেট'
    ],
    ctaEn: 'Choose Brand Suite',
    ctaBn: 'ব্র্যান্ড সুইট বেছে নিন',
    techEn: 'InDesign, Figma, Illustrator',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'graphic-premium',
    category: 'Graphic Design',
    nameEn: 'Elite Creative',
    nameBn: 'এলিট ক্রিয়েটিভ',
    priceMonthly: 1599,
    priceYearly: 1299,
    descriptionEn: 'Bespoke high-end digital marketing illustrations, creative brand packages, and unlimited custom revisions.',
    descriptionBn: 'বেসপোক হাই-এন্ড ডিজিটাল মার্কেটিং ইলাস্ট্রেশন, ক্রিয়েটিভ ব্র্যান্ড প্যাকেজ এবং আনলিমিটেড কাস্টম রিভিশন।',
    featuresEn: [
      'Everything in Brand Suite plus:',
      'Custom Creative Digital Vector Illustrations',
      'Premium Packaging Die-Line Box Visual Designs',
      'Unlimited Iterative Graphics Layout Adjustments',
      'Dedicated Asset Asset Library Setup (Figma)',
      'Priority Design Support Line Access'
    ],
    featuresBn: [
      'ব্র্যান্ড সুইটের সবকিছু এবং:',
      'কাস্টম ক্রিয়েটিভ ডিজিটাল ভেক্টর ইলাস্ট্রেশন',
      'প্রিমিয়াম প্যাকেজিং ডাই-লাইন বক্স ভিজ্যুয়াল ডিজাইন',
      ' can render vector branding packs',
      'আনলিমিটেড ইটারেটিভ গ্রাফিক্স লেআউট রিভিশন',
      'ডেডিকেটেড অ্যাসেট লাইব্রেরি সেটআপ (ফিগমা)',
      ' can offer priorities support'
    ],
    ctaEn: 'Choose Elite Creative',
    ctaBn: 'এলিট ক্রিয়েটিভ বেছে নিন',
    techEn: 'Illustrator, Photoshop, Figma, Dimension',
    enabled: true,
    sortOrder: 3
  },

  // 6. DIGITAL MARKETING PRICING
  {
    id: 'marketing-basic',
    category: 'Digital Marketing',
    nameEn: 'Promo Base',
    nameBn: 'প্রোমো বেস',
    priceMonthly: 499,
    priceYearly: 399,
    descriptionEn: 'Basic ad copy strategy targeting localized Facebook and Google search network placements.',
    descriptionBn: 'স্থানীয় ফেসবুক এবং গুগল সার্চ নেটওয়ার্ক প্লেসমেন্ট টার্গেট করে বেসিক অ্যাড কপি ও প্রচার কৌশল।',
    featuresEn: [
      'Facebook Ad Campaign Setup & Audit',
      'Google Search Network Text Copywriting',
      'Audience Segment & Geo-Location Strategy',
      'Standard Lead Capture Campaign Launch',
      'Monthly High-Level Performance Report'
    ],
    featuresBn: [
      'ফেসবুক অ্যাড ক্যাম্পেইন সেটআপ ও অডিট',
      'গুগল সার্চ নেটওয়ার্ক টেক্সট কপিরাইটিং',
      'অডিয়েন্স সেগমেন্ট ও জিও-লোকেশন স্ট্র্যাটেজি',
      ' can launch basic lead gen',
      'মাসিক হাই-লেভেল পারফরম্যান্স রিপোর্ট'
    ],
    ctaEn: 'Choose Promo Base',
    ctaBn: 'প্রোমো বেস বেছে নিন',
    techEn: 'Facebook Ads, Google Ads',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'marketing-standard',
    category: 'Digital Marketing',
    nameEn: 'Growth Engine',
    nameBn: 'গ্রোথ ইঞ্জিন',
    priceMonthly: 1199,
    priceYearly: 949,
    descriptionEn: 'Advanced multi-channel growth systems covering Instagram, custom retargeting funnels, and bi-weekly reports.',
    descriptionBn: 'ইনস্টাগ্রাম, কাস্টম রিটার্গেটিং ফানেল এবং দ্বি-সাপ্তাহিক রিপোর্ট সহ উন্নত মাল্টি-চ্যানেল গ্রোথ সিস্টেম।',
    featuresEn: [
      'Everything in Promo Base plus:',
      'Instagram Grid Ad Design Layout Placement',
      'Advanced Custom Retargeting Marketing Funnels',
      'Detailed Lead Generation Pipeline Workflows',
      'Bi-Weekly Interactive Loom Report Reviews',
      'A/B Split Test Ad Copy Comparisons',
      'Dedicated Growth Campaign Manager'
    ],
    featuresBn: [
      'প্রোমো বেসের সবকিছু এবং:',
      'ইনস্টাগ্রাম গ্রিড অ্যাড ডিজাইন ও প্লেসমেন্ট',
      'উন্নত কাস্টম রিটার্গেটিং মার্কেটিং ফানেল',
      ' can track leads generation workflow',
      'দ্বি-সাপ্তাহিক ইন্টারেক্টিভ লুম রিপোর্ট রিভিউ',
      'এ/বি স্প্লিট টেস্ট অ্যাড কপি তুলনা',
      'নিবেদিত গ্রোথ ক্যাম্পেইন ম্যানেজার'
    ],
    ctaEn: 'Choose Growth Engine',
    ctaBn: 'গ্রোথ ইঞ্জিন বেছে নিন',
    techEn: 'Meta Ads Manager, Google Ads, GA4',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'marketing-premium',
    category: 'Digital Marketing',
    nameEn: 'Dominance Scale',
    nameBn: 'ডমিন্যান্স স্কেল',
    priceMonthly: 2499,
    priceYearly: 1999,
    descriptionEn: 'High-intent omnichannel setups, dedicated weekly optimization sprints, and advanced automated reports.',
    descriptionBn: 'উচ্চ-আগ্রহী ওমনিচ্যানেল সেটআপ, নিবেদিত সাপ্তাহিক অপ্টিমাইজেশন স্প্রিন্ট এবং অ্যাডভান্সড অটোমেটেড রিপোর্ট।',
    featuresEn: [
      'Everything in Growth Engine plus:',
      'Omnichannel Campaign Sync Layout Structures',
      'Weekly Active Campaign Budget Optimizations',
      'Highly Advanced GA4 Metric Tracking Dashboards',
      'Unlimited Ad Copy Variations & Sprints',
      'Comprehensive Competitor Ad Placements Audits',
      'Immediate Priority Phone & Slack Desk Access'
    ],
    featuresBn: [
      'গ্রোথ ইঞ্জিনের সবকিছু এবং:',
      ' can sync omnichannels campaigns',
      ' can optimize campaigns budget weekly',
      ' can build Google Analytics Dashboards',
      ' can create unlimited variations of ads',
      ' can audit competitors ads',
      ' can prioritize Slack and phone setup'
    ],
    ctaEn: 'Choose Dominance Scale',
    ctaBn: 'ডমিন্যান্স স্কেল বেছে নিন',
    techEn: 'Meta Ads, Google Ads, Hotjar, HubSpot',
    enabled: true,
    sortOrder: 3
  },

  // 7. SEO PRICING
  {
    id: 'seo-basic',
    category: 'SEO',
    nameEn: 'SEO Spark',
    nameBn: 'এসইও স্পার্ক',
    priceMonthly: 399,
    priceYearly: 299,
    descriptionEn: 'Initial web audit, core meta tag structure updates, and local search page setup.',
    descriptionBn: 'প্রাথমিক ওয়েবসাইট নিরীক্ষা, কোর মেটা ট্যাগ স্ট্রাকচার আপডেট এবং স্থানীয় সার্চ পেজ সেটআপ।',
    featuresEn: [
      'Comprehensive Website Audit Checklist',
      'High-Intent Keyword Competitor Research',
      'Core Meta Tags Optimization Layouts',
      'Google Search Console Setup Alignment',
      'Google Business Profile Setup'
    ],
    featuresBn: [
      'বিস্তারিত ওয়েবসাইট অডিট চেকলিস্ট',
      'হাই-ইনটেন্ট কিওয়ার্ড ও প্রতিযোগী বিশ্লেষণ',
      'কোর মেটা ট্যাগ অপ্টিমাইজেশন লেআউট',
      ' can configure Google Search Console',
      'গুগল বিজনেস প্রোফাইল সেটআপ ও ভেরিফাই'
    ],
    ctaEn: 'Choose SEO Spark',
    ctaBn: 'এসইও স্পার্ক বেছে নিন',
    techEn: 'Screaming Frog, Google Search Console',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'seo-standard',
    category: 'SEO',
    nameEn: 'SEO Rank Engine',
    nameBn: 'এসইও র‍্যাঙ্ক ইঞ্জিন',
    priceMonthly: 999,
    priceYearly: 799,
    descriptionEn: 'Off-page strategy, complete technical indexing audits, content maps, and high-quality link profiles.',
    descriptionBn: 'অফ-পেজ এসইও কৌশল, সম্পূর্ণ টেকনিক্যাল ইনডেক্সিং অডিট, কন্টেন্ট ম্যাপ এবং হাই-কোয়ালিটি ব্যাকলিংক প্রোفাইল।',
    featuresEn: [
      'Everything in SEO Spark plus:',
      'Deep Technical Indexing XML Audits',
      'Semantic Topic Mapping Structure Designs',
      'High-Quality Content Strategy Maps',
      '10 Target Backlink Placements Monthly',
      'Rank Tracking Performance Indicators Reports'
    ],
    featuresBn: [
      'এসইও স্পার্কের সবকিছু এবং:',
      'গভীর টেকনিক্যাল ইনডেক্সিং এক্সএমএল অডিট',
      ' can design semantic topic map',
      ' can write detailed content strategy',
      'প্রতি মাসে ১০টি টার্গেটেড ব্যাকলিংক প্লেসমেন্ট',
      ' can track keywords rankings with reports'
    ],
    ctaEn: 'Choose Rank Engine',
    ctaBn: 'র‍্যাঙ্ক ইঞ্জিন বেছে নিন',
    techEn: 'Ahrefs, Semrush, Screaming Frog',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'seo-premium',
    category: 'SEO',
    nameEn: 'SEO Authority Scale',
    nameBn: 'এসইও অথরিটি স্কেল',
    priceMonthly: 1999,
    priceYearly: 1599,
    descriptionEn: 'Advanced global link acquisitions, programmatic site speed audits, and comprehensive weekly rank updates.',
    descriptionBn: 'উন্নত গ্লোবাল লিংক অ্যাকুইজিশন, প্রোগ্রামেটিক ওয়েবসাইট স্পিড অডিট এবং প্রতি সপ্তাহে র‍্যাঙ্ক ট্র্যাকিং আপডেট।',
    featuresEn: [
      'Everything in SEO Rank Engine plus:',
      'Elite Global Premium Link Acquisition Plans',
      'Programmatic Site Load Speed Auditing Scripts',
      'Custom Semantic Ranking Dashboards Setup',
      'Weekly Dynamic Metric Update Audits',
      '24/7 Priority Project Optimization Support'
    ],
    featuresBn: [
      'এসইও র‍্যাঙ্ক ইঞ্জিনের সবকিছু এবং:',
      ' can outline elite global backlinks plans',
      ' can run programmatic pages speeds script',
      ' can set up custom rank dashboards',
      ' can run weekly dynamic audit checkups',
      ' can support priority queries round-clock'
    ],
    ctaEn: 'Choose Authority Scale',
    ctaBn: 'অথরিটি স্কেল বেছে নিন',
    techEn: 'Semrush, Ahrefs, Google Analytics, PageSpeed',
    enabled: true,
    sortOrder: 3
  },

  // 8. AI AUTOMATION & AI AGENT PRICING
  {
    id: 'ai-basic',
    category: 'AI Automation & Agent',
    nameEn: 'AI Agent Basic',
    nameBn: 'এআই এজেন্ট বেসিক',
    priceMonthly: 1499,
    priceYearly: 1199,
    descriptionEn: 'Smart AI chatbot integrations answering user questions with customized prompt constraints.',
    descriptionBn: 'কাস্টমাইজড প্রম্পট ডিজাইন সহ ব্যবহারকারীর প্রশ্নের উত্তর দিতে সক্ষম স্মার্ট এআই চ্যাটবট ইন্টিগ্রেশন।',
    featuresEn: [
      'Custom Prompt-Constrained AI Chatbot',
      'Interactive Web User Chat Interfaces',
      'Basic Knowledge-Base Source Embedding',
      'Standard Google Sheets Database Logging',
      'Standard Weekly Chat Usage Overview Logs'
    ],
    featuresBn: [
      'কাস্টম প্রম্পট-কনস্ট্রেইন্ড এআই চ্যাটবট',
      'ইন্টারেক্টিভ ওয়েব ইউজার চ্যাট ইন্টারফেস',
      ' can embed basic knowledge files',
      'গুগল শিটস ডাটাবেস লগিং সেটআপ',
      ' can log weekly AI conversations summaries'
    ],
    ctaEn: 'Launch Basic AI Agent',
    ctaBn: 'বেসিক এআই এজেন্ট শুরু করুন',
    techEn: 'Gemini API, Node.js, Vercel',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'ai-standard',
    category: 'AI Automation & Agent',
    nameEn: 'AI Agent Pro',
    nameBn: 'এআই এজেন্ট প্রো',
    priceMonthly: 3499,
    priceYearly: 2799,
    descriptionEn: 'Autonomous workflow bots linking email, WhatsApp, CRM APIs, and semantic AI knowledge structures.',
    descriptionBn: 'ইমেল, হোয়াটসঅ্যাপ, সিআরএম এপিআই এবং সিমেন্টিক এআই নলেজ স্ট্রাকচারের সাথে স্বয়ংক্রিয় ওয়ার্কফ্লো বটস।',
    featuresEn: [
      'Everything in AI Agent Basic plus:',
      'Autonomous CRM API Lead Pipeline Syncing',
      'WhatsApp Automation Chatbot Integrations',
      'Advanced Automated Custom Email Responders',
      'Bespoke Fine-Tuned AI Prompt Frameworks',
      'Interactive Usage Optimization Dashboards',
      'Comprehensive Platform Integration Training'
    ],
    featuresBn: [
      'এআই এজেন্ট বেসিকের সবকিছু এবং:',
      ' can sync CRM pipelines automatically',
      ' can deploy automated WhatsApp chatbots',
      ' can deploy high-speed automated emails responses',
      ' can engineer fine-tuned prompts templates',
      ' can build custom analytics usage interface',
      ' can offer complete onboarding training session'
    ],
    ctaEn: 'Choose AI Agent Pro',
    ctaBn: 'এআই এজেন্ট প্রো বেছে নিন',
    techEn: 'Gemini API, Make.com, n8n, WhatsApp API',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'ai-premium',
    category: 'AI Automation & Agent',
    nameEn: 'Custom AI Architect',
    nameBn: 'কাস্টম এআই আর্কিটেক্ট',
    priceMonthly: 7999,
    priceYearly: 6399,
    descriptionEn: 'Fully sovereign custom models, secure enterprise database structures, and priority developer SLAs.',
    descriptionBn: 'সম্পূর্ণ নিজস্ব কাস্টম এআই মডেল, নিরাপদ এন্টারপ্রাইজ ডাটাবেস স্ট্রাকচার এবং অগ্রাধিকারভিত্তিক ডেভেলপার এসএলএ।',
    featuresEn: [
      'Everything in AI Agent Pro plus:',
      'Fully Sovereign Custom Localized Models',
      'Secure Enterprise Vector DB Implementations',
      'Complete Automated Workflow Orchestrations',
      'Zero-Trust Dynamic Payload Data Sanitizers',
      'High-Load Request Scaling Optimization Audits',
      'Sub-hour SLA Emergency Support SLA Pager'
    ],
    featuresBn: [
      'এআই এজেন্ট প্রোর সবকিছু এবং:',
      ' can deploy self-hosted models configurations',
      ' can deploy vector database indexing',
      ' can build high scale automations workflow',
      ' can sanitize custom parameters inputs safely',
      ' can audit heavy usage scaling',
      ' can offer priority paging 24/7'
    ],
    ctaEn: 'Choose Custom AI Architect',
    ctaBn: 'কাস্টম এআই আর্কিটেক্ট বেছে নিন',
    techEn: 'Gemini API, Pinecone, LangChain, PostgreSQL',
    enabled: true,
    sortOrder: 3
  },

  // 9. VIDEO EDITING PRICING
  {
    id: 'video-basic',
    category: 'Video Editing',
    nameEn: 'Visual Core',
    nameBn: 'ভিজ্যুয়াল কোর',
    priceMonthly: 299,
    priceYearly: 229,
    descriptionEn: 'High-impact short-form videos tailored for Reels or Shorts with custom typography, captions, and cuts.',
    descriptionBn: 'কাস্টম টাইপোগ্রাফি, ক্যাপশন এবং ট্রানজিশন সহ রিলস বা শর্টসের জন্য হাই-ইমপ্যাক্ট শর্ট-ফর্ম ভিডিও।',
    featuresEn: [
      'Up to 10 Edited Reels/Shorts Monthly',
      'Modern High-Impact Kinetic Captions',
      'Basic Sound Design & SFX Insertion',
      'Color Grading for Social Media Specs',
      '2 Comprehensive Revision Loops'
    ],
    featuresBn: [
      'প্রতি মাসে ১০টি এডিটেড রিলস/শর্টস ভিডিও',
      'আধুনিক হাই-ইমপ্যাক্ট কাইনেটিক ক্যাপশন',
      'বেসিক সাউন্ড ডিজাইন ও এসএফএক্স সংযোজন',
      'সোশ্যাল মিডিয়া স্পেক্স অনুযায়ী কালার গ্রেডিং',
      '২টি বিস্তারিত রিভিশন রাউন্ড'
    ],
    ctaEn: 'Choose Visual Core',
    ctaBn: 'ভিজ্যুয়াল কোর বেছে নিন',
    techEn: 'Premiere Pro, After Effects',
    enabled: true,
    sortOrder: 1
  },
  {
    id: 'video-standard',
    category: 'Video Editing',
    nameEn: 'Creator Engine',
    nameBn: 'ক্রিয়েটর ইঞ্জিন',
    priceMonthly: 699,
    priceYearly: 549,
    descriptionEn: 'Full corporate marketing presentations, YouTube edits, beautiful motion graphics overlays.',
    descriptionBn: 'সম্পূর্ণ করপোরেট মার্কেটিং প্রেজেন্টেশন, ইউটিউব ভিডিও এডিটিং এবং চমৎকার মোশন গ্রাফিক্স ওভারলে।',
    featuresEn: [
      'Everything in Visual Core plus:',
      'Polished Full-Length YouTube Video Sprints',
      'Corporate Promotional Event Presentation Edits',
      'Delightful Motion Graphics Overlay Templates',
      'Custom Click-Optimized Artwork Thumbnails',
      'Complete Audio Noise Reduction & Cleanups'
    ],
    featuresBn: [
      'ভিজ্যুয়াল কোরের সবকিছু এবং:',
      'পরিপাটি ফুল-লেংথ ইউটিউব ভিডিও এডিটিং',
      'করপোরেট প্রমোশনাল ইভেন্ট ভিডিও এডিটিং',
      ' can overlay custom 2D motion animations',
      'কাস্টম ক্লিক-অপ্টিমাইজড থাম্বনেইল ডিজাইন',
      'সম্পূর্ণ অডিও নয়েজ রিডাকশন ও ক্লিনআপ'
    ],
    ctaEn: 'Choose Creator Engine',
    ctaBn: 'ক্রিয়েটর ইঞ্জিন বেছে নিন',
    techEn: 'After Effects, Premiere, Audition',
    popular: true,
    enabled: true,
    sortOrder: 2
  },
  {
    id: 'video-premium',
    category: 'Video Editing',
    nameEn: 'Cinematic Elite',
    nameBn: 'সিনেম্যাটিক এলিট',
    priceMonthly: 1299,
    priceYearly: 999,
    descriptionEn: 'Premium high-end corporate storytellers, advanced color grading schemas, and unlimited project adjustments.',
    descriptionBn: 'প্রিমিয়াম হাই-এন্ড করপোরেট স্টোরিটেলার ভিডিও, উন্নত কালার গ্রেডিং স্কিমা এবং আনলিমিটেড রিভিশন।',
    featuresEn: [
      'Everything in Creator Engine plus:',
      'Premium Custom High-End Video Directing',
      'Cinema-Grade Complete Color Correction Schemas',
      'Custom Multi-Track Complex SFX Layers Designs',
      'Unlimited Creative Layout Revision Access',
      'Priority Delivery Pipeline Processing Sprints'
    ],
    featuresBn: [
      'ক্রিয়েটর ইঞ্জিনের সবকিছু এবং:',
      ' can direct high end corporate shoots',
      ' can color grade using cinema tools',
      ' can compose cinematic SFX and foley layers',
      ' can edit design revisions with unlimited tickets',
      ' can prioritize delivery queue processing'
    ],
    ctaEn: 'Choose Cinematic Elite',
    ctaBn: 'সিনেম্যাটিক এলিট বেছে নিন',
    techEn: 'DaVinci Resolve, After Effects, Premiere Pro',
    enabled: true,
    sortOrder: 3
  }
];

export const initialPricingAddons: PricingAddon[] = [
  { id: 'add-1', nameEn: 'Extra Custom Pages', nameBn: 'অতিরিক্ত কাস্টম পেজ', price: '$150 / page', descriptionEn: 'Add customized, fully responsive static or dynamic page layouts to your standard packages.', descriptionBn: 'আপনার স্ট্যান্ডার্ড প্যাকেজে কাস্টমাইজড, সম্পূর্ণ রেসপনসিভ স্ট্যাটিক বা ডাইনামিক পেজ লেআউট যোগ করুন।', enabled: true },
  { id: 'add-2', nameEn: 'Extra Review Rounds', nameBn: 'অতিরিক্ত রিভিশন রাউন্ড', price: '$90 / round', descriptionEn: 'Gain an additional round of detailed visual revisions to ensure flawless look and feel.', descriptionBn: 'নিখুঁত লুক অ্যান্ড ফিল নিশ্চিত করতে অতিরিক্ত এক রাউন্ড বিস্তারিত ভিজ্যুয়াল রিভিশন নিন।', enabled: true },
  { id: 'add-3', nameEn: 'Urgent Speed Delivery', nameBn: 'জরুরি দ্রুত ডেলিভারি', price: '+$500 / project', descriptionEn: 'Accelerate your deployment milestones with dedicated extra senior engineers working weekends.', descriptionBn: 'ছুটির দিনেও ডেডিকেটেড অতিরিক্ত সিনিয়র ইঞ্জিনিয়ারদের কাজের মাধ্যমে আপনার ডেপ্লয়মেন্টের গতি বাড়ান।', enabled: true },
  { id: 'add-4', nameEn: 'Monthly System Maintenance', nameBn: 'মাসিক সিস্টেম রক্ষণাবেক্ষণ', price: '$299 / month', descriptionEn: 'Includes weekly dependency package upgrades, active database backups, and monthly metrics audit.', descriptionBn: 'প্রতি সপ্তাহে প্যাকেজ আপগ্রেড, একটিভ ডাটাবেস ব্যাকআপ এবং মাসিক পারফরম্যান্স অডিট অন্তর্ভুক্ত।', enabled: true },
  { id: 'add-5', nameEn: 'Sovereign Cloud Hosting Setup', nameBn: 'ক্লাউড হোস্টিং সেটআপ', price: '$199 (one-time)', descriptionEn: 'Configuring secure AWS Elastic Beanstalk or GCP Cloud Run container configurations for your app.', descriptionBn: 'আপনার অ্যাপের জন্য নিরাপদ AWS বা GCP ক্লাউড রান কন্টেইনার কনফিগারেশন সেটআপ।', enabled: true },
  { id: 'add-6', nameEn: 'Custom Domain & Email Setups', nameBn: 'ডোমেইন ও প্রফেশনাল ইমেল সেটআপ', price: '$99 (one-time)', descriptionEn: 'Setup custom sub-domains, Google Workspace professional email DNS routing configuration layout.', descriptionBn: 'কাস্টম সাব-ডোমেন, গুগল ওয়ার্কস্পেস প্রফেশনাল ইমেল ডিএনএস রাউটিং কনফিগারেশন সেটআপ।', enabled: true },
  { id: 'add-7', nameEn: 'Cloudflare Pro CDN Defenses', nameBn: 'ক্লাউডফ্লেয়ার প্রো সিডিএন ডিফেন্স', price: '$149 (one-time)', descriptionEn: 'Enable DDoS mitigation web rules, active caching, speed compression, and SSL key certificates.', descriptionBn: 'ডিডিওএস প্রতিরোধ ওয়েব রুলস, একটিভ ক্যাশিং, স্পিড কম্প্রেশন এবং এসএসএল সার্টিফিকেট সেটআপ।', enabled: true },
  { id: 'add-8', nameEn: 'High-Intent Content Copywriting', nameBn: 'উচ্চ-আগ্রহী কনটেন্ট কপিরাইটিং', price: '$120 / article', descriptionEn: 'SEO cluster articles researched and written by senior technical subject material experts.', descriptionBn: 'সিনিয়র টেকনিক্যাল রাইটারদের দ্বারা অপ্টিমাইজড ও রিসার্চকৃত হাই-কোয়ালিটি এসইও কন্টেন্ট আর্টিকেল।', enabled: true }
];

export const initialPricingComparisons: PricingComparison[] = [
  { id: 'comp-1', categoryEn: 'Service Level Agreement', categoryBn: 'সার্ভিস লেভেল এগ্রিমেন্ট', featureEn: 'Priority Live Chat Support', featureBn: ' can offer priority support via chat', starterEn: 'Standard Email Only', starterBn: 'সাধারণ ইমেল শুধু', businessEn: 'Priority Slack & Call', businessBn: 'স্ল্যাক ও ডিরেক্ট কল', enterpriseEn: 'Dedicated 24/7 Slack & Phone', enterpriseBn: '২৪/৭ নিবেদিত স্ল্যাক ও ফোন', sortOrder: 1 },
  { id: 'comp-2', categoryEn: 'Service Level Agreement', categoryBn: 'সার্ভিস লেভেল এগ্রিমেন্ট', featureEn: 'SLA Support Speed', featureBn: 'সাপোর্ট রেসপন্স গতি', starterEn: '24-48 Hours Wait', starterBn: '২৪-৪৮ ঘণ্টা', businessEn: 'Sub-4 Hours Business', businessBn: '৪ ঘণ্টার কম সময়', enterpriseEn: 'Sub-1 Hour Live Pager Guarantee', enterpriseBn: '১ ঘণ্টার নিচে গ্যারান্টি', sortOrder: 2 },
  { id: 'comp-3', categoryEn: 'Core Delivery Features', categoryBn: 'ডেলিভারি ফিচারসমূহ', featureEn: 'Fidelity Custom Redesigns', featureBn: 'কাস্টম ডিজাইন ফিডেলিটি', starterEn: 'Figma templates aligned', starterBn: 'ফিগমা টেমপ্লেট ভিত্তিক', businessEn: 'Bespoke Custom Design System', businessBn: 'বেসপোক কাস্টম ডিজাইন সিস্টেম', enterpriseEn: 'Unlimited Custom Interaction Layouts', enterpriseBn: ' can customize interactions blueprints', sortOrder: 3 },
  { id: 'comp-4', categoryEn: 'Core Delivery Features', categoryBn: 'ডেলিভারি ফিচারসমূহ', featureEn: 'Speed Audits Core Vitals', featureBn: 'স্পিড অডিট কোর ভাইটালস', starterEn: 'Standard Smoke Tests', starterBn: 'সাধারণ স্মোক টেস্ট', businessEn: '95%+ Mobile audit guarantee', businessBn: '৯৫%+ মোবাইল অডিট গ্যারান্টি', enterpriseEn: '100% Mobile & Desktop SLA paint', enterpriseBn: '১০০% মোবাইল ও ডেস্কটপ পেইন্ট', sortOrder: 4 },
  { id: 'comp-5', categoryEn: 'Core Delivery Features', categoryBn: 'ডেলিভারি ফিচারসমূহ', featureEn: 'SEO Configuration Frameworks', featureBn: 'এসইও কনফিগারেশন ফ্রেমওয়ার্ক', starterEn: 'Meta Schema Markup Basic', starterBn: 'বেসিক মেটা স্কিমা', businessEn: 'Advanced Keyword Semantic mapping', businessBn: ' can layout keywords mapping maps', enterpriseEn: 'Full Omnichannel Search Rank Domination', enterpriseBn: ' can deploy organic ranks system', sortOrder: 5 },
  { id: 'comp-6', categoryEn: 'Core Delivery Features', categoryBn: 'ডেলিভারি ফিচারসমূহ', featureEn: 'Content Management Integration', featureBn: 'কনটেন্ট ম্যানেজমেন্ট ইন্টিগ্রেশন', starterEn: '❌ Not Included', starterBn: '❌ অন্তর্ভুক্ত নয়', businessEn: 'Headless Sanity/Strapi CMS setup', businessBn: ' can configure Sanity/Strapi layouts', enterpriseEn: 'Custom Tailored Secured Enterprise CMS', enterpriseBn: ' can construct custom CMS systems', sortOrder: 6 },
  { id: 'comp-7', categoryEn: 'Security & Automation', categoryBn: 'নিরাপত্তা ও অটোমেশন', featureEn: 'Row-Level Database Isolation', featureBn: ' can isolate rows data tables', starterEn: '❌ Not Included', starterBn: '❌ অন্তর্ভুক্ত নয়', businessEn: 'Supabase RLS Rules configured', businessBn: ' can configure Supabase RLS rules', enterpriseEn: 'Dedicated Sovereign Cloud SQL Instance', enterpriseBn: ' can deploy dedicated database instances', sortOrder: 7 },
  { id: 'comp-8', categoryEn: 'Security & Automation', categoryBn: 'নিরাপত্তা ও অটোমেশন', featureEn: 'Custom integrated AI loops', featureBn: ' can build custom AI workflow systems', starterEn: '❌ Not Included', starterBn: '❌ অন্তর্ভুক্ত নয়', businessEn: 'Standard Chatbot Embed setups', businessBn: ' can embed basic chatbot modules', enterpriseEn: 'Fine-Tuned Specialized Multi-Agent Systems', enterpriseBn: ' can orchestrate multi-agents AI setup', sortOrder: 8 }
];

export const initialTechServiceCards: TechServiceCard[] = [
  {
    id: 'tech-card-1',
    icon: 'Globe',
    categoryEn: 'Web Development',
    categoryBn: 'ওয়েব ডেভেলপমেন্ট',
    descriptionEn: 'Custom websites built with modern technologies for speed, security, and scalability.',
    descriptionBn: 'গতি, নিরাপত্তা এবং স্কেলেবিলিটির জন্য আধুনিক প্রযুক্তিতে তৈরি কাস্টম ওয়েবসাইট।',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Laravel', 'PHP', 'WordPress', 'Shopify', 'WooCommerce', 'Cloudflare', 'Vercel', 'Supabase', 'PostgreSQL'],
    projectCount: '150+',
    popularProjectsEn: ['E-Commerce Marketplace', 'SaaS Landing Pages', 'Corporate Portals'],
    popularProjectsBn: ['ই-কমার্স মার্কেটপ্লেস', 'স্যাস ল্যান্ডিং পেজ', 'কর্পোরেট পোর্টাল'],
    benefitsEn: ['99.9% Uptime SLA', 'SEO-Optimized Code', 'Ultra-Fast Load Times'],
    benefitsBn: ['৯৯.৯% আপটাইম এসএলএ', 'এসইও-অপ্টিমাইজড কোড', 'অতি দ্রুত লোডিং স্পিড'],
    experienceLevelEn: 'Expert Level Architecture',
    experienceLevelBn: 'এক্সপার্ট লেভেল আর্কিটেকচার',
    featuredBadgeEn: 'Speed Optimized',
    featuredBadgeBn: 'স্পিড অপ্টিমাইজড',
    displayOrder: 1,
    visible: true,
    animationType: 'fade'
  },
  {
    id: 'tech-card-2',
    icon: 'Layers',
    categoryEn: 'mobile apps',
    categoryBn: 'ওয়েব অ্যাপ্লিকেশন',
    descriptionEn: 'Modern business applications and SaaS platforms.',
    descriptionBn: 'আধুনিক বিজনেস অ্যাপ্লিকেশন এবং স্যাস প্ল্যাটফর্ম।',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Firebase', 'Prisma', 'REST API', 'GraphQL', 'Vercel', 'Docker'],
    projectCount: '80+',
    popularProjectsEn: ['Real-time Dashboards', 'ERP Solutions', 'SaaS Multi-Tenant Platforms'],
    popularProjectsBn: ['রিয়েল-টাইম ড্যাশবোর্ড', 'ইআরপি সলিউশনস', 'স্যাস মাল্টি-ট্যানেন্ট প্ল্যাটফর্ম'],
    benefitsEn: ['Highly Secure Data Isolation', 'Scalable Microservices', 'Smooth User Flows'],
    benefitsBn: ['উচ্চ নিরাপদ ডেটা আইসোলেশন', 'স্কেলেবল মাইক্রোসার্ভিসেস', 'স্মুথ ইউজার ফ্লো'],
    experienceLevelEn: 'Senior Full-Stack Engineers',
    experienceLevelBn: 'সিনিয়র ফুল-স্ট্যাক ইঞ্জিনিয়ার',
    featuredBadgeEn: 'SaaS Focused',
    featuredBadgeBn: 'স্যাস ফোকাসড',
    displayOrder: 2,
    visible: true,
    animationType: 'slide-up'
  },
  {
    id: 'tech-card-3',
    icon: 'Sparkles',
    categoryEn: 'UI/UX Design',
    categoryBn: 'ইউআই/ইউএক্স ডিজাইন',
    descriptionEn: 'Human-centered interfaces and user experiences.',
    descriptionBn: 'মানুষ-কেন্দ্রিক ডিজাইন এবং চমৎকার ব্যবহারকারী অভিজ্ঞতা।',
    technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Miro', 'FigJam', 'Spline', 'Framer'],
    projectCount: '120+',
    popularProjectsEn: ['Mobile App Prototypes', 'Design Systems', 'Interactive SaaS Wireframes'],
    popularProjectsBn: ['মোবাইল অ্যাপ প্রোটোটাইপ', 'ডিজাইন সিস্টেম', 'ইন্টারেক্টিভ স্যাস ওয়্যারফ্রেম'],
    benefitsEn: ['Pixel-Perfect Prototyping', 'Consistent Component Libraries', 'High Conversion Aesthetics'],
    benefitsBn: ['পিক্সেল-পারফেক্ট প্রোটোটাইপিং', 'কনসিস্টেন্ট কম্পোনেন্ট লাইব্রেরি', 'হাই কনভার্সন ডিজাইন'],
    experienceLevelEn: 'Award-Winning Designers',
    experienceLevelBn: 'অ্যাওয়ার্ড-উইনিং ডিজাইনার',
    featuredBadgeEn: 'Aesthetic Core',
    featuredBadgeBn: 'নান্দনিক ইউজার ইন্টারফেস',
    displayOrder: 3,
    visible: true,
    animationType: 'fade'
  },
  {
    id: 'tech-card-4',
    icon: 'TrendingUp',
    categoryEn: 'SEO',
    categoryBn: 'এসইও ও অপ্টিমাইজেশন',
    descriptionEn: 'Search engine optimization focused on visibility and growth.',
    descriptionBn: 'সার্চ ইঞ্জিনের দৃশ্যমানতা এবং অর্গানিক গ্রোথ বাড়ানোর এসইও সলিউশন।',
    technologies: ['Google Search Console', 'Google Analytics', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'GTmetrix', 'PageSpeed Insights', 'Keyword Planner', 'Schema Tools'],
    projectCount: '200+',
    popularProjectsEn: ['Local Business Optimization', 'Global E-Commerce Keywords', 'SaaS Domain Authority Boost'],
    popularProjectsBn: ['লোকাল বিজনেস এসইও', 'গ্লোবাল ই-কমার্স কিওয়ার্ডস', 'স্যাস ডোমেইন অথরিটি বুস্ট'],
    benefitsEn: ['10x Organic Traffic Spikes', 'Core Web Vitals Max Speed', 'Detailed Weekly Rank Audit'],
    benefitsBn: ['১০ গুণ অর্গানিক ট্রাফিক বৃদ্ধি', 'কোর ওয়েব ভাইটালস ম্যাক্স স্পিড', 'সাপ্তাহিক র‍্যাঙ্ক অডিট'],
    experienceLevelEn: 'Certified SEO Specialists',
    experienceLevelBn: 'সার্টিফাইড এসইও স্পেশালিস্ট',
    featuredBadgeEn: 'Organic Growth',
    featuredBadgeBn: 'অর্গানিক গ্রোথ',
    displayOrder: 4,
    visible: true,
    animationType: 'slide-up'
  },
  {
    id: 'tech-card-5',
    icon: 'Megaphone',
    categoryEn: 'Digital Marketing',
    categoryBn: 'ডিজিটাল মার্কেটিং',
    descriptionEn: 'Data-driven campaigns that generate leads and sales.',
    descriptionBn: 'অধিক লিড এবং সেলস জেনারেট করার জন্য ডেটা-চালিত আধুনিক ক্যাম্পেইন।',
    technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'YouTube Ads', 'Google Analytics', 'Tag Manager', 'Mailchimp', 'HubSpot', 'Brevo'],
    projectCount: '95+',
    popularProjectsEn: ['Lead Generation Pipelines', 'E-Commerce ROAS Booster', 'Brand Awareness Launches'],
    popularProjectsBn: ['লিড জেনারেশন পাইপলাইন', 'ই-কমার্স আরওএএস বুস্টার', 'ব্র্যান্ড অ্যাওয়ারনেস ক্যাম্পেইন'],
    benefitsEn: ['Verified 4x+ Average ROAS', 'Advanced Conversion Tracking', 'Engaging Copy & Ad Graphics'],
    benefitsBn: ['৪ গুণ+ এভারেজ আরওএএস (ROAS)', 'অ্যাডভান্সড ট্র্যাকিং', 'আকর্ষণীয় কপি ও অ্যাড গ্রাফিক্স'],
    experienceLevelEn: 'Growth-Marketing Directors',
    experienceLevelBn: 'গ্রোথ-মার্কেটিং ডিরেক্টর',
    featuredBadgeEn: 'High ROI',
    featuredBadgeBn: 'হাই আরওআই (ROI)',
    displayOrder: 5,
    visible: true,
    animationType: 'fade'
  },
  {
    id: 'tech-card-6',
    icon: 'Clock',
    categoryEn: 'Video Editing',
    categoryBn: 'ভিডিও এডিটিং',
    descriptionEn: 'Professional video production and content creation.',
    descriptionBn: 'পেশাদার ভিডিও প্রোডাকশন এবং প্রিমিয়াম কন্টেন্ট ক্রিয়েশন।',
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Filmora', 'Audition', 'Canva', 'Motion Graphics Tools'],
    projectCount: '350+',
    popularProjectsEn: ['Cinematic Brand Reels', 'SaaS Explainer Videos', 'Social Media Hooks'],
    popularProjectsBn: ['সিনেমাটিক ব্র্যান্ড রিল', 'স্যাস এক্সপ্লেইনার ভিডিও', 'সোশ্যাল মিডিয়া হুকস'],
    benefitsEn: ['High Retention Pacing', 'Advanced Audio Sync', 'DaVinci Color Mapping'],
    benefitsBn: ['হাই রিটেনশন পেসিং', 'অ্যাডভান্সড অডিও সিঙ্ক', 'দাভিঞ্চি কালার গ্রেডিং'],
    experienceLevelEn: 'Senior Motion Artists',
    experienceLevelBn: 'সিনিয়র মোশন আর্টিস্ট',
    featuredBadgeEn: 'Cinematic Grade',
    featuredBadgeBn: 'সিনেমাটিক গ্রেড',
    displayOrder: 6,
    visible: true,
    animationType: 'slide-up'
  },
  {
    id: 'tech-card-7',
    icon: 'Award',
    categoryEn: 'Graphic Design',
    categoryBn: 'গ্রাফিক ডিজাইন',
    descriptionEn: 'Creative designs that strengthen your brand.',
    descriptionBn: 'আপনার ব্র্যান্ডকে শক্তিশালী ও অনন্য করার জন্য সৃজনশীল ডিজাইন।',
    technologies: ['Photoshop', 'Illustrator', 'Canva', 'InDesign', 'Figma', 'CorelDRAW', 'Lightroom'],
    projectCount: '500+',
    popularProjectsEn: ['Brand Identity Manuals', 'Corporate Stationery Kits', 'High-Impact Marketing Vectors'],
    popularProjectsBn: ['ব্র্যান্ড আইডেন্টিটি ম্যানুয়াল', 'কর্পোরেট স্টেশনারি কিট', 'মার্কেটিং ভেক্টর ডিজাইন'],
    benefitsEn: ['Unique Custom Vectors Only', 'Print-Ready Output PDF', 'Full Corporate Guidelines'],
    benefitsBn: ['সম্পূর্ণ কাস্টম ভেক্টরস', 'প্রিন্ট-রেডি পিডিএফ আউটপুট', 'বিস্তারিত কর্পোরেট গাইডলাইনস'],
    experienceLevelEn: 'Brand Visual Directors',
    experienceLevelBn: 'ব্র্যান্ড ভিজ্যুয়াল ডিরেক্টর',
    featuredBadgeEn: '100% Original',
    featuredBadgeBn: '১০০% অরিজিনাল',
    displayOrder: 7,
    visible: true,
    animationType: 'fade'
  },
  {
    id: 'tech-card-8',
    icon: 'Zap',
    categoryEn: 'AI Automation',
    categoryBn: 'এআই অটোমেশন',
    descriptionEn: 'Smart automation systems that save time and increase productivity.',
    descriptionBn: 'সময় বাঁচাতে এবং প্রোডাক্টিভিটি বাড়াতে স্মার্ট অটোমেশন সিস্টেম।',
    technologies: ['OpenAI', 'Gemini', 'Claude', 'n8n', 'Make', 'Zapier', 'LangChain', 'Supabase', 'Webhook APIs', 'Automation Workflows'],
    projectCount: '45+',
    popularProjectsEn: ['Automated CRM Nurturing', 'Bulk Blog Generator Pipeline', 'Customer Onboarding Loops'],
    popularProjectsBn: ['স্বয়ংক্রিয় সিআরএম নার্চারিং', 'বাল্ক ব্লগ জেনারেটর পাইপলাইন', 'কাস্টমার অনবোর্ডিং লুপ'],
    benefitsEn: ['Save 30+ Hours Weekly', 'Zero Coding Human Mistakes', 'Seamless 24/7 Trigger Loops'],
    benefitsBn: ['সাপ্তাহিক ৩০+ ঘণ্টা সাশ্রয়', 'ভুলত্রুটিহীন নির্ভুল অটোমেশন', '২৪/৭ নিরবচ্ছিন্ন ট্রিগার লুপ'],
    experienceLevelEn: 'Certified Solutions Architects',
    experienceLevelBn: 'সার্টিফাইড সলিউশন আর্কিটেক্ট',
    featuredBadgeEn: 'Hyper Efficient',
    featuredBadgeBn: 'হাইপার এফিসিয়েন্ট',
    displayOrder: 8,
    visible: true,
    animationType: 'slide-up'
  },
  {
    id: 'tech-card-9',
    icon: 'Cpu',
    categoryEn: 'AI Agents',
    categoryBn: 'এআই এজেন্টস',
    descriptionEn: 'Custom AI agents and intelligent assistants.',
    descriptionBn: 'কাস্টম এআই এজেন্টস এবং ইন্টেলিজেন্ট ভার্চুয়াল অ্যাসিস্ট্যান্টস।',
    technologies: ['OpenAI', 'Gemini', 'Claude', 'LangGraph', 'LangChain', 'Vector Databases', 'RAG Systems', 'MCP', 'API Integrations', 'Knowledge Bases'],
    projectCount: '30+',
    popularProjectsEn: ['Enterprise RAG Bots', 'Multi-Agent Support Desks', 'Semantic Smart Search Engines'],
    popularProjectsBn: ['এন্টারপ্রাইজ RAG বটস', 'মাল্টি-এজেন্ট সাপোর্ট ডেস্ক', 'সিমেন্টিক স্মার্ট সার্চ ইঞ্জিন'],
    benefitsEn: ['95%+ Automated Responses', 'Direct Core CRM Integrations', 'Self-Optimizing LLM Loops'],
    benefitsBn: ['৯৫%+ অটোমেটেড রেসপন্স', 'সরাসরি সিআরএম ইন্টিগ্রেশন', 'এলএলএম লুপ'],
    experienceLevelEn: 'Machine Learning Specialists',
    experienceLevelBn: 'মেশিন লার্নিং স্পেশালিস্ট',
    featuredBadgeEn: 'Next-Gen AI',
    featuredBadgeBn: 'নেক্সট-জেন এআই',
    displayOrder: 9,
    visible: true,
    animationType: 'fade'
  }
];


