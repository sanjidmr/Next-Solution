import { LegalPolicy, LegalRevision, CookieCategory, CookieSettings } from '@/types';

export const initialCookieCategories: CookieCategory[] = [
  {
    id: 'cat-essential',
    name: 'Essential Cookies',
    descriptionEn: 'These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as secure areas or custom workspaces.',
    descriptionBn: 'এই কুকিগুলো আমাদের ওয়েবসাইটের গুরুত্বপূর্ণ সেবা এবং কিছু ফিচার যেমন সুরক্ষিত ড্যাশবোর্ড ব্যবহারের জন্য অত্যন্ত আবশ্যক।',
    enabledByDefault: true,
    isEssential: true
  },
  {
    id: 'cat-analytics',
    name: 'Analytics Cookies',
    descriptionEn: 'These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.',
    descriptionBn: 'এই কুকিগুলো আমাদের ওয়েবসাইট কীভাবে ব্যবহৃত হচ্ছে বা আমাদের বিপণন প্রচারণা কতটা কার্যকর তা বুঝতে সাহায্য করার জন্য তথ্য সংগ্রহ করে।',
    enabledByDefault: false,
    isEssential: false
  },
  {
    id: 'cat-marketing',
    name: 'Marketing Cookies',
    descriptionEn: 'These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing.',
    descriptionBn: 'বিজ্ঞাপনগুলো আপনার কাছে আরও প্রাসঙ্গিক করে তুলতে এই কুকিগুলো ব্যবহার করা হয়। একই বিজ্ঞাপন যেন বারবার না আসে তাও এগুলো নিয়ন্ত্রণ করে।',
    enabledByDefault: false,
    isEssential: false
  },
  {
    id: 'cat-functional',
    name: 'Functional Cookies',
    descriptionEn: 'These cookies allow our website to remember choices you make when you use our website, such as remembering your language preference or workspace theme.',
    descriptionBn: 'এই কুকিগুলো আপনাকে আপনার ভাষা বা থিম পছন্দের মতো পূর্ববর্তী সিদ্ধান্তগুলো মনে রাখতে সাহায্য করে।',
    enabledByDefault: true,
    isEssential: false
  },
  {
    id: 'cat-preferences',
    name: 'Preferences Cookies',
    descriptionEn: 'These cookies store personalized user settings to customize your experience on our client management systems and project blueprints.',
    descriptionBn: 'আমাদের ক্লায়েন্ট ম্যানেজমেন্ট সিস্টেম এবং প্রজেক্ট ব্লুপ্রিন্টে আপনার অভিজ্ঞতা কাস্টমাইজ করতে এই কুকিগুলো ব্যক্তিগত পছন্দ সংরক্ষণ করে।',
    enabledByDefault: true,
    isEssential: false
  }
];

export const defaultCookieSettings: CookieSettings = {
  bannerTitleEn: 'We care about your privacy',
  bannerTitleBn: 'আমরা আপনার গোপনীয়তার মূল্যায়ন করি',
  bannerTextEn: 'We use cookies to optimize site functionality, analyze web traffic, and personalize advertising content in accordance with our Cookie Policy. Click "Accept All" to consent or "Customize Preferences" to set specific rules.',
  bannerTextBn: 'আমরা সাইটের কার্যকারিতা উন্নত করতে, ট্রাফিক বিশ্লেষণ করতে এবং বিজ্ঞাপন কাস্টমাইজ করতে কুকি ব্যবহার করি। সম্মতি দিতে "সব গ্রহণ করুন" চাপুন অথবা নির্দিষ্ট করতে "পছন্দ কাস্টমাইজ করুন" চাপুন।',
  enableCustomize: true,
  lastUpdated: '2026-07-11T00:00:00.000Z'
};

