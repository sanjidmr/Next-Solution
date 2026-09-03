/**
 * Mappers to map between frontend TypeScript types (camelCase)
 * and Supabase Database rows (snake_case).
 */

import {
  Service, PortfolioItem, BlogPost, Testimonial, FAQ, ContactMessage, Subscriber,
  SiteSettings, PricingPackage, PricingAddon, PricingComparison, PricingQuoteRequest, Currency, CurrencySettings,
  TestimonialCategory, TestimonialVideo, TestimonialStatistics, ClientLogo, SuccessStory, ReviewSettings,
  LegalPolicy, LegalRevision, CookieCategory, CookieSettings, WhyChooseUsCard, WhyChooseUsStat,
  WhyChooseUsBadge, WhyChooseUsTech, WhyChooseUsCTA, ProcessStep, ProcessCTA, TechServiceCard, ClientMoment,
  Product, ProductImage,
  ProjectPricing, MonthlyPricing, AgencyPackage
} from "@/types";

// Helper to convert arrays of strings, objects to JSON strings/parsed JSON or keep arrays as JSONB arrays.
// Supabase handles JS arrays directly as Postgres jsonb arrays, so we don't need JSON.stringify/JSON.parse for them if they are stored as JSONB.
// But some fields in types were originally JSON strings in local storage (like subServicesJson, faqsJson, pricingJson). Let's convert them properly.

export const mapService = {
  toDb(item: Service) {
    return {
      id: item.id,
      category: item.category,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      features_en: item.featuresEn || [],
      features_bn: item.featuresBn || [],
      benefits_en: item.benefitsEn || [],
      benefits_bn: item.benefitsBn || [],
      price: item.price,
      icon: item.icon,
      slug: item.slug,
      process_en: item.processEn || [],
      process_bn: item.processBn || [],
      tech_used: item.techUsed || [],
      subtitle_en: item.subtitleEn || null,
      subtitle_bn: item.subtitleBn || null,
      why_need_en: item.whyNeedEn || null,
      why_need_bn: item.whyNeedBn || null,
      who_for_en: item.whoForEn || null,
      who_for_bn: item.whoForBn || null,
      business_impact_en: item.businessImpactEn || null,
      business_impact_bn: item.businessImpactBn || null,
      sub_services: item.subServicesJson ? JSON.parse(item.subServicesJson) : [],
      faqs: item.faqsJson ? JSON.parse(item.faqsJson) : [],
      pricing: item.pricingJson ? JSON.parse(item.pricingJson) : {},
    };
  },
  fromDb(row: any): Service {
    return {
      id: row.id,
      category: row.category,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      featuresEn: row.features_en || [],
      featuresBn: row.features_bn || [],
      benefitsEn: row.benefits_en || [],
      benefitsBn: row.benefits_bn || [],
      price: row.price,
      icon: row.icon,
      slug: row.slug,
      processEn: row.process_en || [],
      processBn: row.process_bn || [],
      techUsed: row.tech_used || [],
      subtitleEn: row.subtitle_en || undefined,
      subtitleBn: row.subtitle_bn || undefined,
      whyNeedEn: row.why_need_en || undefined,
      whyNeedBn: row.why_need_bn || undefined,
      whoForEn: row.who_for_en || undefined,
      whoForBn: row.who_for_bn || undefined,
      businessImpactEn: row.business_impact_en || undefined,
      businessImpactBn: row.business_impact_bn || undefined,
      subServicesJson: row.sub_services ? JSON.stringify(row.sub_services) : undefined,
      faqsJson: row.faqs ? JSON.stringify(row.faqs) : undefined,
      pricingJson: row.pricing ? JSON.stringify(row.pricing) : undefined,
    };
  }
};

export const mapPortfolioItem = {
  toDb(item: PortfolioItem) {
    const dbRow: Record<string, any> = {
      id: item.id,
      category: item.category,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      client: item.client,
      duration: item.duration,
      budget: item.budget,
      challenge_en: item.challengeEn,
      challenge_bn: item.challengeBn,
      solution_en: item.solutionEn,
      solution_bn: item.solutionBn,
      result_en: item.resultEn,
      result_bn: item.resultBn,
      technologies: item.technologies || [],
      image: item.image,
      featured: item.featured || false,
      rating: item.rating || null,
      review_en: item.reviewEn || null,
      review_bn: item.reviewBn || null,
      slug: item.slug || null,
      status: item.status || "published",
      sort_order: item.sortOrder || 0,
      industry_en: item.industryEn || null,
      industry_bn: item.industryBn || null,
      completion_year: item.completionYear || null,
      gallery: item.galleryJson ? JSON.parse(item.galleryJson) : [],
      features_en: item.featuresEn || [],
      features_bn: item.featuresBn || [],
      before_image: item.beforeImage || null,
      after_image: item.afterImage || null,
      client_photo: item.clientPhoto || null,
      client_role_en: item.clientRoleEn || null,
      client_role_bn: item.clientRoleBn || null,
      seo_title_en: item.seoTitleEn || null,
      seo_title_bn: item.seoTitleBn || null,
      seo_desc_en: item.seoDescEn || null,
      seo_desc_bn: item.seoDescBn || null,
      live_url: item.liveUrl || null,
      github_url: item.githubUrl || null,
      project_type: item.projectType || '',
      project_date: item.projectDate || '',
      app_store_url: item.appStoreUrl || null,
      play_store_url: item.playStoreUrl || null,
      thumbnail_image: item.thumbnailImage || null,
      updated_at: new Date().toISOString(),
    };

    // Only include project_data when it actually contains service-specific
    // fields. This keeps classic saves working even if the JSONB column has
    // not been added to the hosted database yet (migration pending).
    if (item.projectData && typeof item.projectData === 'object' && Object.keys(item.projectData).length > 0) {
      dbRow.project_data = item.projectData;
    }

    return dbRow;
  },
  fromDb(row: any): PortfolioItem {
    return {
      id: row.id,
      category: row.category,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      client: row.client,
      duration: row.duration,
      budget: row.budget,
      challengeEn: row.challenge_en,
      challengeBn: row.challenge_bn,
      solutionEn: row.solution_en,
      solutionBn: row.solution_bn,
      resultEn: row.result_en,
      resultBn: row.result_bn,
      technologies: row.technologies || [],
      image: row.image,
      featured: row.featured,
      rating: row.rating || undefined,
      reviewEn: row.review_en || undefined,
      reviewBn: row.review_bn || undefined,
      slug: row.slug || undefined,
      status: row.status || undefined,
      sortOrder: row.sort_order || undefined,
      industryEn: row.industry_en || undefined,
      industryBn: row.industry_bn || undefined,
      completionYear: row.completion_year || undefined,
      galleryJson: row.gallery ? JSON.stringify(row.gallery) : undefined,
      featuresEn: row.features_en || [],
      featuresBn: row.features_bn || [],
      beforeImage: row.before_image || undefined,
      afterImage: row.after_image || undefined,
      clientPhoto: row.client_photo || undefined,
      clientRoleEn: row.client_role_en || undefined,
      clientRoleBn: row.client_role_bn || undefined,
      seoTitleEn: row.seo_title_en || undefined,
      seoTitleBn: row.seo_title_bn || undefined,
      seoDescEn: row.seo_desc_en || undefined,
      seoDescBn: row.seo_desc_bn || undefined,
      liveUrl: row.live_url || undefined,
      githubUrl: row.github_url || undefined,
      projectType: row.project_type || undefined,
      projectDate: row.project_date || undefined,
      appStoreUrl: row.app_store_url || undefined,
      playStoreUrl: row.play_store_url || undefined,
      thumbnailImage: row.thumbnail_image || undefined,
      projectData: row.project_data || undefined,
    };
  }
};

