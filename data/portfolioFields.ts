import { PortfolioServiceConfig } from "@/types";

/**
 * Service-specific portfolio field configuration.
 * Maps each service to the exact set of fields shown in the admin form and
 * rendered on the public details page. Add a new service here and its fields
 * appear automatically — no rewiring of the portfolio system required.
 */
export const PORTFOLIO_SERVICE_FIELDS: PortfolioServiceConfig[] = [
  {
    service: "Web Development",
    fields: [
      { key: "websiteName", labelEn: "Website / Project Name", labelBn: "ওয়েবসাইট / প্রকল্পের নাম", type: "text", required: true },
      { key: "websiteDescription", labelEn: "Website Description", labelBn: "ওয়েবসাইট বিবরণ", type: "textarea" },
      { key: "builtWith", labelEn: "Technologies / Built With", labelBn: "প্রযুক্তি / যা দিয়ে বানানো হয়েছে", type: "list" },
      { key: "websiteUrl", labelEn: "Website URL (Live Link)", labelBn: "ওয়েবসাইট URL", type: "url", required: true },
    ],
  },
  {
    service: "UI/UX Design",
    fields: [
      { key: "productType", labelEn: "Product Type", labelBn: "প্রোডাক্টের ধরন", type: "text" },
      { key: "designChallenge", labelEn: "Design Challenge", labelBn: "ডিজাইন চ্যালেঞ্জ", type: "textarea" },
      { key: "designProcess", labelEn: "Design Process", labelBn: "ডিজাইন প্রক্রিয়া", type: "textarea" },
      { key: "deliverables", labelEn: "Deliverables", labelBn: "ডেলিভারেবল", type: "list" },
      { key: "toolsUsed", labelEn: "Tools Used", labelBn: "ব্যবহৃত টুলস", type: "list" },
      { key: "prototypeUrl", labelEn: "Prototype / Figma URL", labelBn: "প্রোটোটাইপ / ফিগমা URL", type: "url" },
    ],
  },
  {
    service: "Graphic Design",
    fields: [
      { key: "designCategory", labelEn: "Design Category", labelBn: "ডিজাইন ক্যাটাগরি", type: "text" },
      { key: "designDescription", labelEn: "Design Description", labelBn: "ডিজাইন বিবরণ", type: "textarea" },
      { key: "designDeliverables", labelEn: "Design Deliverables", labelBn: "ডিজাইন ডেলিভারেবল", type: "list" },
      { key: "toolsUsed", labelEn: "Tools Used", labelBn: "ব্যবহৃত টুলস", type: "list" },
      { key: "projectUrl", labelEn: "Project URL (Behance / Dribbble / Live)", labelBn: "প্রজেক্ট URL", type: "url" },
    ],
  },
  {
    service: "Video Editing",
    fields: [
      { key: "videoCategory", labelEn: "Video Category", labelBn: "ভিডিও ক্যাটাগরি", type: "text" },
      { key: "videoDescription", labelEn: "Video Description", labelBn: "ভিডিও বিবরণ", type: "textarea" },
      { key: "editingDeliverables", labelEn: "Editing Work / Deliverables", labelBn: "এডিটিং কাজ / ডেলিভারেবল", type: "list" },
      { key: "toolsUsed", labelEn: "Tools Used", labelBn: "ব্যবহৃত টুলস", type: "list" },
      { key: "videoUrl", labelEn: "Video URL (YouTube / Vimeo / Drive)", labelBn: "ভিডিও URL", type: "url" },
    ],
  },
  {
    service: "Digital Marketing",
    fields: [
      { key: "servicesProvided", labelEn: "Services Provided", labelBn: "প্রদত্ত সেবাসমূহ", type: "list" },
      { key: "marketingStrategy", labelEn: "Marketing Strategy", labelBn: "মার্কেটিং কৌশল", type: "textarea" },
      { key: "targetAudience", labelEn: "Target Audience", labelBn: "টার্গেট অডিয়েন্স", type: "textarea" },
      { key: "platformsUsed", labelEn: "Platforms Used", labelBn: "ব্যবহৃত প্ল্যাটফর্ম", type: "list" },
      { key: "projectUrl", labelEn: "Project / Live Link", labelBn: "প্রজেক্ট / লাইভ লিংক", type: "url" },
    ],
  },
  {
    service: "SEO",
    fields: [
      { key: "seoServices", labelEn: "SEO Services", labelBn: "SEO সেবাসমূহ", type: "list" },
      { key: "seoStrategy", labelEn: "SEO Strategy", labelBn: "SEO কৌশল", type: "textarea" },
      { key: "targetKeywords", labelEn: "Target Keywords", labelBn: "টার্গেট কীওয়ার্ড", type: "list" },
      { key: "workPerformed", labelEn: "Work Performed", labelBn: "কৃত কাজ", type: "textarea" },
      { key: "results", labelEn: "Results / Improvements", labelBn: "ফলাফল / উন্নতি", type: "textarea" },
      { key: "toolsUsed", labelEn: "Tools Used", labelBn: "ব্যবহৃত টুলস", type: "list" },
      { key: "websiteUrl", labelEn: "Website URL", labelBn: "ওয়েবসাইট URL", type: "url" },
    ],
  },
  {
    service: "AI Services",
    fields: [
      { key: "aiSolutionType", labelEn: "AI Solution Type", labelBn: "AI সমাধানের ধরন", type: "text" },
      { key: "problem", labelEn: "Problem / Business Challenge", labelBn: "সমস্যা / ব্যবসায়িক চ্যালেঞ্জ", type: "textarea" },
      { key: "aiSolution", labelEn: "AI Solution Implemented", labelBn: "বাস্তবায়িত AI সমাধান", type: "textarea" },
      { key: "keyFeatures", labelEn: "Key Features", labelBn: "মূল ফিচারসমূহ", type: "list" },
      { key: "techTools", labelEn: "Technologies / Tools Used", labelBn: "প্রযুক্তি / টুলস", type: "list" },
      { key: "results", labelEn: "Results / Impact", labelBn: "ফলাফল / প্রভাব", type: "textarea" },
      { key: "demoUrl", labelEn: "Project / Demo Link", labelBn: "প্রজেক্ট / ডেমো লিংক", type: "url" },
    ],
  },
  {
    service: "Mobile App",
    fields: [
      { key: "appType", labelEn: "App Type", labelBn: "অ্যাপের ধরন", type: "text" },
      { key: "keyFeatures", labelEn: "Key Features", labelBn: "মূল ফিচারসমূহ", type: "list" },
      { key: "techUsed", labelEn: "Technologies Used", labelBn: "ব্যবহৃত প্রযুক্তি", type: "list" },
      { key: "platform", labelEn: "Platform", labelBn: "প্ল্যাটফর্ম", type: "text" },
      { key: "appStoreUrl", labelEn: "App Store URL", labelBn: "অ্যাপ স্টোর URL", type: "url" },
      { key: "playStoreUrl", labelEn: "Play Store URL", labelBn: "প্লে স্টোর URL", type: "url" },
    ],
  },
];

export function getPortfolioFields(service: string): PortfolioServiceConfig | undefined {
  return PORTFOLIO_SERVICE_FIELDS.find(
    (c) => c.service.toLowerCase() === String(service || "").toLowerCase(),
  ) || PORTFOLIO_SERVICE_FIELDS.find((c) => c.service === "Web Development");
}