export const initialLegalPolicies: LegalPolicy[] = [
  {
    id: 'policy-privacy',
    type: 'privacy_policy',
    titleEn: 'Privacy Policy',
    titleBn: 'গোপনীয়তা নীতি',
    slug: 'privacy-policy',
    status: 'published',
    version: 'v1.4.0',
    effectiveDate: 'July 11, 2026',
    lastUpdated: '2026-07-11',
    seoTitle: 'Privacy Policy | Next Solution Digital Agency',
    seoDescription: 'Read the Privacy Policy of Next Solution to understand how we collect, process, and secure your personal information, technical telemetry, and device data.',
    canonicalUrl: 'https://nextsolution.co/privacy',
    ogTitle: 'Privacy Policy | Next Solution',
    ogDescription: 'Our commitment to protecting your digital footprint and ensuring maximum GDPR and CCPA compliance.',
    twitterCard: 'summary_large_image',
    schemaMarkup: '{"@context":"https://schema.org","@type":"WebPage","name":"Privacy Policy","description":"Privacy policy document for Next Solution Digital Agency"}',
    sections: [
      {
        id: 'sec-priv-intro',
        titleEn: 'Introduction',
        titleBn: 'ভূমিকা',
        contentEn: 'Welcome to Next Solution ("we", "our", or "us"). We are highly committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at legal@nextsolution.co.\n\nWhen you visit our website or use our design, development, and consultation services, you trust us with your personal information. We take this trust very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.',
        contentBn: 'নেক্সট সলিউশনে ("আমরা", "আমাদের") আপনাকে স্বাগতম। আমরা আপনার ব্যক্তিগত তথ্য এবং গোপনীয়তার অধিকার রক্ষায় অত্যন্ত প্রতিশ্রুতিবদ্ধ। আমাদের নীতি বা আপনার ব্যক্তিগত তথ্যের বিষয়ে কোনো প্রশ্ন থাকলে legal@nextsolution.co ঠিকানায় যোগাযোগ করুন।\n\nআপনি যখন আমাদের ওয়েবসাইট পরিদর্শন করেন বা আমাদের ডিজাইন, ডেভেলপমেন্ট এবং কনসালটেশন সেবা গ্রহণ করেন, তখন আপনি আমাদের উপর আস্থা রাখেন। আমরা এই আস্থাকে অত্যন্ত গুরুত্ব সহকারে নিই। এই গোপনীয়তা নীতিতে আমরা অত্যন্ত স্পষ্ট ভাষায় আমাদের ডেটা সংগ্রহ ও ব্যবহারের প্রক্রিয়া এবং আপনার অধিকারগুলো তুলে ধরেছি।'
      },
      {
        id: 'sec-priv-collect',
        titleEn: 'Information We Collect',
        titleBn: 'যেসব তথ্য আমরা সংগ্রহ করি',
        contentEn: 'We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on our platforms, or otherwise contacting us.\n\nThe personal information we collect depends on the context of your interactions with us and the choices you make. This can include: names, email addresses, phone numbers, job titles, billing addresses, and payment details.',
        contentBn: 'আমরা সেইসব ব্যক্তিগত তথ্য সংগ্রহ করি যা আপনি স্বেচ্ছায় আমাদের প্রদান করেন যখন আপনি আমাদের সেবা সম্পর্কে অনুসন্ধান করেন, আমাদের প্ল্যাটফর্মের কার্যকলাপে অংশ নেন বা আমাদের সাথে সরাসরি যোগাযোগ করেন।\n\nসংগৃহীত তথ্যগুলো আপনার সাথে আমাদের যোগাযোগের প্রেক্ষাপটের ওপর নির্ভর করে। এর মধ্যে নাম, ইমেল ঠিকানা, ফোন নম্বর, পদবি, বিলিং ঠিকানা এবং পেমেন্ট বিবরণী অন্তর্ভুক্ত থাকতে পারে।'
      },
      {
        id: 'sec-priv-personal',
        titleEn: 'Personal Information',
        titleBn: 'ব্যক্তিগত তথ্য',
        contentEn: 'When you request a service quote, subscribe to our newsletter, or fill out intake forms, we collect identifiable information. This includes your full name, business email, physical address, company details, and project budgets. This data is handled in strict compliance with global protection protocols.',
        contentBn: 'আপনি যখন কোনো সেবার মূল্য জিজ্ঞাসা করেন, আমাদের নিউজলেটারে সাবস্ক্রাইব করেন বা ফর্ম পূরণ করেন, আমরা আপনার শনাক্তযোগ্য তথ্য যেমন সম্পূর্ণ নাম, ব্যবসায়িক ইমেল, ঠিকানা, কোম্পানির নাম এবং প্রজেক্ট বাজেট সংগ্রহ করি। এই তথ্যগুলো বৈশ্বিক সুরক্ষা প্রটোকল মেনে কঠোরভাবে পরিচালনা করা হয়।'
      },
      {
        id: 'sec-priv-tech',
        titleEn: 'Technical Information',
        titleBn: 'কারিগরি তথ্য',
        contentEn: 'We automatically collect certain information when you visit, use, or navigate our platforms. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and info about how and when you use our services.',
        contentBn: 'আপনি যখন আমাদের প্ল্যাটফর্ম ভিজিট বা ব্যবহার করেন তখন আমরা স্বয়ংক্রিয়ভাবে কিছু তথ্য সংগ্রহ করি। এই তথ্যগুলো আপনার সুনির্দিষ্ট পরিচয় প্রকাশ করে না কিন্তু এতে আপনার আইপি অ্যাড্রেস, ব্রাউজার ও ডিভাইসের ধরন, অপারেটিং সিস্টেম, ভাষা পছন্দ, ডিভাইস নাম, দেশ, অবস্থান এবং ব্যবহারের সময়কাল সংক্রান্ত বিবরণ অন্তর্ভুক্ত থাকে।'
      },
      {
        id: 'sec-priv-cookies',
        titleEn: 'Cookies & Tracking Technologies',
        titleBn: 'কুকি এবং ট্র্যাকিং প্রযুক্তি',
        contentEn: 'We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. These technologies help us verify session tokens, remember preferences (such as your chosen locale/language), analyze traffic paths, and offer optimized marketing campaigns. You can control cookie categories through our granular Preferences Panel.',
        contentBn: 'আমরা সেশন বা তথ্য সংরক্ষণ করার জন্য কুকি এবং অনুরূপ ট্র্যাকিং প্রযুক্তি (যেমন ওয়েব বিকন ও পিক্সেল) ব্যবহার করি। এই প্রযুক্তিগুলো আমাদের সেশন যাচাই করতে, ভাষা মনে রাখতে, ভিজিটর ট্রাফিক বিশ্লেষণ করতে এবং বিজ্ঞাপন ক্যাম্পেইন অপ্টিমাইজ করতে সাহায্য করে। আপনি কাস্টমাইজেশন প্যানেল থেকে কুকিগুলো নিয়ন্ত্রণ করতে পারেন।'
      },
      {
        id: 'sec-priv-usage',
        titleEn: 'How We Use Your Information',
        titleBn: 'তথ্যের ব্যবহার',
        contentEn: 'We use personal information collected via our services for a variety of business purposes described below:\n\n1. To facilitate account creation and logon process.\n2. To send administrative, legal, or technical updates.\n3. To fulfill and manage your service orders and milestone billing.\n4. To request feedback, ratings, and testimonials.\n5. To protect our services and prevent malicious activities.\n6. To respond to user inquiries and offer high-fidelity tech support.',
        contentBn: 'আমরা আমাদের সেবার মাধ্যমে সংগৃহীত ব্যক্তিগত তথ্য নিম্নোক্ত ব্যবসায়িক উদ্দেশ্যে ব্যবহার করি:\n\n১. অ্যাকাউন্ট তৈরি এবং লগইন প্রক্রিয়া সহজ করতে।\n২. প্রশাসনিক, আইনি বা কারিগরি আপডেট পাঠাতে।\n৩. আপনার প্রজেক্টের অর্ডার এবং মাইলস্টোন বিলিং পরিচালনা করতে।\n৪. ফিডব্যাক, রেটিং এবং প্রশংসাপত্র পাওয়ার জন্য।\n৫. আমাদের প্ল্যাটফর্ম সুরক্ষিত রাখতে এবং ক্ষতিকর কার্যকলাপ প্রতিরোধ করতে।\n৬. গ্রাহকদের প্রশ্নের উত্তর এবং কারিগরি সহায়তা প্রদান করতে।'
      },
      {
        id: 'sec-priv-sharing',
        titleEn: 'Data Sharing & Third-party Services',
        titleBn: 'তথ্য শেয়ারিং এবং তৃতীয় পক্ষের সেবা',
        contentEn: 'We only share information with your explicit consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. This includes securely routing payments through processors like bKash, Nagad, and Stripe, and hosting structured code blueprints on GitHub or Vercel.',
        contentBn: 'আমরা কেবলমাত্র আপনার সুস্পষ্ট সম্মতি নিয়ে, আইন মেনে চলতে, আপনাকে সেবা প্রদান করতে, আপনার অধিকার রক্ষা করতে অথবা ব্যবসায়িক বাধ্যবাধকতা পূরণের জন্য তথ্য শেয়ার করি। এর মধ্যে bKash, Nagad এবং Stripe পেমেন্ট গেটওয়ের মাধ্যমে লেনদেন এবং GitHub বা Vercel-এ প্রজেক্ট হোস্ট করার বিষয় অন্তর্ভুক্ত।'
      },
      {
        id: 'sec-priv-security',
        titleEn: 'Data Security & Retention',
        titleBn: 'তথ্য নিরাপত্তা এবং স্থায়িত্ব',
        contentEn: 'We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.\n\nWe keep your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).',
        contentBn: 'আমরা যে ব্যক্তিগত তথ্য প্রসেস করি তার সুরক্ষার জন্য উপযুক্ত কারিগরি এবং সাংগঠনিক নিরাপত্তা ব্যবস্থা বাস্তবায়ন করেছি। তবে মনে রাখবেন যে ইন্টারনেট বা অনলাইন মাধ্যম শতভাগ নিরাপদ এমন গ্যারান্টি দেওয়া সম্ভব নয়।\n\nআমরা এই গোপনীয়তা নীতিতে উল্লেখিত উদ্দেশ্যগুলো পূরণ করার জন্য যতক্ষণ প্রয়োজন ততক্ষণ আপনার ব্যক্তিগত তথ্য সংরক্ষণ করি, যদি না আইন দ্বারা দীর্ঘতর সংরক্ষণ সময়কাল আবশ্যক বা অনুমোদিত হয়।'
      },
      {
        id: 'sec-priv-rights',
        titleEn: 'Your Rights & Account Deletion',
        titleBn: 'আপনার অধিকার এবং অ্যাকাউন্ট মুছে ফেলা',
        contentEn: 'Depending on your location (e.g., GDPR in the EU or CCPA in California), you have certain rights regarding your personal information, including the right to request access to and obtain a copy of your personal information, to request rectification or erasure, and to request data portability. If you wish to delete your account or wipe your contact logs, you may submit a request to our legal team at legal@nextsolution.co.',
        contentBn: 'আপনার ভৌগোলিক অবস্থানের ওপর ভিত্তি করে (যেমন ইউরোপে GDPR বা ক্যালিফোর্নিয়ায় CCPA), আপনার ব্যক্তিগত তথ্যের বিষয়ে নির্দিষ্ট কিছু অধিকার রয়েছে। এর মধ্যে তথ্যের কপি পাওয়ার অধিকার, তথ্য সংশোধন বা মুছে ফেলার অনুরোধ এবং তথ্য স্থানান্তরের অধিকার অন্তর্ভুক্ত। আপনি যদি আপনার অ্যাকাউন্ট বা যোগাযোগের লগ সম্পূর্ণরূপে মুছে ফেলতে চান, তাহলে legal@nextsolution.co ঠিকানায় অনুরোধ জানাতে পারেন।'
      },
      {
        id: 'sec-priv-contact',
        titleEn: 'Contact Information',
        titleBn: 'যোগাযোগের তথ্য',
        contentEn: 'If you have questions, comments, or complaints about this Privacy Policy, or how we handle your personal data, please contact our Legal Team at:\n\nEmail: legal@nextsolution.co\nAddress: Suite 404, Silicon High-Street, Dhaka, Bangladesh\nPhone: +880 1711 000000',
        contentBn: 'এই গোপনীয়তা নীতি বা আমাদের তথ্য পরিচালনা সম্পর্কে কোনো প্রশ্ন, মন্তব্য বা অভিযোগ থাকলে অনুগ্রহ করে আমাদের লিগ্যাল টিমের সাথে যোগাযোগ করুন:\n\nইমেল: legal@nextsolution.co\nঠিকানা: স্যুট ৪০৪, সিলিকন হাই-স্ট্রিট, ঢাকা, বাংলাদেশ\nফোন: +৮৮০ ১৭১১ ০০০০০০'
      }
    ]
  },
  {
    id: 'policy-terms',
    type: 'terms_conditions',
    titleEn: 'Terms & Conditions',
    titleBn: 'শর্তাবলী এবং নিয়মাবলী',
    slug: 'terms-conditions',
    status: 'published',
    version: 'v2.1.0',
    effectiveDate: 'July 11, 2026',
    lastUpdated: '2026-07-11',
    seoTitle: 'Terms & Conditions | Next Solution Digital Agency',
    seoDescription: 'Read the Terms & Conditions of Next Solution which govern all design, development, and consulting services provided to our global clients.',
    canonicalUrl: 'https://nextsolution.co/terms',
    ogTitle: 'Terms & Conditions | Next Solution',
    ogDescription: 'Governing terms for intellectual property, milestone billing, deliverables, support timelines, and arbitration.',
    twitterCard: 'summary_large_image',
    schemaMarkup: '{"@context":"https://schema.org","@type":"WebPage","name":"Terms & Conditions","description":"Terms and conditions for Next Solution Digital Agency"}',
    sections: [
      {
        id: 'sec-terms-acceptance',
        titleEn: 'Acceptance of Terms',
        titleBn: 'শর্তাবলীর সম্মতি',
        contentEn: 'These Terms & Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("client" or "you") and Next Solution ("we", "us", or "our"), concerning your access to and use of our digital services and website (https://nextsolution.co).\n\nBy accessing the site or utilizing our services, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms & Conditions. If you do not agree with all of these terms, then you are expressly prohibited from using our services and you must discontinue use immediately.',
        contentBn: 'এই শর্তাবলী এবং নিয়মাবলী আপনার (ব্যক্তিগতভাবে বা কোনো প্রতিষ্ঠানের পক্ষে "গ্রাহক" বা "আপনি") এবং নেক্সট সলিউশনের ("আমরা") মধ্যে একটি আইনগতভাবে বাধ্যতামূলক চুক্তি গঠন করে, যা আমাদের ডিজিটাল সেবা এবং ওয়েবসাইট (https://nextsolution.co) ব্যবহারের ক্ষেত্রে প্রযোজ্য।\n\nসাইটটি ব্যবহার করে বা আমাদের সেবা গ্রহণ করে আপনি স্বীকার করছেন যে আপনি এই শর্তাবলী পড়েছেন, বুঝেছেন এবং এতে সম্মত হয়েছেন। আপনি যদি এই সমস্ত শর্তাবলীতে সম্মত না হন, তবে আমাদের সেবা ব্যবহারে আপনার স্পষ্ট নিষেধাজ্ঞা রয়েছে এবং তাৎক্ষণিকভাবে ব্যবহার বন্ধ করতে হবে।'
      },
      {
        id: 'sec-terms-services',
        titleEn: 'Services & Project Delivery',
        titleBn: 'সেবা এবং প্রকল্প সরবরাহ',
        contentEn: 'Next Solution specializes in providing high-fidelity digital products, including enterprise web portals, UI/UX systems, and branding layouts. Project scope, timeline milestones, and exact code deliverables will be outlined in a separate Statement of Work (SOW).\n\nWe endeavor to meet all specified milestones; however, any client-side delays in assets delivery or feedback loops will automatically result in appropriate schedule adjustments.',
        contentBn: 'নেক্সট সলিউশন উচ্চমানের ডিজিটাল পণ্য যেমন এন্টারপ্রাইজ ওয়েব পোর্টাল, ইউআই/ইউএক্স সিস্টেম এবং ব্র্যান্ডিং লেআউট তৈরিতে বিশেষজ্ঞ। প্রকল্পের পরিধি, সময়রেখা এবং সুনির্দিষ্ট কোড ফাইলগুলোর বিবরণ একটি পৃথক কাজের বিবরণী (SOW) ফাইলে উল্লেখ করা হবে।\n\nআমরা সমস্ত সময়সীমা পূরণ করার চেষ্টা করি; তবে গ্রাহকের পক্ষ থেকে কোনো অ্যাসেট সরবরাহ করতে বিলম্ব বা ফিডব্যাক দিতে দেরি হলে স্বয়ংক্রিয়ভাবে প্রকল্পের শিডিউলে পরিবর্তন আনা হবে।'
      },
      {
        id: 'sec-terms-payments',
        titleEn: 'Payments & Refund Policy',
        titleBn: 'পেমেন্ট এবং রিফান্ড পলিসি',
        contentEn: 'Clients agree to pay all fees associated with services in accordance with the billing schedule defined in the SOW. Payments are securely processed via standard gateways.\n\nDue to the highly customized nature of digital design, code development, and strategic consultation, payments made for completed milestones are completely non-refundable once design assets or source files have been handed over or deployed to production.',
        contentBn: 'গ্রাহকরা কাজের বিবরণী (SOW) ফাইলে সংজ্ঞায়িত বিলিং সময়সূচী অনুযায়ী সেবার সাথে সম্পর্কিত ফি পরিশোধ করতে সম্মত হন। পেমেন্টগুলো সুরক্ষিত গেটওয়ের মাধ্যমে সম্পন্ন করা হয়।\n\nডিজিটাল ডিজাইন, কোড ডেভেলপমেন্ট এবং কৌশলগত পরামর্শের অত্যন্ত কাস্টমাইজড প্রকৃতির কারণে, ডিজাইন অ্যাসেট বা সোর্স ফাইলগুলো হস্তান্তর বা প্রোডাকশনে দেওয়ার পর সম্পন্ন মাইলস্টোনের বিপরীতে করা পেমেন্ট সম্পূর্ণরূপে অফেরতযোগ্য।'
      },
      {
        id: 'sec-terms-ip',
        titleEn: 'Intellectual Property & Licensing',
        titleBn: 'বুদ্ধিবৃত্তিক সম্পদ এবং লাইসেন্সিং',
        contentEn: 'Unless otherwise stated, all source code, software designs, vector illustrations, layouts, databases, and trademarks remain our intellectual property until the final invoice is paid in full. Upon full payment clearance, 100% intellectual property ownership and direct repository access of the bespoke codebase are officially transferred to the client. Pre-existing frameworks or open-source libraries are licensed under their respective authors.',
        contentBn: 'অন্যথা উল্লেখ না থাকলে, চূড়ান্ত বিল সম্পূর্ণ পরিশোধ না হওয়া পর্যন্ত সমস্ত সোর্স কোড, সফটওয়্যার ডিজাইন, ভেক্টর ইলাস্ট্রেশন, লেআউট, ডাটাবেস এবং ট্রেডমার্ক আমাদের বুদ্ধিবৃত্তিক সম্পদ হিসেবে থাকবে। পেমেন্ট সম্পূর্ণ পরিশোধের পর কাস্টম কোডবেসের ১০০% মালিকানা এবং সরাসরি রিপোজিটরি এক্সেস গ্রাহকের কাছে হস্তান্তর করা হবে। পূর্বে থেকে বিদ্যমান ফ্রেমওয়ার্ক বা ওপেন সোর্স লাইব্রেরিগুলো তাদের স্ব-স্ব লাইসেন্স অনুযায়ী পরিচালিত হবে।'
      },
      {
        id: 'sec-terms-liability',
        titleEn: 'Limitation of Liability',
        titleBn: 'দায়বদ্ধতার সীমাবদ্ধতা',
        contentEn: 'In no event will Next Solution or our directors, employees, or partners be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of our platforms or deliverables, even if we have been advised of the possibility of such damages.',
        contentBn: 'কোনো অবস্থাতেই নেক্সট সলিউশন বা আমাদের পরিচালক, কর্মচারী বা অংশীদাররা আপনার বা কোনো তৃতীয় পক্ষের কাছে কোনো প্রত্যক্ষ, পরোক্ষ, আনুষঙ্গিক, বিশেষ বা শাস্তিমূলক ক্ষতির জন্য দায়ী থাকবে না। এর মধ্যে আমাদের সাইট বা সেবা ব্যবহারের ফলে হারানো মুনাফা, হারানো রাজস্ব বা ডেটা হারানোর মতো ক্ষয়ক্ষতি অন্তর্ভুক্ত।'
      },
      {
        id: 'sec-terms-governing',
        titleEn: 'Governing Law & Dispute Resolution',
        titleBn: 'প্রযোজ্য আইন এবং বিরোধ নিষ্পত্তি',
        contentEn: 'These terms and conditions are governed by and construed in accordance with the laws of Bangladesh. Any dispute arising out of or in connection with these terms, including any question regarding their existence, validity, or termination, shall be referred to and finally resolved by arbitration in Dhaka, in accordance with the Arbitration Act of Bangladesh.',
        contentBn: 'এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত এবং ব্যাখ্যা করা হবে। চুক্তির অস্তিত্ব, বৈধতা বা সমাপ্তি সম্পর্কিত যেকোনো বিরোধ বাংলাদেশের সালিশি আইন অনুযায়ী ঢাকাতে সালিশের মাধ্যমে চূড়ান্তভাবে নিষ্পত্তি করা হবে।'
      }
    ]
  },
  {
    id: 'policy-cookie',
    type: 'cookie_policy',
    titleEn: 'Cookie Policy',
    titleBn: 'কুকি পলিসি',
    slug: 'cookie-policy',
    status: 'published',
    version: 'v1.1.0',
    effectiveDate: 'July 11, 2026',
    lastUpdated: '2026-07-11',
    seoTitle: 'Cookie Policy | Next Solution Digital Agency',
    seoDescription: 'Understand how Next Solution uses cookies, web beacons, and persistent tracking technologies to enhance user interfaces and analyze user pathways.',
    canonicalUrl: 'https://nextsolution.co/cookie-policy',
    ogTitle: 'Cookie Policy | Next Solution',
    ogDescription: 'Detailed explanation of cookie classifications, duration parameters, and granular browser management settings.',
    twitterCard: 'summary_large_image',
    schemaMarkup: '{"@context":"https://schema.org","@type":"WebPage","name":"Cookie Policy","description":"Cookie policy document for Next Solution Digital Agency"}',
    sections: [
      {
        id: 'sec-cookie-what',
        titleEn: 'What Are Cookies?',
        titleBn: 'কুকি কি?',
        contentEn: 'Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. We use cookies to enhance security, analyze user flows, preserve language locales, and customize display settings. Our cookies do not execute scripts or deliver malware.',
        contentBn: 'কুকি হলো ছোট টেক্সট ফাইল যা আপনার ডিভাইসে তথ্য সংরক্ষণের জন্য রাখা হয় এবং পরবর্তীতে সার্ভার দ্বারা পড়া যায়। আমরা নিরাপত্তা উন্নত করতে, ব্যবহারকারীর পথ বিশ্লেষণ করতে, ভাষা ধরে রাখতে এবং স্ক্রিন সেটিংস মনে রাখতে কুকি ব্যবহার করি। আমাদের কুকি কোনো স্ক্রিপ্ট চালায় না বা ক্ষতিকর সফটওয়্যার ছড়ায় না।'
      },
      {
        id: 'sec-cookie-types',
        titleEn: 'Types of Cookies We Use',
        titleBn: 'কুকির প্রকারভেদ',
        contentEn: 'We classify cookies into several functional categories:\n\n1. Essential: Strictly required for primary site operations and secure portal login.\n2. Analytics: Gather anonymous, aggregated site usage statistics to measure speeds and page hits.\n3. Functional: Retain customization rules like dark/light mode toggle or preferred translations.\n4. Marketing: Monitor navigation trails to present personalized solutions in our digital advertising.',
        contentBn: 'আমরা কুকিগুলোকে বেশ কয়েকটি কার্যকারী শ্রেণীতে ভাগ করি:\n\n১. আবশ্যক (Essential): সাইটের মৌলিক ক্রিয়াকলাপ এবং নিরাপদ পোর্টাল লগইনের জন্য কঠোরভাবে প্রয়োজন।\n২. অ্যানালিটিক্স (Analytics): গতি এবং পৃষ্ঠা পরিদর্শন পরিমাপের জন্য বেনামে ওয়েবসাইটের ব্যবহার সংক্রান্ত তথ্য সংগ্রহ করে।\n৩. ফাংশনাল (Functional): ডার্ক/লাইট মোড বা পছন্দের অনুবাদের মতো কাস্টমাইজেশন মনে রাখে।\n৪. মার্কেটিং (Marketing): আমাদের বিজ্ঞাপনে কাস্টমাইজড সমাধান দেখানোর জন্য সাইট পরিভ্রমণের তথ্য ট্র্যাক করে।'
      },
      {
        id: 'sec-cookie-managing',
        titleEn: 'Managing Cookie Preferences',
        titleBn: 'কুকি পছন্দ পরিচালনা',
        contentEn: 'When visiting our platform, you can customize your consents through our interactive Consent Banner or the Preferences Panel. Essential cookies cannot be disabled as the platform cannot function without them. Other categories can be enabled or disabled freely. Additionally, you can adjust your browser settings to reject or delete cookies entirely at any time.',
        contentBn: 'আমাদের প্ল্যাটফর্ম পরিদর্শনের সময় আপনি আমাদের ব্যানার বা কাস্টমাইজড প্যানেলের মাধ্যমে কুকির সম্মতি কাস্টমাইজ করতে পারেন। আবশ্যক কুকি বন্ধ করা যাবে না কারণ এগুলো ছাড়া সাইট অচল। অন্যান্য কুকিগুলো আপনি চাইলে সচল বা নিষ্ক্রিয় করতে পারেন। এছাড়া ব্রাউজার সেটিংস থেকেও কুকিগুলো মুছে ফেলা সম্ভব।'
      }
    ]
  }
];