export const mapBlogPost = {
  toDb(item: BlogPost) {
    return {
      id: item.id,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      excerpt_en: item.excerptEn,
      excerpt_bn: item.excerptBn,
      content_en: item.contentEn,
      content_bn: item.contentBn,
      category_en: item.categoryEn,
      category_bn: item.categoryBn,
      tags: item.tags || [],
      image: item.image,
      author: item.author,
      read_time: item.readTime,
      published_at: item.publishedAt,
      status: item.status || "draft",
      views: item.views || 0,
      engagement: item.engagement || 0,
      is_trending: item.isTrending || false,
      is_featured: item.isFeatured || false,
      is_editors_pick: item.isEditorsPick || false,
      is_learning_guide: item.isLearningGuide || false,
      is_latest_news: item.isLatestNews || false,
      scheduled_at: item.scheduledAt || null,
      slug: item.slug || null,
      seo_title_en: item.seoTitleEn || null,
      seo_title_bn: item.seoTitleBn || null,
      seo_desc_en: item.seoDescEn || null,
      seo_desc_bn: item.seoDescBn || null,
      canonical_url: item.canonicalUrl || null,
      og_image: item.ogImage || null,
      author_role_en: item.authorRoleEn || null,
      author_role_bn: item.authorRoleBn || null,
      author_bio_en: item.authorBioEn || null,
      author_bio_bn: item.authorBioBn || null,
      author_photo: item.authorPhoto || null,
      author_twitter: item.authorTwitter || null,
      author_linkedin: item.authorLinkedin || null,
    };
  },
  fromDb(row: any): BlogPost {
    return {
      id: row.id,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      excerptEn: row.excerpt_en,
      excerptBn: row.excerpt_bn,
      contentEn: row.content_en,
      contentBn: row.content_bn,
      categoryEn: row.category_en,
      categoryBn: row.category_bn,
      tags: row.tags || [],
      image: row.image,
      author: row.author,
      readTime: row.read_time,
      publishedAt: row.published_at,
      status: row.status,
      views: row.views || undefined,
      engagement: row.engagement || undefined,
      isTrending: row.is_trending || undefined,
      isFeatured: row.is_featured || undefined,
      isEditorsPick: row.is_editors_pick || undefined,
      isLearningGuide: row.is_learning_guide || undefined,
      isLatestNews: row.is_latest_news || undefined,
      scheduledAt: row.scheduled_at || undefined,
      slug: row.slug || undefined,
      seoTitleEn: row.seo_title_en || undefined,
      seoTitleBn: row.seo_title_bn || undefined,
      seoDescEn: row.seo_desc_en || undefined,
      seoDescBn: row.seo_desc_bn || undefined,
      canonicalUrl: row.canonical_url || undefined,
      ogImage: row.og_image || undefined,
      authorRoleEn: row.author_role_en || undefined,
      authorRoleBn: row.author_role_bn || undefined,
      authorBioEn: row.author_bio_en || undefined,
      authorBioBn: row.author_bio_bn || undefined,
      authorPhoto: row.author_photo || undefined,
      authorTwitter: row.author_twitter || undefined,
      authorLinkedin: row.author_linkedin || undefined,
    };
  }
};

