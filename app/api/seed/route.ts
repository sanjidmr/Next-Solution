import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  initialServices, initialPortfolio, initialBlogs, initialFAQs, initialTestimonials,
  defaultSiteSettings, initialPricingPackages, initialPricingAddons, initialPricingComparisons,
  initialTechServiceCards
} from "@/data/initialData";
import {
  initialCookieCategories, defaultCookieSettings, initialLegalPolicies, initialLegalRevisions
} from "@/data/legalInitialData";
import {
  initialWhyChooseUsCards, initialWhyChooseUsStats, initialWhyChooseUsBadges,
  initialWhyChooseUsTechs, initialWhyChooseUsCTA, initialProcessSteps,
  initialProcessCTA
} from "@/lib/db";
import {
  mapService, mapPortfolioItem, mapBlogPost, mapTestimonial, mapFAQ, mapSiteSettings,
  mapPricingPackage, mapPricingAddon, mapPricingComparison, mapCurrency, mapCurrencySettings,
  mapTestimonialVideo, mapClientMoment, mapTestimonialStatistics, mapClientLogo, mapSuccessStory,
  mapReviewSettings, mapLegalPolicy, mapLegalRevision, mapCookieCategory, mapCookieSettings,
  mapWhyChooseUsCard, mapWhyChooseUsStat, mapWhyChooseUsBadge, mapWhyChooseUsTech, mapWhyChooseUsCTA,
  mapProcessStep, mapProcessCTA, mapTechServiceCard, mapContactMessage, mapSubscriber, mapPricingQuoteRequest
} from "@/lib/mappers";

// Additional mock data arrays referenced in initDB()
const seedMessages = [
  {
    id: "msg-1",
    name: "Rahim Uddin",
    email: "rahim@retailcorp.bd",
    phone: "+880 1812 345678",
    subject: "Inquiry about Ecommerce Web Portal development",
    message: "Hello, we are looking to migrate our brick and mortar retail fashion shop to a premium React-based online ecommerce site. We would like to learn more about your milestone payments and visual design system.",
    service: "Enterprise Web Development",
    budget: "$10,000 - $25,000",
    status: "unread",
    createdAt: "2026-07-08T10:15:30.000Z"
  },
  {
    id: "msg-2",
    name: "Emily Watson",
    email: "emily@horizonhealth.us",
    phone: "+1 555 019 2834",
    subject: "Healthcare SaaS UI/UX Design System",
    message: "Our product team needs a comprehensive Figma layout audit and high-fidelity prototype redesign for our telehealth SaaS portal. The system must meet HIPAA security compliance and feel exceptionally clean.",
    service: "UI/UX & Product Design",
    budget: "$5,000 - $10,000",
    status: "read",
    createdAt: "2026-07-07T14:30:00.000Z"
  }
];

const seedSubscribers = [
  { id: "sub-1", email: "investor@siliconbay.com", createdAt: "2026-07-01T08:00:00.000Z" },
  { id: "sub-2", email: "tech_crunch_editor@republic.co", createdAt: "2026-07-03T11:45:00.000Z" }
];

const seedQuotes = [
  {
    id: "quote-1",
    name: "Asif Rahman",
    email: "asif@nextech.io",
    phone: "+880 1711 223344",
    company: "NexTech Solutions",
    service: "Web App",
    budget: "$10,000 - $25,000",
    timeline: "2-3 months",
    projectDesc: "Need a premium billing and invoicing SaaS application integrated with local payment gateways (bKash, Nagad) and Stripe for international users. The UI/UX should feel premium and fluid.",
    status: "pending",
    createdAt: "2026-07-09T09:30:00.000Z"
  }
];

const defaultCurrencies = [
  {
    id: "curr-usd",
    name: "US Dollar",
    code: "USD",
    symbol: "$",
    flag: "🇺🇸",
    exchangeRate: 1.0,
    enabled: true,
    isDefault: true
  },
  {
    id: "curr-eur",
    name: "Euro",
    code: "EUR",
    symbol: "€",
    flag: "🇪🇺",
    exchangeRate: 0.92,
    enabled: true,
    isDefault: false
  },
  {
    id: "curr-gbp",
    name: "British Pound",
    code: "GBP",
    symbol: "£",
    flag: "🇬🇧",
    exchangeRate: 0.78,
    enabled: true,
    isDefault: false
  },
  {
    id: "curr-bdt",
    name: "Bangladeshi Taka",
    code: "BDT",
    symbol: "৳",
    flag: "🇧🇩",
    exchangeRate: 117.5,
    enabled: true,
    isDefault: false
  }
];

