/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  category: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  featuresEn: string[];
  featuresBn: string[];
  benefitsEn: string[];
  benefitsBn: string[];
  price: string;
  icon: string;
  slug: string;
  processEn: string[];
  processBn: string[];
  techUsed: string[];
  subtitleEn?: string;
  subtitleBn?: string;
  whyNeedEn?: string;
  whyNeedBn?: string;
  whoForEn?: string;
  whoForBn?: string;
  businessImpactEn?: string;
  businessImpactBn?: string;
  subServicesJson?: string;
  faqsJson?: string;
  pricingJson?: string;
}

export interface PortfolioItem {
  id: string;
  category: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  client: string;
  duration: string;
  budget: string;
  challengeEn: string;
  challengeBn: string;
  solutionEn: string;
  solutionBn: string;
  resultEn: string;
  resultBn: string;
  technologies: string[];
  image: string;
  featured: boolean;
  rating?: number;
  reviewEn?: string;
  reviewBn?: string;
  
  // Extended Fields for High-Fidelity Case Studies
  slug?: string;
  status?: 'draft' | 'published';
  sortOrder?: number;
  industryEn?: string;
  industryBn?: string;
  completionYear?: string;
  galleryJson?: string; // JSON Array of URLs
  featuresEn?: string[]; // Deliverables
  featuresBn?: string[];
  beforeImage?: string;
  afterImage?: string;
  clientPhoto?: string;
  clientRoleEn?: string;
  clientRoleBn?: string;
  seoTitleEn?: string;
  seoTitleBn?: string;
  seoDescEn?: string;
  seoDescBn?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface BlogPost {
  id: string;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  contentEn: string;
  contentBn: string;
  categoryEn: string;
  categoryBn: string;
  tags: string[];
  image: string;
  author: string;
  readTime: string;
  publishedAt: string;
  status: 'draft' | 'published';
  
  // Advanced fields for World-Class Blog & Knowledge Center
  views?: number;
  engagement?: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  isLearningGuide?: boolean;
  isLatestNews?: boolean;
  scheduledAt?: string;
  
  // SEO Meta and Schema fields
  slug?: string;
  seoTitleEn?: string;
  seoTitleBn?: string;
  seoDescEn?: string;
  seoDescBn?: string;
  canonicalUrl?: string;
  ogImage?: string;
  
  // Advanced Author fields
  authorRoleEn?: string;
  authorRoleBn?: string;
  authorBioEn?: string;
  authorBioBn?: string;
  authorPhoto?: string;
  authorTwitter?: string;
  authorLinkedin?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  roleEn: string;
  roleBn: string;
  company: string;
  feedbackEn: string;
  feedbackBn: string;
  rating: number;
  avatar: string;
  country?: string;
  countryFlag?: string;
  industry?: string;
  industryEn?: string;
  industryBn?: string;
  category?: string;
  service?: string;
  reviewDate?: string;
  reviewTitleEn?: string;
  reviewTitleBn?: string;
  companyLogo?: string;
  projectLink?: string;
  videoUrl?: string;
  isVerified?: boolean;
  featured?: boolean;
  sortOrder?: number;
  status?: 'pending' | 'approved' | 'rejected' | 'archived' | 'featured';
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
  budget: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface FAQ {
  id: string;
  categoryEn: string;
  categoryBn: string;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
  helpfulCount: number;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface SiteSettings {
  id: string;
  agencyName: string;
  taglineEn: string;
  taglineBn: string;
  addressEn: string;
  addressBn: string;
  phone: string;
  email: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  workingHoursEn: string;
  workingHoursBn: string;
  
  // Custom About Page fields for complete CMS editability
  aboutMissionEn?: string;
  aboutMissionBn?: string;
  aboutVisionEn?: string;
  aboutVisionBn?: string;
  
  statsProjects?: number;
  statsClients?: number;
  statsTeam?: number;
  statsExperience?: number;
  statsCountries?: number;
  statsSatisfaction?: number;
  statsIndustries?: number;
  statsTechs?: number;
  
  aboutTeamJson?: string;
  aboutTimelineJson?: string;
  aboutTechsJson?: string;
  aboutValuesJson?: string;
}

export interface PricingPackage {
  id: string;
  category: string; // 'Agency Packages', 'Web Development', 'Web App', 'UI/UX Design', etc.
  nameEn: string;
  nameBn: string;
  priceMonthly: number;
  priceYearly: number;
  descriptionEn: string;
  descriptionBn: string;
  featuresEn: string[];
  featuresBn: string[];
  notIncludedEn?: string[];
  notIncludedBn?: string[];
  ctaEn: string;
  ctaBn: string;
  popular?: boolean;
  enabled?: boolean;
  sortOrder?: number;
  badgeEn?: string;
  badgeBn?: string;
  techEn?: string; // Optional techs comma separated
}

export interface PricingAddon {
  id: string;
  nameEn: string;
  nameBn: string;
  price: string;
  descriptionEn: string;
  descriptionBn: string;
  category?: string;
  enabled?: boolean;
}

export interface PricingComparison {
  id: string;
  featureEn: string;
  featureBn: string;
  starterEn: string;
  starterBn: string;
  businessEn: string;
  businessBn: string;
  enterpriseEn: string;
  enterpriseBn: string;
  categoryEn: string;
  categoryBn: string;
  sortOrder?: number;
}

export interface PricingQuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  attachmentName?: string;
  attachmentData?: string;
  status: 'pending' | 'reviewed' | 'contacted';
  createdAt: string;
}

export interface Currency {
  id: string;
  name: string;
  code: string; // USD, EUR, GBP, BDT
  symbol: string; // $, €, £, ৳
  flag: string; // 🇺🇸, 🇪🇺, 🇬🇧, 🇧🇩
  exchangeRate: number; // rate from USD base (e.g., USD = 1.0, EUR = 0.92, GBP = 0.78, BDT = 117.5)
  enabled: boolean;
  isDefault: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CurrencySettings {
  enableLiveRates: boolean;
  decimalPrecision: number; // e.g. 0, 1, 2
  defaultCurrencyCode: string; // USD
  lastUpdatedLiveRates?: string;
}

export interface TestimonialCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  slug: string;
}

export interface TestimonialVideo {
  id: string;
  titleEn: string;
  titleBn: string;
  clientName: string;
  company: string;
  avatar?: string;
  rating: number;
  videoUrl: string; // YouTube/Vimeo embedded iframe URL or embed code
  thumbnailUrl: string;
  shortDescriptionEn: string;
  shortDescriptionBn: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface ClientMoment {
  id: string;
  titleEn: string;
  titleBn: string;
  clientName: string;
  company?: string;
  imageUrl: string;
  descriptionEn?: string;
  descriptionBn?: string;
  displayOrder?: number;
  visible?: boolean;
}

export interface TestimonialStatistics {
  id?: string;
  projectsCompleted?: number;
  happyClients?: number;
  clientSatisfaction?: number;
  averageRating: number;
  industriesServed?: number;
  fiveStarReviews?: number;
  totalReviews?: number;
  satisfactionRate?: number;
  videoReviewsCount?: number;
  featuredStoriesCount?: number;
  clientRetentionRate?: number;
  totalClients?: number;
  successStoryCount?: number;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface SuccessStory {
  id: string;
  clientName: string;
  companyName: string;
  industryEn: string;
  industryBn: string;
  serviceEn: string;
  serviceBn: string;
  backgroundEn: string;
  backgroundBn: string;
  challengeEn: string;
  challengeBn: string;
  solutionEn: string;
  solutionBn: string;
  technologies: string[];
  timelineEn: string;
  timelineBn: string;
  resultsEn: string;
  resultsBn: string;
  beforeImage?: string;
  afterImage?: string;
  clientQuoteEn: string;
  clientQuoteBn: string;
  clientRoleEn: string;
  clientRoleBn: string;
  clientPhoto?: string;
  caseStudyId?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface ReviewSettings {
  enablePublicSubmissions?: boolean;
  requireApprovalBeforePublishing?: boolean;
  defaultVerificationStatus?: boolean;
  notifyOnNewReview?: boolean;
  moderationEnabled?: boolean;
  allowAnonymous?: boolean;
  minRatingForAutoPublish?: number;
  enableVideoReviews?: boolean;
  requireApproval?: boolean;
  enableRatings?: boolean;
  allowVideoUploads?: boolean;
  notificationEmail?: string;
  reviewsPerPage?: number;
}

export type LegalPolicyType = 'privacy_policy' | 'terms_conditions' | 'cookie_policy';

export interface LegalSection {
  id: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
}

export interface LegalPolicy {
  id: string;
  type: LegalPolicyType;
  titleEn: string;
  titleBn: string;
  slug: string;
  status: 'draft' | 'published';
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: LegalSection[];
  seoTitle: string;
  seoDescription: string;
  metaTitleEn?: string;
  metaTitleBn?: string;
  metaDescriptionEn?: string;
  metaDescriptionBn?: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
  schemaMarkup: string;
}

export interface LegalRevision {
  id: string;
  policyId: string;
  version: string;
  updatedAt: string;
  updatedBy: string;
  changeSummary: string;
  sections: LegalSection[];
}

export interface CookieCategory {
  id: string;
  name: string;
  descriptionEn: string;
  descriptionBn: string;
  enabledByDefault: boolean;
  isEssential: boolean;
  sortOrder?: number;
}

export interface CookieSettings {
  id?: string;
  bannerTitleEn: string;
  bannerTitleBn: string;
  bannerTextEn: string;
  bannerTextBn: string;
  enableCustomize: boolean;
  lastUpdated: string;
}

export interface WhyChooseUsCard {
  id: string;
  icon: string;
  titleEn: string;
  titleBn: string;
  descEn?: string;
  descBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  categoryEn?: string;
  categoryBn?: string;
  badgeTextEn?: string;
  badgeTextBn?: string;
  stat?: string;
  displayOrder: number;
  visible: boolean;
}

export interface WhyChooseUsStat {
  id: string;
  value: string;
  labelEn: string;
  labelBn: string;
  displayOrder: number;
  visible: boolean;
}

export interface WhyChooseUsBadge {
  id: string;
  textEn?: string;
  textBn?: string;
  labelEn?: string;
  labelBn?: string;
  displayOrder: number;
  visible: boolean;
}

export interface WhyChooseUsTech {
  id: string;
  name: string;
  icon?: string;
  logoUrl?: string;
  displayOrder: number;
  visible: boolean;
}

export interface WhyChooseUsCTA {
  id?: string;
  headlineEn: string;
  headlineBn: string;
  subEn?: string;
  subBn?: string;
  btn1TextEn?: string;
  btn1TextBn?: string;
  btn2TextEn?: string;
  btn2TextBn?: string;
  noteEn?: string;
  noteBn?: string;
  taglineEn?: string;
  taglineBn?: string;
  descriptionEn?: string;
  descriptionBn?: string;
  primaryButtonTextEn?: string;
  primaryButtonTextBn?: string;
  secondaryButtonTextEn?: string;
  secondaryButtonTextBn?: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string; // e.g. "01"
  icon: string; // 🔍, 📋, etc.
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  deliverablesEn: string[];
  deliverablesBn: string[];
  estimatedDurationEn: string;
  estimatedDurationBn: string;
  toolsUsed: string[];
  servicesIncludedEn: string[];
  servicesIncludedBn: string[];
  animationType: string; // e.g. "fade", "slide-left", "slide-right"
  displayOrder: number;
  visible: boolean;
}

export interface ProcessCTA {
  id: string;
  titleEn: string;
  titleBn: string;
  highlightEn: string;
  highlightBn: string;
  subtitleEn: string;
  subtitleBn: string;
  ctaHeadlineEn: string;
  ctaHeadlineBn: string;
  ctaSubtitleEn: string;
  ctaSubtitleBn: string;
  ctaPrimaryTextEn: string;
  ctaPrimaryTextBn: string;
  ctaSecondaryTextEn: string;
  ctaSecondaryTextBn: string;
}

export interface TechServiceCard {
  id: string;
  icon: string; // e.g. "Globe", "Cpu"
  categoryEn: string; // e.g. "Web Development"
  categoryBn: string; // e.g. "ওয়েব ডেভেলপমেন্ট"
  descriptionEn: string;
  descriptionBn: string;
  technologies: string[]; // list of technology names
  projectCount: string; // e.g. "120+ Projects"
  popularProjectsEn: string[];
  popularProjectsBn: string[];
  benefitsEn: string[];
  benefitsBn: string[];
  experienceLevelEn: string; // e.g. "Senior-Led Core Tech"
  experienceLevelBn: string; // e.g. "সিনিয়র-লেড কোর টেক"
  featuredBadgeEn: string; // e.g. "High Performance"
  featuredBadgeBn: string;
  displayOrder: number;
  visible: boolean;
  animationType: string; // e.g. "fade", "slide-up"
}