export const mapTestimonial = {
  toDb(item: Testimonial) {
    return {
      id: item.id,
      name: item.name,
      role_en: item.roleEn,
      role_bn: item.roleBn,
      company: item.company,
      feedback_en: item.feedbackEn,
      feedback_bn: item.feedbackBn,
      rating: item.rating,
      avatar: item.avatar,
      country: item.country || null,
      country_flag: item.countryFlag || null,
      industry: item.industry || null,
      category: item.category || null,
      service: item.service || null,
      review_date: item.reviewDate || null,
      review_title_en: item.reviewTitleEn || null,
      review_title_bn: item.reviewTitleBn || null,
      company_logo: item.companyLogo || null,
      project_link: item.projectLink || null,
      video_url: item.videoUrl || null,
      is_verified: item.isVerified || false,
      featured: item.featured || false,
      sort_order: item.sortOrder || 0,
      status: item.status || "approved",
      created_at: item.createdAt || new Date().toISOString(),
    };
  },
  fromDb(row: any): Testimonial {
    return {
      id: row.id,
      name: row.name,
      roleEn: row.role_en,
      roleBn: row.role_bn,
      company: row.company,
      feedbackEn: row.feedback_en,
      feedbackBn: row.feedback_bn,
      rating: row.rating,
      avatar: row.avatar,
      country: row.country || undefined,
      countryFlag: row.country_flag || undefined,
      industry: row.industry || undefined,
      category: row.category || undefined,
      service: row.service || undefined,
      reviewDate: row.review_date || undefined,
      reviewTitleEn: row.review_title_en || undefined,
      reviewTitleBn: row.review_title_bn || undefined,
      companyLogo: row.company_logo || undefined,
      projectLink: row.project_link || undefined,
      videoUrl: row.video_url || undefined,
      isVerified: row.is_verified,
      featured: row.featured,
      sortOrder: row.sort_order || undefined,
      status: row.status,
      createdAt: row.created_at,
    };
  }
};

export const mapFAQ = {
  toDb(item: FAQ) {
    return {
      id: item.id,
      category_en: item.categoryEn,
      category_bn: item.categoryBn,
      question_en: item.questionEn,
      question_bn: item.questionBn,
      answer_en: item.answerEn,
      answer_bn: item.answerBn,
      helpful_count: item.helpfulCount || 0,
    };
  },
  fromDb(row: any): FAQ {
    return {
      id: row.id,
      categoryEn: row.category_en,
      categoryBn: row.category_bn,
      questionEn: row.question_en,
      questionBn: row.question_bn,
      answerEn: row.answer_en,
      answerBn: row.answer_bn,
      helpfulCount: row.helpful_count,
    };
  }
};

export const mapContactMessage = {
  toDb(item: ContactMessage) {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      service: item.service,
      budget: item.budget,
      status: item.status || "unread",
      created_at: item.createdAt || new Date().toISOString(),
    };
  },
  fromDb(row: any): ContactMessage {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      subject: row.subject,
      message: row.message,
      service: row.service,
      budget: row.budget,
      status: row.status,
      createdAt: row.created_at,
    };
  }
};

export const mapSubscriber = {
  toDb(item: Subscriber) {
    return {
      id: item.id,
      email: item.email,
      created_at: item.createdAt || new Date().toISOString(),
    };
  },
  fromDb(row: any): Subscriber {
    return {
      id: row.id,
      email: row.email,
      createdAt: row.created_at,
    };
  }
};

export const mapSiteSettings = {
  toDb(item: SiteSettings) {
    return {
      id: item.id,
      agency_name: item.agencyName,
      tagline_en: item.taglineEn || null,
      tagline_bn: item.taglineBn || null,
      address_en: item.addressEn || null,
      address_bn: item.addressBn || null,
      phone: item.phone,
      email: item.email,
      facebook: item.facebook,
      linkedin: item.linkedin,
      twitter: item.twitter,
      instagram: item.instagram,
      working_hours_en: item.workingHoursEn,
      working_hours_bn: item.workingHoursBn,
      about_mission_en: item.aboutMissionEn || null,
      about_mission_bn: item.aboutMissionBn || null,
      about_vision_en: item.aboutVisionEn || null,
      about_vision_bn: item.aboutVisionBn || null,
      stats_projects: item.statsProjects || 0,
      stats_clients: item.statsClients || 0,
      stats_team: item.statsTeam || 0,
      stats_experience: item.statsExperience || 0,
      stats_countries: item.statsCountries || 0,
      stats_satisfaction: item.statsSatisfaction || 0,
      stats_industries: item.statsIndustries || 0,
      stats_techs: item.statsTechs || 0,
      about_team_json: item.aboutTeamJson || null,
      about_timeline_json: item.aboutTimelineJson || null,
      about_techs_json: item.aboutTechsJson || null,
      about_values_json: item.aboutValuesJson || null,
    };
  },
  fromDb(row: any): SiteSettings {
    return {
      id: row.id,
      agencyName: row.agency_name,
      taglineEn: row.tagline_en || undefined,
      taglineBn: row.tagline_bn || undefined,
      addressEn: row.address_en || undefined,
      addressBn: row.address_bn || undefined,
      phone: row.phone,
      email: row.email,
      facebook: row.facebook,
      linkedin: row.linkedin,
      twitter: row.twitter,
      instagram: row.instagram,
      workingHoursEn: row.working_hours_en,
      workingHoursBn: row.working_hours_bn,
      aboutMissionEn: row.about_mission_en || undefined,
      aboutMissionBn: row.about_mission_bn || undefined,
      aboutVisionEn: row.about_vision_en || undefined,
      aboutVisionBn: row.about_vision_bn || undefined,
      statsProjects: row.stats_projects,
      statsClients: row.stats_clients,
      statsTeam: row.stats_team,
      statsExperience: row.stats_experience,
      statsCountries: row.stats_countries,
      statsSatisfaction: row.stats_satisfaction,
      statsIndustries: row.stats_industries,
      statsTechs: row.stats_techs,
      aboutTeamJson: row.about_team_json || undefined,
      aboutTimelineJson: row.about_timeline_json || undefined,
      aboutTechsJson: row.about_techs_json || undefined,
      aboutValuesJson: row.about_values_json || undefined,
    };
  }
};