const defaultCurrencySettings = {
  enableLiveRates: true,
  decimalPrecision: 0,
  defaultCurrencyCode: "USD"
};

// Testimonial videos and stats which are in data/initialData.ts or local initDB
// Let's import or extract if needed. Wait, in initialData.ts:
// Let's check what testimonial sub-arrays are available. We'll extract them.
import {
  initialTestimonialCategories, initialTestimonialVideos, initialClientMoments,
  initialTestimonialStatistics, initialClientLogos, initialSuccessStories,
  defaultReviewSettings
} from "@/lib/db";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // 1. Seed Site Settings (one record)
    await supabase.from("site_settings").upsert(mapSiteSettings.toDb(defaultSiteSettings));

    // 2. Seed Services
    if (initialServices && initialServices.length > 0) {
      const servicesToInsert = initialServices.map(item => mapService.toDb(item));
      await supabase.from("services").upsert(servicesToInsert);
    }

    // 3. Seed Portfolio Items
    if (initialPortfolio && initialPortfolio.length > 0) {
      const itemsToInsert = initialPortfolio.map(item => mapPortfolioItem.toDb(item));
      await supabase.from("portfolio_items").upsert(itemsToInsert);
    }

    // 4. Seed Blog Posts
    if (initialBlogs && initialBlogs.length > 0) {
      const itemsToInsert = initialBlogs.map(item => mapBlogPost.toDb(item));
      await supabase.from("blog_posts").upsert(itemsToInsert);
    }

    // 5. Seed FAQs
    if (initialFAQs && initialFAQs.length > 0) {
      const itemsToInsert = initialFAQs.map(item => mapFAQ.toDb(item));
      await supabase.from("faqs").upsert(itemsToInsert);
    }

    // 6. Seed Testimonials
    if (initialTestimonials && initialTestimonials.length > 0) {
      const itemsToInsert = initialTestimonials.map(item => mapTestimonial.toDb(item));
      await supabase.from("testimonials").upsert(itemsToInsert);
    }

    // 7. Seed Pricing Packages
    if (initialPricingPackages && initialPricingPackages.length > 0) {
      const itemsToInsert = initialPricingPackages.map(item => mapPricingPackage.toDb(item));
      await supabase.from("pricing_packages").upsert(itemsToInsert);
    }

    // 8. Seed Pricing Addons
    if (initialPricingAddons && initialPricingAddons.length > 0) {
      const itemsToInsert = initialPricingAddons.map(item => mapPricingAddon.toDb(item));
      await supabase.from("pricing_addons").upsert(itemsToInsert);
    }

    // 9. Seed Pricing Comparisons
    if (initialPricingComparisons && initialPricingComparisons.length > 0) {
      const itemsToInsert = initialPricingComparisons.map(item => mapPricingComparison.toDb(item));
      await supabase.from("pricing_comparisons").upsert(itemsToInsert);
    }

    // 10. Seed Currencies & Settings
    if (defaultCurrencies && defaultCurrencies.length > 0) {
      const itemsToInsert = defaultCurrencies.map((item: any) => mapCurrency.toDb(item));
      await supabase.from("currencies").upsert(itemsToInsert);
    }
    await supabase.from("currency_settings").upsert(mapCurrencySettings.toDb(defaultCurrencySettings));

    // 11. Seed Testimonial Videos
    if (initialTestimonialVideos && initialTestimonialVideos.length > 0) {
      const itemsToInsert = initialTestimonialVideos.map(item => mapTestimonialVideo.toDb(item));
      await supabase.from("testimonial_videos").upsert(itemsToInsert);
    }

    // 12. Seed Client Moments
    if (initialClientMoments && initialClientMoments.length > 0) {
      const itemsToInsert = initialClientMoments.map(item => mapClientMoment.toDb(item));
      await supabase.from("client_moments").upsert(itemsToInsert);
    }

    // 13. Seed Testimonial Statistics & Review Settings
    if (initialTestimonialStatistics) {
      await supabase.from("testimonial_statistics").upsert(mapTestimonialStatistics.toDb(initialTestimonialStatistics));
    }
    if (defaultReviewSettings) {
      await supabase.from("review_settings").upsert(mapReviewSettings.toDb(defaultReviewSettings));
    }

    // 14. Seed Client Logos
    if (initialClientLogos && initialClientLogos.length > 0) {
      const itemsToInsert = initialClientLogos.map(item => mapClientLogo.toDb(item));
      await supabase.from("client_logos").upsert(itemsToInsert);
    }

    // 15. Seed Success Stories
    if (initialSuccessStories && initialSuccessStories.length > 0) {
      const itemsToInsert = initialSuccessStories.map(item => mapSuccessStory.toDb(item));
      await supabase.from("success_stories").upsert(itemsToInsert);
    }

    // 16. Seed Legal Policies & Revisions
    if (initialLegalPolicies && initialLegalPolicies.length > 0) {
      const itemsToInsert = initialLegalPolicies.map(item => mapLegalPolicy.toDb(item));
      await supabase.from("legal_policies").upsert(itemsToInsert);
    }
    if (initialLegalRevisions && initialLegalRevisions.length > 0) {
      const itemsToInsert = initialLegalRevisions.map(item => mapLegalRevision.toDb(item));
      await supabase.from("legal_revisions").upsert(itemsToInsert);
    }

    // 17. Seed Cookie Categories & Settings
    if (initialCookieCategories && initialCookieCategories.length > 0) {
      const itemsToInsert = initialCookieCategories.map(item => mapCookieCategory.toDb(item));
      await supabase.from("cookie_categories").upsert(itemsToInsert);
    }
    if (defaultCookieSettings) {
      await supabase.from("cookie_settings").upsert(mapCookieSettings.toDb(defaultCookieSettings));
    }

    // 18. Seed Why Choose Us Components
    if (initialWhyChooseUsCards && initialWhyChooseUsCards.length > 0) {
      const itemsToInsert = initialWhyChooseUsCards.map(item => mapWhyChooseUsCard.toDb(item));
      await supabase.from("why_choose_us_cards").upsert(itemsToInsert);
    }
    if (initialWhyChooseUsStats && initialWhyChooseUsStats.length > 0) {
      const itemsToInsert = initialWhyChooseUsStats.map(item => mapWhyChooseUsStat.toDb(item));
      await supabase.from("why_choose_us_stats").upsert(itemsToInsert);
    }
    if (initialWhyChooseUsBadges && initialWhyChooseUsBadges.length > 0) {
      const itemsToInsert = initialWhyChooseUsBadges.map(item => mapWhyChooseUsBadge.toDb(item));
      await supabase.from("why_choose_us_badges").upsert(itemsToInsert);
    }
    if (initialWhyChooseUsTechs && initialWhyChooseUsTechs.length > 0) {
      const itemsToInsert = initialWhyChooseUsTechs.map(item => mapWhyChooseUsTech.toDb(item));
      await supabase.from("why_choose_us_techs").upsert(itemsToInsert);
    }
    if (initialWhyChooseUsCTA) {
      await supabase.from("why_choose_us_cta").upsert(mapWhyChooseUsCTA.toDb(initialWhyChooseUsCTA));
    }

    // 19. Seed Process Steps & CTA
    if (initialProcessSteps && initialProcessSteps.length > 0) {
      const itemsToInsert = initialProcessSteps.map(item => mapProcessStep.toDb(item));
      await supabase.from("process_steps").upsert(itemsToInsert);
    }
    if (initialProcessCTA) {
      await supabase.from("process_cta").upsert(mapProcessCTA.toDb(initialProcessCTA));
    }

    // 20. Seed Tech Service Cards
    if (initialTechServiceCards && initialTechServiceCards.length > 0) {
      const itemsToInsert = initialTechServiceCards.map(item => mapTechServiceCard.toDb(item));
      await supabase.from("tech_service_cards").upsert(itemsToInsert);
    }

    // 21. Seed Contact Messages, Subscribers & Quotes
    if (seedMessages && seedMessages.length > 0) {
      const itemsToInsert = seedMessages.map(item => mapContactMessage.toDb(item as any));
      await supabase.from("contact_messages").upsert(itemsToInsert);
    }
    if (seedSubscribers && seedSubscribers.length > 0) {
      const itemsToInsert = seedSubscribers.map(item => mapSubscriber.toDb(item));
      await supabase.from("newsletter_subscribers").upsert(itemsToInsert);
    }
    if (seedQuotes && seedQuotes.length > 0) {
      const itemsToInsert = seedQuotes.map((item: any) => mapPricingQuoteRequest.toDb(item));
      await supabase.from("pricing_quote_requests").upsert(itemsToInsert);
    }

    return NextResponse.json(
      { message: "Database tables seeded successfully." },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during database seeding." },
      { status: 500 }
    );
  }
}