export const initialLegalRevisions: LegalRevision[] = [
  {
    id: 'rev-priv-1',
    policyId: 'policy-privacy',
    version: 'v1.4.0',
    updatedAt: '2026-07-11T00:00:00.000Z',
    updatedBy: 'Sanjid Ahmed (Chief Legal Officer)',
    changeSummary: 'Updated data retention timelines and formalized CCPA guidelines for US-based enterprise clients.',
    sections: initialLegalPolicies[0].sections
  },
  {
    id: 'rev-terms-1',
    policyId: 'policy-terms',
    version: 'v2.1.0',
    updatedAt: '2026-07-11T00:00:00.000Z',
    updatedBy: 'Sanjid Ahmed (Chief Legal Officer)',
    changeSummary: 'Revised Intellectual Property transfer clauses to automate transfer upon 100% invoice settlement.',
    sections: initialLegalPolicies[1].sections
  },
  {
    id: 'rev-cookie-1',
    policyId: 'policy-cookie',
    version: 'v1.1.0',
    updatedAt: '2026-07-11T00:00:00.000Z',
    updatedBy: 'Sanjid Ahmed (Chief Legal Officer)',
    changeSummary: 'Integrated cookie categorization with local sandbox Cookie Preferences panel.',
    sections: initialLegalPolicies[2].sections
  }
];
