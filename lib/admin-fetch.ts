import {
  ContactMessage, Subscriber, BlogPost, Service, SiteSettings, PortfolioItem, FAQ, Testimonial,
  PricingPackage, PricingAddon, PricingComparison, PricingQuoteRequest, Currency, CurrencySettings,
  TestimonialCategory, TestimonialVideo, TestimonialStatistics, ClientLogo, SuccessStory, ReviewSettings,
  WhyChooseUsCard, WhyChooseUsStat, WhyChooseUsBadge, WhyChooseUsTech, WhyChooseUsCTA,
  ProcessStep, ProcessCTA, TechServiceCard, ClientMoment, Product, ProductImage,
  LegalPolicy, LegalRevision, CookieCategory, CookieSettings
} from "@/types";

const BASE = "/api/admin";

async function apiFetch<T = any>(
  entity: string,
  id?: string,
  options?: { method?: string; body?: any }
): Promise<T> {
  const url = id ? `${BASE}/${entity}/${id}` : `${BASE}/${entity}`;
  const res = await fetch(url, {
    method: options?.method || "GET",
    headers: options?.body ? { "Content-Type": "application/json" } : undefined,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || `API error ${res.status}`);
  return json.data !== undefined ? json.data : json;
}

export const adminDB = {
  async getAll<T>(entity: string): Promise<T[]> {
    return apiFetch<T[]>(entity);
  },

  async getById<T>(entity: string, id: string): Promise<T> {
    return apiFetch<T>(entity, id);
  },

  async save(entity: string, items: any | any[]): Promise<void> {
    await apiFetch(entity, undefined, { method: "POST", body: items });
  },

  async update(entity: string, id: string, data: any): Promise<void> {
    await apiFetch(entity, id, { method: "PUT", body: data });
  },

  async remove(entity: string, id: string): Promise<void> {
    await apiFetch(entity, id, { method: "DELETE" });
  },

  getAllServices: () => adminDB.getAll<Service>("services"),
  saveService: (item: Service) => adminDB.save("services", item),
  deleteService: (id: string) => adminDB.remove("services", id),

  getAllPortfolio: () => adminDB.getAll<PortfolioItem>("portfolio"),
  savePortfolio: (item: PortfolioItem) => adminDB.save("portfolio", item),
  deletePortfolio: (id: string) => adminDB.remove("portfolio", id),

  getAllBlogs: () => adminDB.getAll<BlogPost>("blogs"),
  saveBlog: (item: BlogPost) => adminDB.save("blogs", item),
  deleteBlog: (id: string) => adminDB.remove("blogs", id),

  getAllFAQs: () => adminDB.getAll<FAQ>("faqs"),
  saveFAQ: (item: FAQ) => adminDB.save("faqs", item),
  deleteFAQ: (id: string) => adminDB.remove("faqs", id),

  getAllTestimonials: () => adminDB.getAll<Testimonial>("testimonials"),
  saveTestimonial: (item: Testimonial) => adminDB.save("testimonials", item),
  deleteTestimonial: (id: string) => adminDB.remove("testimonials", id),

  getAllMessages: () => adminDB.getAll<ContactMessage>("messages"),
  updateMessage: (id: string, data: Partial<ContactMessage>) => adminDB.update("messages", id, data),
  deleteMessage: (id: string) => adminDB.remove("messages", id),

  getAllSubscribers: () => adminDB.getAll<Subscriber>("subscribers"),
  deleteSubscriber: (id: string) => adminDB.remove("subscribers", id),

  getSettings: () => adminDB.getAll<SiteSettings>("settings").then(d => d[0] || null),
  saveSettings: (item: SiteSettings) => adminDB.save("settings", item),

  getAllPricingPackages: () => adminDB.getAll<PricingPackage>("pricing-packages"),
  savePricingPackage: (item: PricingPackage) => adminDB.save("pricing-packages", item),
  deletePricingPackage: (id: string) => adminDB.remove("pricing-packages", id),

  getAllPricingAddons: () => adminDB.getAll<PricingAddon>("pricing-addons"),
  savePricingAddon: (item: PricingAddon) => adminDB.save("pricing-addons", item),
  deletePricingAddon: (id: string) => adminDB.remove("pricing-addons", id),

  getAllPricingComparisons: () => adminDB.getAll<PricingComparison>("pricing-comparisons"),
  savePricingComparison: (item: PricingComparison) => adminDB.save("pricing-comparisons", item),
  deletePricingComparison: (id: string) => adminDB.remove("pricing-comparisons", id),

  getAllPricingQuotes: () => adminDB.getAll<PricingQuoteRequest>("pricing-quotes"),
  updatePricingQuote: (id: string, data: Partial<PricingQuoteRequest>) => adminDB.update("pricing-quotes", id, data),
  deletePricingQuote: (id: string) => adminDB.remove("pricing-quotes", id),

  getAllCurrencies: () => adminDB.getAll<Currency>("currencies"),
  saveCurrency: (item: Currency) => adminDB.save("currencies", item),
  deleteCurrency: (id: string) => adminDB.remove("currencies", id),

  getCurrencySettings: () => adminDB.getAll<CurrencySettings>("currency-settings").then(d => d[0] || null),
  saveCurrencySettings: (item: CurrencySettings) => adminDB.save("currency-settings", item),

  getAllTestimonialCategories: () => adminDB.getAll<TestimonialCategory>("testimonial-categories"),
  saveTestimonialCategory: (item: TestimonialCategory) => adminDB.save("testimonial-categories", item),
  deleteTestimonialCategory: (id: string) => adminDB.remove("testimonial-categories", id),

  getAllTestimonialVideos: () => adminDB.getAll<TestimonialVideo>("testimonial-videos"),
  saveTestimonialVideo: (item: TestimonialVideo) => adminDB.save("testimonial-videos", item),
  deleteTestimonialVideo: (id: string) => adminDB.remove("testimonial-videos", id),

  getTestimonialStatistics: () => adminDB.getAll<TestimonialStatistics>("testimonial-statistics").then(d => d[0] || null),
  saveTestimonialStatistics: (item: TestimonialStatistics) => adminDB.save("testimonial-statistics", item),

  getAllClientLogos: () => adminDB.getAll<ClientLogo>("client-logos"),
  saveClientLogo: (item: ClientLogo) => adminDB.save("client-logos", item),
  deleteClientLogo: (id: string) => adminDB.remove("client-logos", id),

  getAllSuccessStories: () => adminDB.getAll<SuccessStory>("success-stories"),
  saveSuccessStory: (item: SuccessStory) => adminDB.save("success-stories", item),
  deleteSuccessStory: (id: string) => adminDB.remove("success-stories", id),

  getReviewSettings: () => adminDB.getAll<ReviewSettings>("review-settings").then(d => d[0] || null),
  saveReviewSettings: (item: ReviewSettings) => adminDB.save("review-settings", item),

  getAllWhyChooseUsCards: () => adminDB.getAll<WhyChooseUsCard>("why-choose-us-cards"),
  saveWhyChooseUsCard: (item: WhyChooseUsCard) => adminDB.save("why-choose-us-cards", item),
  deleteWhyChooseUsCard: (id: string) => adminDB.remove("why-choose-us-cards", id),

  getAllWhyChooseUsStats: () => adminDB.getAll<WhyChooseUsStat>("why-choose-us-stats"),
  saveWhyChooseUsStat: (item: WhyChooseUsStat) => adminDB.save("why-choose-us-stats", item),
  deleteWhyChooseUsStat: (id: string) => adminDB.remove("why-choose-us-stats", id),

  getAllWhyChooseUsBadges: () => adminDB.getAll<WhyChooseUsBadge>("why-choose-us-badges"),
  saveWhyChooseUsBadge: (item: WhyChooseUsBadge) => adminDB.save("why-choose-us-badges", item),
  deleteWhyChooseUsBadge: (id: string) => adminDB.remove("why-choose-us-badges", id),

  getAllWhyChooseUsTechs: () => adminDB.getAll<WhyChooseUsTech>("why-choose-us-techs"),
  saveWhyChooseUsTech: (item: WhyChooseUsTech) => adminDB.save("why-choose-us-techs", item),
  deleteWhyChooseUsTech: (id: string) => adminDB.remove("why-choose-us-techs", id),

  getWhyChooseUsCTA: () => adminDB.getAll<WhyChooseUsCTA>("why-choose-us-cta").then(d => d[0] || null),
  saveWhyChooseUsCTA: (item: WhyChooseUsCTA) => adminDB.save("why-choose-us-cta", item),

  getAllProcessSteps: () => adminDB.getAll<ProcessStep>("process-steps"),
  saveProcessStep: (item: ProcessStep) => adminDB.save("process-steps", item),
  deleteProcessStep: (id: string) => adminDB.remove("process-steps", id),

  getProcessCTA: () => adminDB.getAll<ProcessCTA>("process-cta").then(d => d[0] || null),
  saveProcessCTA: (item: ProcessCTA) => adminDB.save("process-cta", item),

  getAllTechServiceCards: () => adminDB.getAll<TechServiceCard>("tech-service-cards"),
  saveTechServiceCard: (item: TechServiceCard) => adminDB.save("tech-service-cards", item),
  deleteTechServiceCard: (id: string) => adminDB.remove("tech-service-cards", id),

  getAllClientMoments: () => adminDB.getAll<ClientMoment>("client-moments"),
  saveClientMoment: (item: ClientMoment) => adminDB.save("client-moments", item),
  deleteClientMoment: (id: string) => adminDB.remove("client-moments", id),

  getAllProducts: () => adminDB.getAll<Product>("products"),
  saveProduct: (item: Product) => adminDB.save("products", item),
  deleteProduct: (id: string) => adminDB.remove("products", id),

  getAllLegalPolicies: () => adminDB.getAll<LegalPolicy>("legal-policies"),
  saveLegalPolicy: (item: LegalPolicy) => adminDB.save("legal-policies", item),
  deleteLegalPolicy: (id: string) => adminDB.remove("legal-policies", id),

  getAllLegalRevisions: () => adminDB.getAll<LegalRevision>("legal-revisions"),
  saveLegalRevision: (item: LegalRevision) => adminDB.save("legal-revisions", item),
  deleteLegalRevision: (id: string) => adminDB.remove("legal-revisions", id),

  getAllCookieCategories: () => adminDB.getAll<CookieCategory>("cookie-categories"),
  saveCookieCategory: (item: CookieCategory) => adminDB.save("cookie-categories", item),
  deleteCookieCategory: (id: string) => adminDB.remove("cookie-categories", id),

  getCookieSettings: () => adminDB.getAll<CookieSettings>("cookie-settings").then(d => d[0] || null),
  saveCookieSettings: (item: CookieSettings) => adminDB.save("cookie-settings", item),
};
