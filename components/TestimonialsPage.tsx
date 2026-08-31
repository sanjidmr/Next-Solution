"use client";
import React, { useState, useEffect } from 'react';
import { 
  Star, Play, CheckCircle, Search, MessageSquare, Plus, X, 
  Globe, ArrowRight, Sparkles, ThumbsUp, HelpCircle, ChevronDown, ShieldCheck, Settings, Lock
} from 'lucide-react';
import { 
  getTestimonials, saveTestimonial, getTestimonialCategories, 
  getTestimonialVideos, getTestimonialStatistics, 
  getSuccessStories, getReviewSettings, getFAQs, getClientMoments
} from '@/lib/db';
import { Testimonial, TestimonialCategory, TestimonialVideo, SuccessStory, FAQ, ClientMoment } from '@/types';
import { TRUSTED_BY } from '@/data/trustedBy';
import { motion, AnimatePresence } from 'motion/react';
import { getLocalItem } from '@/lib/utils';
import TestimonialsAdmin from '@/components/TestimonialsAdmin';
import TestimonialsVisuals from './TestimonialsVisuals';

interface TestimonialsPageProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
}

export default function TestimonialsPage({ currentLang, setTab }: TestimonialsPageProps) {
  // DB States
  const [categories, setCategories] = useState<TestimonialCategory[]>([]);
  const [videos, setVideos] = useState<TestimonialVideo[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [moments, setMoments] = useState<ClientMoment[]>([]);

  // Section Visibility (LocalStorage)
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    hero: true, overview: true, stories: true, videos: true, wall: true, clientMoments: true, logos: true, whyUs: true, map: true, googleReviews: true, achievements: true, submissionCta: true, faq: true
  });

  // UI States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [storyTab, setStoryTab] = useState<'challenge' | 'solution' | 'results'>('challenge');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, number>>({});
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  // Public Review Form state
  const [showForm, setShowForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [roleEn, setRoleEn] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackEn, setFeedbackEn] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [industry, setIndustry] = useState('');

  // Admin Panel toggle state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load all DB fields
  const loadData = () => {
    setCategories(getTestimonialCategories());
    setVideos(getTestimonialVideos().filter(v => v.featured !== false));
    setStatistics(getTestimonialStatistics());
    setStories(getSuccessStories());
    setFaqs(getFAQs());
    setTestimonials(getTestimonials().filter(t => t.status === 'approved' || !t.status));
    setSettings(getReviewSettings());
    setMoments(getClientMoments());

    // Load section visibility
    const storedVisibility = getLocalItem('next_solution_sections_visibility');
    if (storedVisibility) {
      setSectionVisibility(JSON.parse(storedVisibility));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter testimonials logic
  const filteredTestimonials = testimonials.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory || t.industry?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesRating = selectedRating === 'all' || t.rating === selectedRating;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      t.name.toLowerCase().includes(searchLower) ||
      t.company.toLowerCase().includes(searchLower) ||
      t.feedbackEn.toLowerCase().includes(searchLower) ||
      (t.feedbackBn && t.feedbackBn.toLowerCase().includes(searchLower)) ||
      (t.roleEn && t.roleEn.toLowerCase().includes(searchLower));
    
    return matchesCategory && matchesRating && matchesSearch;
  });

  // Calculate rating stars count analytics
  const totalReviewsCount = testimonials.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = testimonials.filter(t => t.rating === stars).length;
    const percentage = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
    return { stars, percentage, count };
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !feedbackEn) return;

    const newReview: Testimonial = {
      id: `review-${Date.now()}`,
      name,
      roleEn: roleEn || 'Product Manager',
      roleBn: roleEn || 'প্রোডাক্ট ম্যানেজার',
      company: company || 'Self-Employed',
      avatar: avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`,
      feedbackEn,
      feedbackBn: feedbackEn,
      rating,
      category: selectedCategory !== 'all' ? selectedCategory : 'web-development',
      isVerified: true,
      status: settings?.requireApprovalBeforePublishing ? 'pending' : 'approved',
      industry: industry || 'Technology',
      createdAt: new Date().toISOString()
    };

    saveTestimonial(newReview);
    setFormSuccess(true);
    
    // Clear Form Fields
    setName('');
    setEmail('');
    setCompany('');
    setRoleEn('');
    setFeedbackEn('');
    setAvatarUrl('');
    setIndustry('');
    
    setTimeout(() => {
      loadData();
      setFormSuccess(false);
      setShowForm(false);
    }, 3000);
  };

  const handleHelpfulIncrement = (reviewId: string) => {
    if (helpfulClicked[reviewId]) return;
    setHelpfulRatings(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
    setHelpfulClicked(prev => ({
      ...prev,
      [reviewId]: true
    }));
  };

  return (
    <div id="testimonials-page-root" data-space-page className="bg-white dark:bg-[#0a0a0a] min-h-screen text-slate-900 dark:text-white overflow-x-hidden font-sans">
      
      {/* Floating Admin Entry Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-slate-900 hover:bg-blue-600 text-white rounded-full p-3.5 shadow-xl transition-all duration-300 hover:scale-110 flex items-center space-x-2 border border-slate-800"
          title="Open CMS Admin Dashboard"
        >
          <Lock className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span className="text-[10px] font-extrabold tracking-wider uppercase pr-1">Admin Panel</span>
        </button>
      </div>

      {/* 01. PREMIUM HERO SECTION — Pixel-Perfect Reference Design */}
      {sectionVisibility.hero && (
        <section
          id="reviews-hero"
          data-space-hero
          className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-orange-50/40 via-white to-gray-50 dark:from-[#030303] dark:via-[#030303] dark:to-[#0a0a0a]"
        >
          {/* Subtle orange ambient glow behind right image */}
          <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/[0.08] dark:bg-orange-500/[0.07] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-orange-400/[0.04] dark:bg-orange-400/[0.03] blur-[150px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-24 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-10 lg:gap-16 items-center">

              {/* ─── LEFT SIDE ─── */}
              <div className="space-y-7">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 rounded-full border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-white/[0.04] backdrop-blur-sm px-4 py-2 shadow-sm dark:shadow-[0_0_18px_rgba(255,77,0,0.08)]"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-white dark:border-[#030303] overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/80?img=${i + 10}`}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-white/80">Client Reviews</span>
                  <ArrowRight className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400" />
                </motion.div>

                {/* Section Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="flex items-center gap-3"
                >
                  <span className="h-px w-8 bg-orange-400 dark:bg-orange-500/50" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                    CLIENT REVIEWS
                  </span>
                  <span className="h-px w-8 bg-orange-400 dark:bg-orange-500/50" />
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.25 }}
                >
                  <h1
                    className="font-display font-bold text-gray-900 dark:text-white leading-[0.95]"
                    style={{
                      fontSize: 'clamp(2.8rem, 5vw, 5.2rem)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    Real Stories.<br />
                    Real <span className="text-orange-500">Results.</span>
                  </h1>

                  {/* Hand-drawn underline SVG */}
                  <svg
                    width="220"
                    height="14"
                    viewBox="0 0 220 14"
                    fill="none"
                    className="mt-2 ml-1"
                  >
                    <path
                      d="M2 10C30 3 60 2 90 5C120 8 150 4 180 3C195 2.5 210 4 218 6"
                      stroke="#FF4D00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </svg>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-[1.05rem] leading-relaxed max-w-[500px] text-gray-500 dark:text-white/65"
                  style={{ lineHeight: 1.7 }}
                >
                  {currentLang === 'en'
                    ? "Don\u2019t just take our word for it. Here\u2019s what our clients have to say about working with us and the results we deliver."
                    : 'আমাদের কথা না বিশ্বাস করে আমাদের ক্লায়েন্টদের কথা শুনুন।'}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="flex flex-wrap items-center gap-4 pt-2"
                >
                  {/* Primary CTA */}
                  <button
                    id="hero-write-review-btn"
                    onClick={() => {
                      setShowForm(true);
                      setTimeout(() => {
                        document.getElementById('review-form-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 120);
                    }}
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30"
                  >
                    {currentLang === 'en' ? 'Read All Reviews' : 'সকল রিভিউ পড়ুন'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>

                  {/* Secondary Video CTA */}
                  <button
                    className="flex items-center gap-3"
                    onClick={() => {
                      document.getElementById('reviews-feed-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-orange-500/40 bg-white dark:bg-transparent text-orange-500 dark:text-orange-400 transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 shadow-sm dark:shadow-none hover:shadow-md">
                      <span className="ml-0.5 text-sm">&#9654;</span>
                    </span>
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">Watch Client Stories</span>
                      <span className="block text-[11px] text-gray-400 dark:text-white/40">2 Min Video</span>
                    </div>
                  </button>
                </motion.div>
              </div>

              {/* ─── RIGHT SIDE — review.png ─── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex items-center justify-center"
              >
                <motion.img
                  src="/review.png"
                  alt="Client reviews and satisfaction"
                  className="w-full max-w-[850px] h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 35px rgba(255, 100, 0, 0.12))',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 08. CLIENT LOGOS SCROLLING WALL */}
      {sectionVisibility.logos && (
        <section className="py-12 bg-slate-50/50 dark:bg-[#0c0c0c] overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest text-center block mb-8">
              {currentLang === 'en' ? 'POWERING GLOBAL PRODUCT LEADING TEAMS' : 'বিশ্ববিখ্যাত ব্র্যান্ডগুলোর বিশ্বস্ত পার্টনার'}
            </span>
            
            {/* Auto scrolling container */}
            <div className="relative flex items-center overflow-hidden w-full">
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/50 dark:from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/50 dark:from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
              
              <div className="animate-marquee hover:[animation-play-state:paused] py-2">
                {[...TRUSTED_BY, ...TRUSTED_BY, ...TRUSTED_BY].map((name, idx) => (
                  <div key={`${name}-${idx}`} className="group mx-2 flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/60 hover:shadow-[0_14px_35px_-14px_rgba(255,77,0,0.45)] dark:border-neutral-800 dark:bg-[#141414]/80 sm:mx-3 sm:px-5 flex-shrink-0">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500/70 transition-transform duration-300 group-hover:scale-125" />
                    <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-gray-700 transition-colors duration-300 group-hover:text-orange-600 dark:text-neutral-200 dark:group-hover:text-orange-400 sm:text-lg">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 02. CLIENT SUCCESS OVERVIEW (BENTO GRID) */}
      {sectionVisibility.overview && statistics && (
        <section id="reviews-overview" className="py-20 bg-white dark:bg-[#141414]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">02. CLIENT RETENTION ENGINE</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'The Scale of Trust in Numbers' : 'পরিসংখ্যানে আমাদের বিশ্বস্ততার প্রমাণ'}
              </h2>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
              
              <div className="md:col-span-4 bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 hover:shadow-md transition flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">Completed Projects</span>
                <h3 className="text-4xl font-black text-blue-600 dark:text-orange-400 mt-3">{statistics.projectsCompleted}+</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-2">Delivered custom codebases, design assets, and scalable cloud systems on time.</p>
              </div>

              <div className="md:col-span-4 bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 hover:shadow-md transition flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">Client Retention Ratio</span>
                <h3 className="text-4xl font-black text-indigo-600 dark:text-orange-400 mt-3">{statistics.clientSatisfaction}%</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-2">Satisfied corporate businesses who trust us for multi-year ongoing scaling projects.</p>
              </div>

              <div className="md:col-span-4 bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 hover:shadow-md transition flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">Countries Served</span>
                <h3 className="text-4xl font-black text-cyan-600 dark:text-cyan-400 mt-3">{statistics.industriesServed}+</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-2">Serving enterprises globally from USA, Europe, Southeast Asia, and Australia.</p>
              </div>

              {/* Large bento card */}
              <div className="md:col-span-8 bg-slate-900 dark:bg-[#141414] text-white rounded-2xl border border-slate-800 dark:border-neutral-700 p-6 hover:shadow-lg transition flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">Repeat Clients</span>
                  <h3 className="text-2xl font-bold tracking-tight">4 Out of 5 Clients Partner Long Term</h3>
                  <p className="text-xs text-slate-400 max-w-sm">Our dedication to surgical engineering and continuous technical maintenance means clients stay with us forever.</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-center">
                  <span className="text-3xl font-black text-cyan-400 block">85%</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Repeat Ratio</span>
                </div>
              </div>

              {/* Small bento card */}
              <div className="md:col-span-4 bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 hover:shadow-md transition flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">SLA Response Time</span>
                <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-3">&lt; 15 Minutes</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Surgical response times across Slack, WhatsApp and direct developer channels.</p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 03. FEATURED CLIENT STORIES (CASE STUDIES) */}
      {sectionVisibility.stories && stories.length > 0 && (
        <section id="success-stories-section" className="py-20 bg-slate-50 dark:bg-[#0c0c0c]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">03. PROVEN CASE STORIES</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'Our Architectural Impact' : 'আমাদের প্রজেক্ট কেস স্টাডি সমূহ'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
              
              {/* Rail selectors */}
              <div className="lg:col-span-4 space-y-3">
                {stories.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => { setActiveStoryIdx(idx); setStoryTab('challenge'); }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col space-y-1 ${
                      activeStoryIdx === idx 
                        ? 'border-orange-500 bg-white dark:bg-[#1a1a1a] shadow-md' 
                        : 'border-slate-200 dark:border-neutral-700 bg-slate-100/50 dark:bg-[#141414] hover:border-slate-300 dark:hover:border-neutral-600 text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-orange-400">{story.industryEn}</span>
                    <span className="font-bold text-slate-950 dark:text-white text-sm">{story.companyName}</span>
                    <span className="text-[11px] leading-relaxed">{story.serviceEn}</span>
                  </button>
                ))}
              </div>

              {/* Active Story Details */}
              <div className="lg:col-span-8 bg-white dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 sm:p-8 shadow-sm space-y-6">
                {(() => {
                  const s = stories[activeStoryIdx];
                  if (!s) return null;
                  return (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-700 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{s.companyName}</h3>
                          <span className="text-xs text-blue-600 dark:text-orange-400 font-semibold">{s.serviceEn}</span>
                        </div>
                        <span className="rounded-lg bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 px-3 py-1 text-xs text-slate-500 dark:text-neutral-400 font-medium">
                          <strong>Timeline:</strong> {s.timelineEn}
                        </span>
                      </div>

                      {/* Before / After toggle comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase">Legacy Interface (Before)</span>
                          <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video group">
                            <img src={s.beforeImage} alt="" className="w-full h-full object-cover grayscale opacity-80" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase">Next Solution (After Launch)</span>
                          <div className="relative rounded-xl overflow-hidden border border-blue-400 aspect-video group">
                            <img src={s.afterImage} alt="" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>

                      {/* Case details Tab controls */}
                      <div className="space-y-4">
                        <div className="flex border-b border-slate-100">
                          {['challenge', 'solution', 'results'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setStoryTab(tab as any)}
                              className={`px-4 py-2 text-xs font-bold border-b-2 capitalize transition ${
                                storyTab === tab 
                                  ? 'border-blue-600 text-blue-600 dark:text-orange-400 font-extrabold' 
                                  : 'border-transparent text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[50px]">
                          {storyTab === 'challenge' && (
                            <p><strong>The Challenge:</strong> {s.challengeEn}</p>
                          )}
                          {storyTab === 'solution' && (
                            <div className="space-y-2">
                              <p><strong>The Solution:</strong> {s.solutionEn}</p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {s.technologies?.map(tech => (
                                  <span key={tech} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">{tech}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {storyTab === 'results' && (
                            <p><strong>The Result Metrics:</strong> {s.resultsEn}</p>
                          )}
                        </div>
                      </div>

                      {/* Quote card */}
                      <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-3">
                        <p className="text-xs sm:text-sm italic text-slate-600 leading-relaxed">"{s.clientQuoteEn}"</p>
                        <div className="flex items-center space-x-2.5">
                          <img src={s.clientPhoto} alt="" className="h-8 w-8 rounded-full object-cover" />
                          <div>
                            <span className="block text-xs font-bold text-slate-900">{s.clientName}</span>
                            <span className="text-[10px] text-slate-400 dark:text-neutral-500">{s.clientRoleEn}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 04. VIDEO TESTIMONIALS */}
      {sectionVisibility.videos && videos.length > 0 && (
        <section id="reviews-videos" className="py-20 bg-white dark:bg-[#0a0a0a]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">04. VIDEO DELIVERABLES</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'Client Experiences on Video' : 'ভিডিও জবানবন্দিতে গ্রাহক প্রতিক্রিয়া'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {videos.map((vid) => (
                <div key={vid.id} className="rounded-2xl border border-slate-150 bg-slate-50/50 p-4 space-y-4 shadow-sm hover:shadow-md transition">
                  {/* Aspect video container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 group">
                    <img src={vid.thumbnailUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center transition group-hover:bg-slate-950/40">
                      <button
                        onClick={() => setActiveVideoUrl(vid.videoUrl)}
                        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      >
                        <Play className="h-6 w-6 fill-white ml-0.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex space-x-0.5">
                      {Array.from({ length: vid.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{vid.titleEn}</h4>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">{vid.shortDescriptionEn}</p>
                    <div className="flex items-center space-x-2.5 pt-3 border-t border-slate-100 mt-2">
                      <img src={vid.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                      <div>
                        <span className="block text-xs font-bold text-slate-900">{vid.clientName}</span>
                        <span className="text-[10px] text-slate-400 dark:text-neutral-500">{vid.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Lightbox Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl">
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe 
              src={activeVideoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 05 & 06. TESTIMONIALS WALL WITH FILTER SYSTEM */}
      {sectionVisibility.wall && (
        <section id="reviews-feed-section" className="py-20 bg-slate-50/75 dark:bg-[#0c0c0c]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">05 & 06. VERIFIED LOGS FEED</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'Unfiltered Client Feedback Wall' : 'সকল যাচাইকৃত গ্রাহকদের মতামত প্রাচীর'}
              </h2>
            </div>

            {/* Premium Interactive Filters Box */}
            <div className="rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-4 bg-white dark:bg-[#141414] shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Searching */}
              <div className="relative w-full md:w-72">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={currentLang === 'en' ? 'Search client reviews...' : 'রিভিউ খুঁজুন...'}
                  className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 pl-9 pr-3 py-1.5 text-xs focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
                />
              </div>

              {/* Filtering Chips */}
              <div className="flex flex-wrap gap-2 items-center w-full md:w-auto justify-center md:justify-end">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs bg-white dark:bg-[#1a1a1a] focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 font-semibold text-slate-600 dark:text-neutral-300"
                >
                  <option value="all">{currentLang === 'en' ? 'All Services' : 'সকল সার্ভিস'}</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{currentLang === 'en' ? c.nameEn : c.nameBn}</option>
                  ))}
                  <option value="enterprise">{currentLang === 'en' ? 'Enterprise' : 'এন্টারপ্রাইজ'}</option>
                  <option value="startup">{currentLang === 'en' ? 'Startup' : 'স্টার্টআপ'}</option>
                </select>

                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs bg-white dark:bg-[#1a1a1a] focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 font-semibold text-slate-600 dark:text-neutral-300"
                >
                  <option value="all">{currentLang === 'en' ? 'All Ratings' : 'সকল রেটিং'}</option>
                  <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                  <option value="3">⭐⭐⭐ (3 Stars)</option>
                </select>

                <button
                  onClick={() => {
                    setShowForm(true);
                    setTimeout(() => {
                      document.getElementById('review-form-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 120);
                  }}
                  className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 text-xs font-bold transition shadow-sm"
                >
                  {currentLang === 'en' ? '+ Write Review' : '+ রিভিউ লিখুন'}
                </button>
              </div>

            </div>

            {/* Masonry-Style Columns layout */}
            {filteredTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredTestimonials.map((t) => (
                  <div 
                    key={t.id}
                    className="rounded-2xl border border-slate-150 dark:border-neutral-700/60 bg-white dark:bg-[#141414] p-5 flex flex-col justify-between space-y-4 hover:border-orange-400 dark:hover:border-orange-500/60 hover:shadow-md transition duration-300"
                  >
                    <div className="space-y-3">
                      
                      {/* Rating and Verification icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-0.5">
                          {Array.from({ length: t.rating }).map((_, idx) => (
                            <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        {t.isVerified && (
                          <span className="inline-flex items-center space-x-1 text-[10px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 border border-emerald-100 dark:border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      {/* Content text */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed italic">
                        "{currentLang === 'en' ? t.feedbackEn : t.feedbackBn}"
                      </p>
                    </div>

                    {/* Client info and flag */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-neutral-700 mt-2">
                      <div className="flex items-center space-x-2.5">
                        <img src={t.avatar} alt="" className="h-8 w-8 rounded-full object-cover border border-slate-150 dark:border-neutral-600" />
                        <div>
                          <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {t.name}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-neutral-500">{t.roleEn} at <strong className="text-slate-600 dark:text-neutral-300">{t.company}</strong></span>
                        </div>
                      </div>
                      <span className="text-sm" title={t.country || 'USA'}>{t.countryFlag || '🇺🇸'}</span>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-8 text-center max-w-md mx-auto space-y-2">
                <span className="text-3xl">🔍</span>
                <h4 className="font-bold text-slate-900 dark:text-white">No matching reviews found</h4>
                <p className="text-xs text-slate-500 dark:text-neutral-400">Try adjusting your filters, selecting "All Services", or resetting the search string query.</p>
              </div>
            )}

          </div>
        </section>
      )}

      {/* 07. REVIEW STATISTICS (ANALYTICS) */}
      {sectionVisibility.wall && (
        <section id="review-statistics-section" className="py-20 bg-white dark:bg-[#0c0c0c]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">07. RATING DENSITY ANALYSIS</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Verified Rating Distribution</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Independent rating percentages calculated directly across all verified digital project handovers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-[#141414] border border-slate-150 dark:border-neutral-700/60 p-6 rounded-2xl">
              
              {/* Left numeric summary */}
              <div className="md:col-span-4 text-center space-y-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight block">4.91</span>
                <div className="flex justify-center space-x-0.5">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-xs font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block pt-1">{totalReviewsCount} Total Reviews</span>
              </div>

              {/* Right distribution list */}
              <div className="md:col-span-8 space-y-2.5">
                {ratingDistribution.map((dist) => (
                  <div key={dist.stars} className="flex items-center space-x-3 text-xs font-medium text-slate-600">
                    <span className="w-12 font-bold text-slate-700 dark:text-neutral-300">{dist.stars} Stars</span>
                    <div className="flex-1 h-3.5 bg-slate-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dist.percentage}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-amber-400 rounded-full"
                      />
                    </div>
                    <span className="w-10 text-right font-bold text-slate-900 dark:text-white">{dist.percentage}%</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 07. CLIENT MOMENTS SECTIONS */}
      {sectionVisibility.clientMoments && moments.length > 0 && (
        <section id="client-moments-section" className="py-24 bg-slate-50 dark:bg-[#0c0c0c] relative overflow-hidden">
          {/* Decorative ambient gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-orange-500/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 dark:bg-orange-500/5 rounded-full blur-3xl -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest bg-blue-50 dark:bg-orange-500/10 px-3 py-1 rounded-full inline-block">
                07. CLIENT MOMENTS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'Partnerships Built on Real Connections' : 'বাস্তব সম্পর্কের ওপর গড়ে ওঠা পার্টনারশিপ'}
              </h2>
              <p className="text-slate-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                {currentLang === 'en' 
                  ? 'Glimpses of project handovers, live strategy sessions, and celebratory milestones with our global client partners.' 
                  : 'বিশ্বব্যাপী ক্লায়েন্ট পার্টনারদের সাথে প্রজেক্ট হ্যান্ডওভার, লাইভ স্ট্র্যাটেজি সেশন এবং সফল মাইলফলক উদযাপনের কিছু বাস্তব চিত্র।'}
              </p>
            </div>

            {/* Moments Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {moments.filter(m => m.visible !== false).map((moment, idx) => (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-neutral-700/60 overflow-hidden shadow-sm hover:shadow-xl transition duration-500 flex flex-col justify-between"
                >
                  {/* Photo container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-neutral-800">
                    <img 
                      src={moment.imageUrl} 
                      alt={currentLang === 'en' ? moment.titleEn : moment.titleBn} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                    />
                    {/* Visual gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-500" />
                    
                    {/* Client badge */}
                    {moment.company && (
                      <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-[#0D0D0D]/95 text-slate-900 px-2.5 py-1 rounded-full shadow-sm backdrop-blur">
                        {moment.company}
                      </span>
                    )}
                  </div>

                  {/* Text details */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-orange-600 transition duration-300 line-clamp-1">
                        {currentLang === 'en' ? moment.titleEn : (moment.titleBn || moment.titleEn)}
                      </h3>
                      {moment.descriptionEn && (
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                          {currentLang === 'en' ? moment.descriptionEn : (moment.descriptionBn || moment.descriptionEn)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-neutral-700 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-orange-500/15 flex items-center justify-center text-xs font-bold text-blue-700">
                          {moment.clientName.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-neutral-200 truncate max-w-[150px]">
                          {moment.clientName}
                        </span>
                      </div>
                      {moment.company && (
                        <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 bg-slate-50 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                          {moment.company}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 09. WHY CLIENTS LOVE US (INTERACTIVE BENTO GRID) */}
      {sectionVisibility.whyUs && (
        <section id="why-clients-love-us" className="py-20 bg-white dark:bg-[#141414]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">09. SURGICAL WORKSTANDARDS</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'Why Progressive Teams Choose Us' : 'কেন প্রগ্রেসিভ টিমগুলো আমাদের বেছে নেয়'}
              </h2>
            </div>

            {/* Interactive Bento grid pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              
              <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 space-y-3 hover:shadow-md transition">
                <div className="h-10 w-10 bg-blue-100 dark:bg-orange-500/15 rounded-xl text-blue-700 flex items-center justify-center text-lg font-bold">💬</div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Honest Communication</h4>
                <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">Daily async updates, direct Slack channel access, and transparent weekly design milestone sign-offs.</p>
              </div>

              <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 space-y-3 hover:shadow-md transition">
                <div className="h-10 w-10 bg-indigo-100 rounded-xl text-indigo-700 flex items-center justify-center text-lg font-bold">🏆</div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Pristine Design Quality</h4>
                <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">No templates. We build bespoke UI designs inspired by world-renowned standards (Stripe, Vercel, Linear).</p>
              </div>

              <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 space-y-3 hover:shadow-md transition">
                <div className="h-10 w-10 bg-cyan-100 rounded-xl text-cyan-700 flex items-center justify-center text-lg font-bold">⚡</div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Sprint-Based Execution</h4>
                <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">Agile development sprints. We deliver early MVPs within 15 days, maintaining strict zero-lag code standards.</p>
              </div>

              <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-6 space-y-3 hover:shadow-md transition">
                <div className="h-10 w-10 bg-emerald-100 rounded-xl text-emerald-700 flex items-center justify-center text-lg font-bold">🤝</div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Open Transparencies</h4>
                <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">Complete transparent pricing packages, open GitHub repository handovers, and clear contract terms.</p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 10 & 12. GLOBAL CLIENT MAP & CLIENT ACHIEVEMENTS (IMPORTED VISUALS) */}
      <section className="py-20 bg-slate-50 dark:bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialsVisuals currentLang={currentLang} />
        </div>
      </section>

      {/* 11. GOOGLE REVIEW STYLE SECTION */}
      {sectionVisibility.googleReviews && (
        <section id="google-reviews-section" className="py-20 bg-white dark:bg-[#141414]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">11. GOOGLE MAPS STYLE REVIEWS</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'Verified Google Mapping Reviews' : 'গুগল ম্যাপ স্টাইল ভেরিফাইড রিভিউ'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              <div className="rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-5 bg-slate-50/50 dark:bg-[#141414] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">G</span>
                    <div>
                      <span className="block text-xs font-black text-slate-900 dark:text-white">Sarah Jenkins</span>
                      <span className="text-[10px] text-slate-400 dark:text-neutral-500">Verified Google User • 2 months ago</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-500/20">Highly Recommended</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed italic">
                  "Next Solution redesigned our entire fintech dashboard. They completed everything 3 weeks ahead of schedule and our site load speed metrics blew past competitors."
                </p>
                
                {/* Helpful button and official response */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-neutral-500 border-t border-slate-150 dark:border-neutral-700 pt-3">
                  <button 
                    onClick={() => handleHelpfulIncrement('google-1')}
                    className={`flex items-center space-x-1 font-bold ${helpfulClicked['google-1'] ? 'text-blue-600 dark:text-orange-400' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>Helpful ({helpfulRatings['google-1'] || 12})</span>
                  </button>
                  <span>Like count: 42</span>
                </div>

                <div className="bg-white dark:bg-[#141414] rounded-xl border border-slate-150 dark:border-neutral-700/60 p-3 text-[11px] text-slate-600 dark:text-neutral-300 space-y-1">
                  <strong className="block text-slate-900">Response from Next Solution (Owner):</strong>
                  <p className="leading-relaxed">"Thank you so much Sarah! Our senior solutions engineers loved collaborating on Fintech Spark's flat-compiled design framework. Excited for our long-term SLA support!"</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-150 dark:border-neutral-700/60 p-5 bg-slate-50/50 dark:bg-[#141414] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">G</span>
                    <div>
                      <span className="block text-xs font-black text-slate-900 dark:text-white">David Chen</span>
                      <span className="text-[10px] text-slate-400 dark:text-neutral-500">Verified Google User • 3 months ago</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-500/20">Highly Recommended</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed italic">
                  "Sora Web3 Labs conversion metrics surged by 42% on the first week following Next Solution re-branding launch. Their Figma design system audit is unmatched."
                </p>
                
                {/* Helpful button and response */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-neutral-500 border-t border-slate-150 dark:border-neutral-700 pt-3">
                  <button 
                    onClick={() => handleHelpfulIncrement('google-2')}
                    className={`flex items-center space-x-1 font-bold ${helpfulClicked['google-2'] ? 'text-blue-600 dark:text-orange-400' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>Helpful ({helpfulRatings['google-2'] || 8})</span>
                  </button>
                  <span>Like count: 28</span>
                </div>

                <div className="bg-white dark:bg-[#141414] rounded-xl border border-slate-150 dark:border-neutral-700/60 p-3 text-[11px] text-slate-600 dark:text-neutral-300 space-y-1">
                  <strong className="block text-slate-900">Response from Next Solution (Owner):</strong>
                  <p className="leading-relaxed">"Awesome David! Simplifying decentralized structures into elegant onboarding screens is exactly what our design sprint framework aims to achieve."</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 13. REVIEW SUBMISSION CTA & DRAWER FORM */}
      {sectionVisibility.submissionCta && (
        <section id="review-submission-drawer" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl -z-10"></div>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-8 relative z-10">
            
            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {currentLang === 'en' ? 'Ready To Become Our Next Success Story?' : 'পরবর্তী সফলতার গল্প হতে প্রস্তুত?'}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                Join 20+ global corporate brands and scale your digital experience with custom engineering solutions. Tell us about your project or submit your verified review of our work today.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                }}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition shadow-lg shadow-blue-600/20"
              >
                {showForm ? 'Close Form Portal' : '✍️ Write Client Review'}
              </button>
              <button
                onClick={() => setTab('contact')}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition"
              >
                Request Custom Quote
              </button>
            </div>

            {/* Dynamic Submission Drawer */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#141414] text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-neutral-700 p-8 sm:p-10 text-left shadow-2xl max-w-4xl mx-auto mt-10 relative overflow-hidden"
                >
                  {/* Anchor for smooth scroll target */}
                  <div id="review-form-anchor" className="absolute -top-12" />

                  {/* Decorative background gradients for the form */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/40 rounded-full blur-2xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/40 dark:bg-orange-500/5 rounded-full blur-2xl -z-10" />

                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-700 pb-5 mb-6">
                    <div className="space-y-1">
                      <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white flex items-center space-x-2">
                        <span className="p-2 bg-amber-100 rounded-xl inline-flex">
                          <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </span>
                        <span>{currentLang === 'en' ? 'Submit Your Verified Client Feedback' : 'প্রজেক্টের তথ্য ও রিভিউ জমা দিন'}</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400">
                        {currentLang === 'en' ? 'Share your real-world experience, delivery milestones, and results.' : 'আপনার প্রজেক্টের ডেলিভারি সময়, ডিজাইনের গুণমান এবং ব্যবসার প্রবৃদ্ধির বাস্তব অভিজ্ঞতা শেয়ার করুন।'}
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowForm(false)} 
                      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-300 transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {formSuccess ? (
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 rounded-3xl p-10 text-center space-y-4 max-w-xl mx-auto">
                      <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto text-3xl font-bold animate-bounce">
                        <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="font-display font-black text-xl text-emerald-950 dark:text-emerald-300">
                        {currentLang === 'en' ? 'Review Received Successfully!' : 'রিভিউটি সফলভাবে জমা হয়েছে!'}
                      </h4>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
                        {currentLang === 'en' 
                          ? 'Thank you for sharing your experience. If vetting settings are active, our team will verify the project credentials and banking/milestone logs before publishing to the live wall.' 
                          : 'ধন্যবাদ আপনার মূল্যবান মতামত শেয়ার করার জন্য। রিভিউটি যাচাইয়ের পর দ্রুতই তা ওয়েবসাইটে প্রকাশ করা হবে।'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      
                      {/* Section 1: Professional Profile */}
                      <div className="space-y-4">
                        <span className="text-[11px] font-black text-blue-600 dark:text-orange-400 uppercase tracking-widest block border-b border-blue-50 dark:border-neutral-800 pb-1">
                          01. {currentLang === 'en' ? 'Your Professional Profile' : 'আপনার পেশাগত প্রোফাইল'}
                        </span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                            <input 
                              type="text" required value={name} onChange={e => setName(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:focus:border-orange-500 dark:focus:ring-orange-500/20 focus:outline-none transition"
                              placeholder="e.g. Sajid Rahman"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Work Email (Verified for project check) *</label>
                            <input 
                              type="email" required value={email} onChange={e => setEmail(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:focus:border-orange-500 dark:focus:ring-orange-500/20 focus:outline-none transition"
                              placeholder="e.g. sajid@apexfashion.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Company Name *</label>
                            <input 
                              type="text" required value={company} onChange={e => setCompany(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:focus:border-orange-500 dark:focus:ring-orange-500/20 focus:outline-none transition"
                              placeholder="e.g. Apex Fashion Group"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Your Corporate Role *</label>
                            <input 
                              type="text" required value={roleEn} onChange={e => setRoleEn(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:focus:border-orange-500 dark:focus:ring-orange-500/20 focus:outline-none transition"
                              placeholder="e.g. Chief Executive Officer"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Industry Sector</label>
                            <input 
                              type="text" value={industry} onChange={e => setIndustry(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:focus:border-orange-500 dark:focus:ring-orange-500/20 focus:outline-none transition"
                              placeholder="e.g. Apparel & Fashion"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Avatar & Rating */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        
                        {/* Interactive Stars */}
                        <div className="space-y-3 bg-slate-50 dark:bg-[#141414] p-4 rounded-2xl border border-slate-100 dark:border-neutral-700/60">
                          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider">
                            {currentLang === 'en' ? 'Project Rating Score *' : 'প্রজেক্ট রেটিং স্কোর *'}
                          </label>
                          <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="p-1 hover:scale-115 transition duration-150 transform"
                              >
                                <Star 
                                  className={`h-8 w-8 ${
                                    star <= rating 
                                      ? 'fill-amber-400 text-amber-400 filter drop-shadow' 
                                      : 'text-slate-300 dark:text-neutral-600 hover:text-amber-300 dark:hover:text-amber-400'
                                  }`} 
                                />
                              </button>
                            ))}
                            <span className="text-xs font-extrabold text-slate-700 dark:text-neutral-200 ml-3 bg-white dark:bg-[#141414] px-2.5 py-1 rounded-md border border-slate-200 dark:border-neutral-700 shadow-sm">
                              {rating} / 5.0
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block italic">
                            {rating === 5 ? 'Excellent partnership! Blew expectations.' : rating === 4 ? 'Great work, highly satisfied.' : 'Good experience, room for improvements.'}
                          </span>
                        </div>

                        {/* Profile Photo selector */}
                        <div className="space-y-3 bg-slate-50 dark:bg-[#141414] p-4 rounded-2xl border border-slate-100 dark:border-neutral-700/60">
                          <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider">
                            {currentLang === 'en' ? 'Select Profile Accent' : 'প্রোফাইল ছবি নির্বাচন করুন'}
                          </label>
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-1">
                              {[
                                { url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=150', id: 'p1' },
                                { url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=150', id: 'p2' },
                                { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=150', id: 'p3' },
                                { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', id: 'p4' },
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setAvatarUrl(item.url)}
                                  className={`h-9 w-9 rounded-full overflow-hidden border-2 transition z-10 hover:z-20 ${
                                    avatarUrl === item.url ? 'border-orange-500 scale-110 ring-2 ring-orange-500/20' : 'border-white dark:border-neutral-700 hover:scale-105'
                                  }`}
                                >
                                  <img src={item.url} alt="" className="h-full w-full object-cover" />
                                </button>
                              ))}
                            </div>
                            <input 
                              type="text" 
                              value={avatarUrl} 
                              onChange={e => setAvatarUrl(e.target.value)}
                              placeholder="Or paste image URL link..."
                              className="flex-1 rounded-xl border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none placeholder-gray-400 dark:placeholder-neutral-500"
                            />
                          </div>
                        </div>

                      </div>

                      {/* Section 3: Detailed Feedback */}
                      <div className="space-y-4 pt-2">
                        <span className="text-[11px] font-black text-blue-600 dark:text-orange-400 uppercase tracking-widest block border-b border-blue-50 dark:border-neutral-800 pb-1">
                          02. {currentLang === 'en' ? 'Detailed Partnership Feedback' : 'ডিটেইলড প্রজেক্ট ফিডব্যাক'}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Feedback Content (English) *</label>
                            <textarea 
                              required rows={4} value={feedbackEn} onChange={e => setFeedbackEn(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:focus:border-orange-500 dark:focus:ring-orange-500/20 focus:outline-none transition leading-relaxed resize-none"
                              placeholder="Express project speed, design quality, specific frameworks used, communication efficiency, and core outcomes..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 dark:border-neutral-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-2 text-slate-400 dark:text-neutral-500">
                          <Lock className="h-4 w-4 text-slate-300" />
                          <span className="text-[10px] leading-tight">
                            Your feedback is protected by AES corporate encryption logs. Verified published reviews undergo strict KYC project check.
                          </span>
                        </div>
                        
                        <div className="flex space-x-3 w-full sm:w-auto">
                          <button 
                            type="button" 
                            onClick={() => setShowForm(false)}
                            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-bold transition text-center"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition shadow-md shadow-orange-600/20 hover:shadow-lg hover:shadow-orange-600/30 transform active:scale-95"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>

                    </form>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>
      )}

      {/* 14. FAQ ACCORDIONS */}
      {sectionVisibility.faq && faqs.length > 0 && (
        <section id="faq-section" className="py-20 bg-white dark:bg-[#0a0a0a]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest">14. FAQ ASSURANCE</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentLang === 'en' ? 'Frequently Asked Questions' : 'সাধারণ জিজ্ঞাসা সমূহ'}
              </h2>
            </div>

            <div className="space-y-3.5 max-w-2xl mx-auto">
              {faqs.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div key={faq.id} className="rounded-xl border border-slate-150 dark:border-neutral-700/60 overflow-hidden bg-slate-50/50 dark:bg-[#141414] hover:bg-white dark:hover:bg-[#1a1a1a] transition">
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                    >
                      <span>{currentLang === 'en' ? faq.questionEn : faq.questionBn}</span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600 dark:text-orange-400' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden border-t border-slate-100 dark:border-neutral-700"
                        >
                          <p className="p-4 text-xs text-slate-500 dark:text-neutral-400 leading-relaxed bg-white dark:bg-[#141414]">
                            {currentLang === 'en' ? faq.answerEn : faq.answerBn}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* RENDER ADMIN DASHBOARD DRAWER SLIDER */}
      <TestimonialsAdmin
        currentLang={currentLang}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataChanged={loadData}
      />

    </div>
  );
}