export const mapPricingPackage = {
  toDb(item: PricingPackage) {
    return {
      id: item.id,
      category: item.category,
      name_en: item.nameEn,
      name_bn: item.nameBn,
      price_monthly: item.priceMonthly,
      price_yearly: item.priceYearly,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      features_en: item.featuresEn || [],
      features_bn: item.featuresBn || [],
      not_included_en: item.notIncludedEn || [],
      not_included_bn: item.notIncludedBn || [],
      cta_en: item.ctaEn,
      cta_bn: item.ctaBn,
      popular: item.popular || false,
      enabled: item.enabled || false,
      sort_order: item.sortOrder || 0,
      badge_en: item.badgeEn || null,
      badge_bn: item.badgeBn || null,
      tech_en: item.techEn || null,
    };
  },
  fromDb(row: any): PricingPackage {
    return {
      id: row.id,
      category: row.category,
      nameEn: row.name_en,
      nameBn: row.name_bn,
      priceMonthly: row.price_monthly,
      priceYearly: row.price_yearly,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      featuresEn: row.features_en || [],
      featuresBn: row.features_bn || [],
      notIncludedEn: row.not_included_en || [],
      notIncludedBn: row.not_included_bn || [],
      ctaEn: row.cta_en,
      ctaBn: row.cta_bn,
      popular: row.popular,
      enabled: row.enabled,
      sortOrder: row.sort_order,
      badgeEn: row.badge_en || undefined,
      badgeBn: row.badge_bn || undefined,
      techEn: row.tech_en || undefined,
    };
  }
};

export const mapPricingAddon = {
  toDb(item: PricingAddon) {
    return {
      id: item.id,
      name_en: item.nameEn,
      name_bn: item.nameBn,
      price: item.price,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      category: item.category,
      enabled: item.enabled || false,
    };
  },
  fromDb(row: any): PricingAddon {
    return {
      id: row.id,
      nameEn: row.name_en,
      nameBn: row.name_bn,
      price: row.price,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      category: row.category,
      enabled: row.enabled,
    };
  }
};

export const mapPricingComparison = {
  toDb(item: PricingComparison) {
    return {
      id: item.id,
      feature_en: item.featureEn,
      feature_bn: item.featureBn,
      starter_en: item.starterEn,
      starter_bn: item.starterBn,
      business_en: item.businessEn,
      business_bn: item.businessBn,
      enterprise_en: item.enterpriseEn,
      enterprise_bn: item.enterpriseBn,
      category_en: item.categoryEn,
      category_bn: item.categoryBn,
      sort_order: item.sortOrder || 0,
    };
  },
  fromDb(row: any): PricingComparison {
    return {
      id: row.id,
      featureEn: row.feature_en,
      featureBn: row.feature_bn,
      starterEn: row.starter_en,
      starterBn: row.starter_bn,
      businessEn: row.business_en,
      businessBn: row.business_bn,
      enterpriseEn: row.enterprise_en,
      enterpriseBn: row.enterprise_bn,
      categoryEn: row.category_en,
      categoryBn: row.category_bn,
      sortOrder: row.sort_order,
    };
  }
};

export const mapPricingQuoteRequest = {
  toDb(item: PricingQuoteRequest) {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      company: item.company,
      project_desc: item.description || (item as any).projectDesc,
      service: item.service,
      budget: item.budget,
      timeline: item.timeline,
      status: item.status || 'pending',
      created_at: item.createdAt || new Date().toISOString(),
    };
  },
  fromDb(row: any): PricingQuoteRequest {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      company: row.company || '',
      industry: row.industry || '',
      service: row.service || '',
      description: row.project_desc || '',
      budget: row.budget || '',
      timeline: row.timeline || '',
      status: row.status || 'pending',
      createdAt: row.created_at || new Date().toISOString(),
    };
  }
};

export const mapProjectPricing = {
  toDb(item: ProjectPricing) {
    return {
      id: item.id,
      service: item.service,
      project_type: item.projectType,
      price: item.price,
      currency: item.currency || "USD",
      billing_type: item.billingType || "one-time",
      delivery: item.delivery || "",
      revisions: item.revisions || "",
      support: item.support || "",
      features: item.features || [],
      recommended: item.recommended || false,
      enabled: item.enabled ?? true,
      sort_order: item.sortOrder || 0,
    };
  },
  fromDb(row: any): ProjectPricing {
    return {
      id: row.id,
      service: row.service,
      projectType: row.project_type,
      price: Number(row.price),
      currency: row.currency || "USD",
      billingType: row.billing_type || "one-time",
      delivery: row.delivery || "",
      revisions: row.revisions || "",
      support: row.support || "",
      features: row.features || [],
      recommended: row.recommended,
      enabled: row.enabled,
      sortOrder: row.sort_order,
    };
  }
};

export const mapMonthlyPricing = {
  toDb(item: MonthlyPricing) {
    return {
      id: item.id,
      plan_name: item.planName,
      service: item.service,
      description: item.description || "",
      price: item.price,
      currency: item.currency || "USD",
      billing_type: item.billingType || "monthly",
      delivery: item.delivery || "",
      features: item.features || [],
      recommended: item.recommended || false,
      enabled: item.enabled ?? true,
      sort_order: item.sortOrder || 0,
    };
  },
  fromDb(row: any): MonthlyPricing {
    return {
      id: row.id,
      planName: row.plan_name,
      service: row.service,
      description: row.description || "",
      price: Number(row.price),
      currency: row.currency || "USD",
      billingType: row.billing_type || "monthly",
      delivery: row.delivery || "",
      features: row.features || [],
      recommended: row.recommended,
      enabled: row.enabled,
      sortOrder: row.sort_order,
    };
  }
};

export const mapAgencyPackage = {
  toDb(item: AgencyPackage) {
    return {
      id: item.id,
      name: item.name,
      tagline: item.tagline || "",
      original_price: item.originalPrice,
      price: item.price,
      discount: item.discount ?? null,
      billing_type: item.billingType || "one-time",
      delivery: item.delivery || "",
      support: item.support || "",
      features: item.features || [],
      included_services: item.includedServices || [],
      most_popular: item.mostPopular || false,
      enabled: item.enabled ?? true,
      sort_order: item.sortOrder || 0,
    };
  },
  fromDb(row: any): AgencyPackage {
    return {
      id: row.id,
      name: row.name,
      tagline: row.tagline || "",
      originalPrice: Number(row.original_price),
      price: Number(row.price),
      discount: row.discount ?? undefined,
      billingType: row.billing_type || "one-time",
      delivery: row.delivery || "",
      support: row.support || "",
      features: row.features || [],
      includedServices: row.included_services || [],
      mostPopular: row.most_popular,
      enabled: row.enabled,
      sortOrder: row.sort_order,
    };
  }
};

export const mapCurrency = {
  toDb(item: Currency) {
    return {
      id: item.id,
      name: item.name,
      code: item.code,
      symbol: item.symbol,
      flag: item.flag || null,
      exchange_rate: item.exchangeRate,
      enabled: item.enabled || false,
      is_default: item.isDefault || false,
      sort_order: item.sortOrder || 0,
    };
  },
  fromDb(row: any): Currency {
    return {
      id: row.id,
      name: row.name,
      code: row.code,
      symbol: row.symbol,
      flag: row.flag || undefined,
      exchangeRate: row.exchange_rate,
      enabled: row.enabled,
      isDefault: row.is_default,
      sortOrder: row.sort_order,
    };
  }
};

export const mapCurrencySettings = {
  toDb(item: CurrencySettings) {
    return {
      enable_live_rates: item.enableLiveRates,
      decimal_precision: item.decimalPrecision,
      default_currency_code: item.defaultCurrencyCode,
    };
  },
  fromDb(row: any): CurrencySettings {
    return {
      enableLiveRates: row.enable_live_rates,
      decimalPrecision: row.decimal_precision,
      defaultCurrencyCode: row.default_currency_code,
    };
  }
};

export const mapTestimonialVideo = {
  toDb(item: TestimonialVideo) {
    return {
      id: item.id,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      client_name: item.clientName,
      company: item.company,
      avatar: item.avatar,
      rating: item.rating,
      video_url: item.videoUrl,
      thumbnail_url: item.thumbnailUrl,
      short_description_en: item.shortDescriptionEn,
      short_description_bn: item.shortDescriptionBn,
      featured: item.featured || false,
      display_order: item.displayOrder || 0,
    };
  },
  fromDb(row: any): TestimonialVideo {
    return {
      id: row.id,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      clientName: row.client_name,
      company: row.company,
      avatar: row.avatar,
      rating: row.rating,
      videoUrl: row.video_url,
      thumbnailUrl: row.thumbnail_url,
      shortDescriptionEn: row.short_description_en,
      shortDescriptionBn: row.short_description_bn,
      featured: row.featured,
      displayOrder: row.display_order,
    };
  }
};

export const mapTestimonialStatistics = {
  toDb(item: TestimonialStatistics) {
    return {
      total_reviews: item.totalReviews,
      average_rating: item.averageRating,
      satisfaction_rate: item.satisfactionRate,
      video_reviews_count: item.videoReviewsCount,
      featured_stories_count: item.featuredStoriesCount,
      client_retention_rate: item.clientRetentionRate,
    };
  },
  fromDb(row: any): TestimonialStatistics {
    return {
      totalReviews: row.total_reviews,
      averageRating: row.average_rating,
      satisfactionRate: row.satisfaction_rate,
      videoReviewsCount: row.video_reviews_count,
      featuredStoriesCount: row.featured_stories_count,
      clientRetentionRate: row.client_retention_rate,
    };
  }
};

export const mapClientLogo = {
  toDb(item: ClientLogo) {
    return {
      id: item.id,
      name: item.name,
      logo_url: item.logoUrl,
      featured: item.featured || false,
      display_order: item.displayOrder || 0,
    };
  },
  fromDb(row: any): ClientLogo {
    return {
      id: row.id,
      name: row.name,
      logoUrl: row.logo_url,
      featured: row.featured,
      displayOrder: row.display_order,
    };
  }
};

export const mapClientMoment = {
  toDb(item: ClientMoment) {
    return {
      id: item.id,
      title_en: item.titleEn,
      title_bn: item.titleBn || null,
      client_name: item.clientName || null,
      company: item.company || null,
      image_url: item.imageUrl,
      description_en: item.descriptionEn || null,
      description_bn: item.descriptionBn || null,
      display_order: item.displayOrder || 0,
      visible: item.visible ?? true,
    };
  },
  fromDb(row: any): ClientMoment {
    return {
      id: row.id,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      clientName: row.client_name,
      company: row.company,
      imageUrl: row.image_url,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      displayOrder: row.display_order,
      visible: row.visible,
    };
  }
};

export const mapSuccessStory = {
  toDb(item: SuccessStory) {
    return {
      id: item.id,
      client_name: item.clientName,
      company_name: item.companyName,
      industry_en: item.industryEn || null,
      industry_bn: item.industryBn || null,
      service_en: item.serviceEn || null,
      service_bn: item.serviceBn || null,
      background_en: item.backgroundEn || null,
      background_bn: item.backgroundBn || null,
      challenge_en: item.challengeEn || null,
      challenge_bn: item.challengeBn || null,
      solution_en: item.solutionEn || null,
      solution_bn: item.solutionBn || null,
      technologies: item.technologies || [],
      timeline_en: item.timelineEn || null,
      timeline_bn: item.timelineBn || null,
      results_en: item.resultsEn || null,
      results_bn: item.resultsBn || null,
      before_image: item.beforeImage || null,
      after_image: item.afterImage || null,
      client_quote_en: item.clientQuoteEn || null,
      client_quote_bn: item.clientQuoteBn || null,
      client_role_en: item.clientRoleEn || null,
      client_role_bn: item.clientRoleBn || null,
      client_photo: item.clientPhoto || null,
      featured: item.featured || false,
      display_order: item.displayOrder || 0,
    };
  },
  fromDb(row: any): SuccessStory {
    return {
      id: row.id,
      clientName: row.client_name,
      companyName: row.company_name,
      industryEn: row.industry_en || undefined,
      industryBn: row.industry_bn || undefined,
      serviceEn: row.service_en || undefined,
      serviceBn: row.service_bn || undefined,
      backgroundEn: row.background_en || undefined,
      backgroundBn: row.background_bn || undefined,
      challengeEn: row.challenge_en || undefined,
      challengeBn: row.challenge_bn || undefined,
      solutionEn: row.solution_en || undefined,
      solutionBn: row.solution_bn || undefined,
      technologies: row.technologies || [],
      timelineEn: row.timeline_en || undefined,
      timelineBn: row.timeline_bn || undefined,
      resultsEn: row.results_en || undefined,
      resultsBn: row.results_bn || undefined,
      beforeImage: row.before_image || undefined,
      afterImage: row.after_image || undefined,
      clientQuoteEn: row.client_quote_en || undefined,
      clientQuoteBn: row.client_quote_bn || undefined,
      clientRoleEn: row.client_role_en || undefined,
      clientRoleBn: row.client_role_bn || undefined,
      clientPhoto: row.client_photo || undefined,
      featured: row.featured,
      displayOrder: row.display_order,
    };
  }
};

export const mapReviewSettings = {
  toDb(item: ReviewSettings) {
    return {
      moderation_enabled: item.moderationEnabled,
      allow_anonymous: item.allowAnonymous,
      min_rating_for_auto_publish: item.minRatingForAutoPublish,
      notify_on_new_review: item.notifyOnNewReview,
      enable_video_reviews: item.enableVideoReviews,
    };
  },
  fromDb(row: any): ReviewSettings {
    return {
      moderationEnabled: row.moderation_enabled,
      allowAnonymous: row.allow_anonymous,
      minRatingForAutoPublish: row.min_rating_for_auto_publish,
      notifyOnNewReview: row.notify_on_new_review,
      enableVideoReviews: row.enable_video_reviews,
    };
  }
};

export const mapLegalPolicy = {
  toDb(item: LegalPolicy) {
    return {
      id: item.id,
      type: item.type,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      slug: item.slug,
      status: item.status,
      version: item.version,
      effective_date: item.effectiveDate,
      last_updated: item.lastUpdated || null,
      sections: item.sections || [],
      seo_title: item.seoTitle || null,
      seo_description: item.seoDescription || null,
      meta_title_en: item.metaTitleEn || null,
      meta_title_bn: item.metaTitleBn || null,
      meta_description_en: item.metaDescriptionEn || null,
      meta_description_bn: item.metaDescriptionBn || null,
      canonical_url: item.canonicalUrl || null,
      og_title: item.ogTitle || null,
      og_description: item.ogDescription || null,
      twitter_card: item.twitterCard || null,
      schema_markup: item.schemaMarkup || null,
    };
  },
  fromDb(row: any): LegalPolicy {
    return {
      id: row.id,
      type: row.type,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      slug: row.slug,
      status: row.status,
      version: row.version,
      effectiveDate: row.effective_date,
      lastUpdated: row.last_updated,
      sections: row.sections || [],
      seoTitle: row.seo_title,
      seoDescription: row.seo_description,
      metaTitleEn: row.meta_title_en || undefined,
      metaTitleBn: row.meta_title_bn || undefined,
      metaDescriptionEn: row.meta_description_en || undefined,
      metaDescriptionBn: row.meta_description_bn || undefined,
      canonicalUrl: row.canonical_url || undefined,
      ogTitle: row.og_title || undefined,
      ogDescription: row.og_description || undefined,
      twitterCard: row.twitter_card || undefined,
      schemaMarkup: row.schema_markup || undefined,
    };
  }
};

export const mapLegalRevision = {
  toDb(item: LegalRevision) {
    return {
      id: item.id,
      policy_id: item.policyId,
      version: item.version,
      updated_by: item.updatedBy,
      change_summary: item.changeSummary,
      sections: item.sections || [],
      created_at: item.updatedAt || new Date().toISOString(),
    };
  },
  fromDb(row: any): LegalRevision {
    return {
      id: row.id,
      policyId: row.policy_id,
      version: row.version,
      updatedBy: row.updated_by,
      changeSummary: row.change_summary,
      sections: row.sections || [],
      updatedAt: row.created_at,
    };
  }
};

export const mapCookieCategory = {
  toDb(item: CookieCategory) {
    return {
      id: item.id,
      name: item.name,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      enabled_by_default: item.enabledByDefault || false,
      is_essential: item.isEssential || false,
      sort_order: item.sortOrder || 0,
    };
  },
  fromDb(row: any): CookieCategory {
    return {
      id: row.id,
      name: row.name,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      enabledByDefault: row.enabled_by_default,
      isEssential: row.is_essential,
      sortOrder: row.sort_order,
    };
  }
};

export const mapCookieSettings = {
  toDb(item: CookieSettings) {
    return {
      id: item.id,
      banner_title_en: item.bannerTitleEn,
      banner_title_bn: item.bannerTitleBn,
      banner_text_en: item.bannerTextEn,
      banner_text_bn: item.bannerTextBn,
      enable_customize: item.enableCustomize || false,
      last_updated: item.lastUpdated || null,
    };
  },
  fromDb(row: any): CookieSettings {
    return {
      id: row.id,
      bannerTitleEn: row.banner_title_en,
      bannerTitleBn: row.banner_title_bn,
      bannerTextEn: row.banner_text_en,
      bannerTextBn: row.banner_text_bn,
      enableCustomize: row.enable_customize,
      lastUpdated: row.last_updated,
    };
  }
};

export const mapWhyChooseUsCard = {
  toDb(item: WhyChooseUsCard) {
    return {
      id: item.id,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      icon: item.icon,
      category_en: item.categoryEn || null,
      category_bn: item.categoryBn || null,
      badge_text_en: item.badgeTextEn || null,
      badge_text_bn: item.badgeTextBn || null,
      display_order: item.displayOrder || 0,
      visible: item.visible || false,
    };
  },
  fromDb(row: any): WhyChooseUsCard {
    return {
      id: row.id,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      icon: row.icon,
      categoryEn: row.category_en || undefined,
      categoryBn: row.category_bn || undefined,
      badgeTextEn: row.badge_text_en || undefined,
      badgeTextBn: row.badge_text_bn || undefined,
      displayOrder: row.display_order,
      visible: row.visible,
    };
  }
};

export const mapWhyChooseUsStat = {
  toDb(item: WhyChooseUsStat) {
    return {
      id: item.id,
      value: item.value,
      label_en: item.labelEn,
      label_bn: item.labelBn,
      display_order: item.displayOrder || 0,
      visible: item.visible || false,
    };
  },
  fromDb(row: any): WhyChooseUsStat {
    return {
      id: row.id,
      value: row.value,
      labelEn: row.label_en,
      labelBn: row.label_bn,
      displayOrder: row.display_order,
      visible: row.visible,
    };
  }
};

export const mapWhyChooseUsBadge = {
  toDb(item: WhyChooseUsBadge) {
    return {
      id: item.id,
      label_en: item.labelEn,
      label_bn: item.labelBn,
      display_order: item.displayOrder || 0,
      visible: item.visible || false,
    };
  },
  fromDb(row: any): WhyChooseUsBadge {
    return {
      id: row.id,
      labelEn: row.label_en,
      labelBn: row.label_bn,
      displayOrder: row.display_order,
      visible: row.visible,
    };
  }
};

export const mapWhyChooseUsTech = {
  toDb(item: WhyChooseUsTech) {
    return {
      id: item.id,
      name: item.name,
      logo_url: item.logoUrl,
      display_order: item.displayOrder || 0,
      visible: item.visible || false,
    };
  },
  fromDb(row: any): WhyChooseUsTech {
    return {
      id: row.id,
      name: row.name,
      logoUrl: row.logo_url,
      displayOrder: row.display_order,
      visible: row.visible,
    };
  }
};

export const mapWhyChooseUsCTA = {
  toDb(item: WhyChooseUsCTA) {
    return {
      id: item.id,
      headline_en: item.headlineEn,
      headline_bn: item.headlineBn,
      sub_en: item.subEn || null,
      sub_bn: item.subBn || null,
      btn1_text_en: item.btn1TextEn || null,
      btn1_text_bn: item.btn1TextBn || null,
      btn2_text_en: item.btn2TextEn || null,
      btn2_text_bn: item.btn2TextBn || null,
      note_en: item.noteEn || null,
      note_bn: item.noteBn || null,
      tagline_en: item.taglineEn || null,
      tagline_bn: item.taglineBn || null,
      description_en: item.descriptionEn || null,
      description_bn: item.descriptionBn || null,
      primary_button_text_en: item.primaryButtonTextEn || null,
      primary_button_text_bn: item.primaryButtonTextBn || null,
      secondary_button_text_en: item.secondaryButtonTextEn || null,
      secondary_button_text_bn: item.secondaryButtonTextBn || null,
    };
  },
  fromDb(row: any): WhyChooseUsCTA {
    return {
      id: row.id,
      headlineEn: row.headline_en,
      headlineBn: row.headline_bn,
      subEn: row.sub_en,
      subBn: row.sub_bn,
      btn1TextEn: row.btn1_text_en,
      btn1TextBn: row.btn1_text_bn,
      btn2TextEn: row.btn2_text_en,
      btn2TextBn: row.btn2_text_bn,
      noteEn: row.note_en,
      noteBn: row.note_bn,
      taglineEn: row.tagline_en,
      taglineBn: row.tagline_bn,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      primaryButtonTextEn: row.primary_button_text_en,
      primaryButtonTextBn: row.primary_button_text_bn,
      secondaryButtonTextEn: row.secondary_button_text_en,
      secondaryButtonTextBn: row.secondary_button_text_bn,
    };
  }
};

export const mapProcessStep = {
  toDb(item: ProcessStep) {
    return {
      id: item.id,
      step_number: item.stepNumber,
      icon: item.icon,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      deliverables_en: item.deliverablesEn || [],
      deliverables_bn: item.deliverablesBn || [],
      estimated_duration_en: item.estimatedDurationEn,
      estimated_duration_bn: item.estimatedDurationBn,
      tools_used: item.toolsUsed || [],
      services_included_en: item.servicesIncludedEn || [],
      services_included_bn: item.servicesIncludedBn || [],
      animation_type: item.animationType || "fade",
      display_order: item.displayOrder || 0,
      visible: item.visible || false,
    };
  },
  fromDb(row: any): ProcessStep {
    return {
      id: row.id,
      stepNumber: row.step_number,
      icon: row.icon,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      deliverablesEn: row.deliverables_en || [],
      deliverablesBn: row.deliverables_bn || [],
      estimatedDurationEn: row.estimated_duration_en,
      estimatedDurationBn: row.estimated_duration_bn,
      toolsUsed: row.tools_used || [],
      servicesIncludedEn: row.services_included_en || [],
      servicesIncludedBn: row.services_included_bn || [],
      animationType: row.animation_type,
      displayOrder: row.display_order,
      visible: row.visible,
    };
  }
};

export const mapProcessCTA = {
  toDb(item: ProcessCTA) {
    return {
      id: item.id,
      title_en: item.titleEn,
      title_bn: item.titleBn,
      highlight_en: item.highlightEn,
      highlight_bn: item.highlightBn,
      subtitle_en: item.subtitleEn,
      subtitle_bn: item.subtitleBn,
      cta_headline_en: item.ctaHeadlineEn,
      cta_headline_bn: item.ctaHeadlineBn,
      cta_subtitle_en: item.ctaSubtitleEn,
      cta_subtitle_bn: item.ctaSubtitleBn,
      cta_primary_text_en: item.ctaPrimaryTextEn,
      cta_primary_text_bn: item.ctaPrimaryTextBn,
      cta_secondary_text_en: item.ctaSecondaryTextEn,
      cta_secondary_text_bn: item.ctaSecondaryTextBn,
    };
  },
  fromDb(row: any): ProcessCTA {
    return {
      id: row.id,
      titleEn: row.title_en,
      titleBn: row.title_bn,
      highlightEn: row.highlight_en,
      highlightBn: row.highlight_bn,
      subtitleEn: row.subtitle_en,
      subtitleBn: row.subtitle_bn,
      ctaHeadlineEn: row.cta_headline_en,
      ctaHeadlineBn: row.cta_headline_bn,
      ctaSubtitleEn: row.cta_subtitle_en,
      ctaSubtitleBn: row.cta_subtitle_bn,
      ctaPrimaryTextEn: row.cta_primary_text_en,
      ctaPrimaryTextBn: row.cta_primary_text_bn,
      ctaSecondaryTextEn: row.cta_secondary_text_en,
      ctaSecondaryTextBn: row.cta_secondary_text_bn,
    };
  }
};

export const mapTechServiceCard = {
  toDb(item: TechServiceCard) {
    return {
      id: item.id,
      icon: item.icon,
      category_en: item.categoryEn,
      category_bn: item.categoryBn,
      description_en: item.descriptionEn,
      description_bn: item.descriptionBn,
      technologies: item.technologies || [],
      project_count: item.projectCount,
      popular_projects_en: item.popularProjectsEn || [],
      popular_projects_bn: item.popularProjectsBn || [],
      benefits_en: item.benefitsEn || [],
      benefits_bn: item.benefitsBn || [],
      experience_level_en: item.experienceLevelEn,
      experience_level_bn: item.experienceLevelBn,
      featured_badge_en: item.featuredBadgeEn || null,
      featured_badge_bn: item.featuredBadgeBn || null,
      display_order: item.displayOrder || 0,
      visible: item.visible || false,
      animation_type: item.animationType || "fade",
    };
  },
  fromDb(row: any): TechServiceCard {
    return {
      id: row.id,
      icon: row.icon,
      categoryEn: row.category_en,
      categoryBn: row.category_bn,
      descriptionEn: row.description_en,
      descriptionBn: row.description_bn,
      technologies: row.technologies || [],
      projectCount: row.project_count,
      popularProjectsEn: row.popular_projects_en || [],
      popularProjectsBn: row.popular_projects_bn || [],
      benefitsEn: row.benefits_en || [],
      benefitsBn: row.benefits_bn || [],
      experienceLevelEn: row.experience_level_en,
      experienceLevelBn: row.experience_level_bn,
      featuredBadgeEn: row.featured_badge_en || undefined,
      featuredBadgeBn: row.featured_badge_bn || undefined,
      displayOrder: row.display_order,
      visible: row.visible,
      animationType: row.animation_type,
    };
  }
};

export const mapProductImage = {
  toDb(item: Partial<ProductImage> & { url?: string; imageUrl?: string; image_url?: string }, productId?: string) {
    const validUrl = (item.url || item.imageUrl || item.image_url || '').trim();
    if (!validUrl) {
      throw new Error("Product image URL cannot be null or empty.");
    }
    const pid = productId || item.productId;
    if (!pid) {
      throw new Error("Product ID is required for product_images relation.");
    }
    return {
      ...(item.id ? { id: item.id } : {}),
      product_id: pid,
      url: validUrl,
      image_url: validUrl,
      display_order: item.displayOrder ?? 0,
      is_main: item.isMain ?? false,
    };
  },
  fromDb(row: any): ProductImage {
    const urlVal = row.url || row.image_url || '';
    return {
      id: row.id,
      productId: row.product_id,
      url: urlVal,
      imageUrl: urlVal,
      displayOrder: row.display_order ?? 0,
      isMain: row.is_main ?? false,
      createdAt: row.created_at,
    };
  }
};

export const mapProduct = {
  toDb(item: Partial<Product>) {
    return {
      ...(item.id ? { id: item.id } : {}),
      title_en: item.titleEn,
      title_bn: item.titleBn || null,
      slug: item.slug,
      description_en: item.descriptionEn || null,
      description_bn: item.descriptionBn || null,
      price: item.price ?? 0,
      cost: item.cost ?? 0,
      category: item.category || null,
      subcategory: item.subcategory || null,
      stock: item.stock ?? 0,
      sold: item.sold ?? 0,
      image: item.image || (item.images && item.images.length > 0 ? item.images[0] : null),
      images: item.images || [],
      status: item.status || 'published',
      sort_order: item.sortOrder ?? 0,
    };
  },
  fromDb(row: any, productImages?: ProductImage[]): Product {
    const mainImg = row.image || (row.images && row.images.length > 0 ? row.images[0] : undefined);
    const imageList: string[] = row.images && row.images.length > 0
      ? row.images
      : (productImages ? productImages.map(img => img.url) : []);

    return {
      id: row.id,
      titleEn: row.title_en,
      titleBn: row.title_bn || undefined,
      slug: row.slug,
      descriptionEn: row.description_en || undefined,
      descriptionBn: row.description_bn || undefined,
      price: typeof row.price === 'string' ? parseFloat(row.price) : (row.price ?? 0),
      cost: typeof row.cost === 'string' ? parseFloat(row.cost) : (row.cost ?? 0),
      category: row.category || undefined,
      subcategory: row.subcategory || undefined,
      stock: typeof row.stock === 'string' ? parseInt(row.stock, 10) : (row.stock ?? 0),
      sold: typeof row.sold === 'string' ? parseInt(row.sold, 10) : (row.sold ?? 0),
      image: mainImg,
      images: imageList,
      productImages: productImages || [],
      status: row.status || 'published',
      sortOrder: row.sort_order ?? 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
};

