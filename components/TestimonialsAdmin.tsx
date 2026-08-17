"use client";
import React, { useState, useEffect } from 'react';
import { 
  X, Check, Trash2, Edit2, Plus, Sparkles, Settings, Eye, EyeOff, 
  Layers, Video, BarChart2, MessageSquare, AlertCircle, RefreshCw, Globe, HelpCircle, Camera
} from 'lucide-react';
import { 
  getTestimonials, saveTestimonial, deleteTestimonial,
  getTestimonialCategories, saveTestimonialCategory, deleteTestimonialCategory,
  getTestimonialVideos, saveTestimonialVideo, deleteTestimonialVideo,
  getTestimonialStatistics, saveTestimonialStatistics,
  getClientLogos, saveClientLogo, deleteClientLogo,
  getSuccessStories, saveSuccessStory, deleteSuccessStory,
  getReviewSettings, saveReviewSettings, getFAQs, saveFAQ, deleteFAQ,
  getClientMoments, saveClientMoment, deleteClientMoment
} from '@/lib/db';
import { getLocalItem, setLocalItem } from '@/lib/utils';
import { Testimonial, TestimonialCategory, TestimonialVideo, SuccessStory, ClientLogo, ReviewSettings, FAQ, ClientMoment } from '@/types';

interface TestimonialsAdminProps {
  currentLang: 'en' | 'bn';
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

type AdminTab = 'reviews' | 'stories' | 'videos' | 'client-moments' | 'stats-logos' | 'settings' | 'faqs';

export default function TestimonialsAdmin({ currentLang, isOpen, onClose, onDataChanged }: TestimonialsAdminProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('reviews');

  // DB Lists
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [categories, setCategories] = useState<TestimonialCategory[]>([]);
  const [videos, setVideos] = useState<TestimonialVideo[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [reviewSettings, setReviewSettings] = useState<ReviewSettings | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [moments, setMoments] = useState<ClientMoment[]>([]);

  // Editing state variables
  const [editingReview, setEditingReview] = useState<Partial<Testimonial> | null>(null);
  const [editingStory, setEditingStory] = useState<Partial<SuccessStory> | null>(null);
  const [editingVideo, setEditingVideo] = useState<Partial<TestimonialVideo> | null>(null);
  const [editingLogo, setEditingLogo] = useState<Partial<ClientLogo> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);
  const [editingMoment, setEditingMoment] = useState<Partial<ClientMoment> | null>(null);

  // Section Visibility Settings (Stored in LocalStorage)
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = () => {
    setTestimonials(getTestimonials());
    setCategories(getTestimonialCategories());
    setVideos(getTestimonialVideos());
    setStories(getSuccessStories());
    setLogos(getClientLogos());
    setStats(getTestimonialStatistics());
    setReviewSettings(getReviewSettings());
    setFaqs(getFAQs());
    setMoments(getClientMoments());

    // Load section visibility
    const storedVisibility = getLocalItem('next_solution_sections_visibility');
    if (storedVisibility) {
      setSectionVisibility(JSON.parse(storedVisibility));
    } else {
      const defaultVisibility = {
        hero: true,
        overview: true,
        stories: true,
        videos: true,
        wall: true,
        clientMoments: true,
        logos: true,
        whyUs: true,
        map: true,
        googleReviews: true,
        achievements: true,
        submissionCta: true,
        faq: true,
      };
      setLocalItem('next_solution_sections_visibility', JSON.stringify(defaultVisibility));
      setSectionVisibility(defaultVisibility);
    }
  };

  const handleToggleSection = (sectionKey: string) => {
    const updated = { ...sectionVisibility, [sectionKey]: !sectionVisibility[sectionKey] };
    setSectionVisibility(updated);
    setLocalItem('next_solution_sections_visibility', JSON.stringify(updated));
    onDataChanged();
  };

  // REVIEWS CRUD
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    const formatted: Testimonial = {
      id: editingReview.id || `review-${Date.now()}`,
      name: editingReview.name || 'Anonymous Client',
      roleEn: editingReview.roleEn || 'Tech Founder',
      roleBn: editingReview.roleBn || 'টেক ফাউন্ডার',
      company: editingReview.company || 'Enterprise Corp',
      feedbackEn: editingReview.feedbackEn || '',
      feedbackBn: editingReview.feedbackBn || editingReview.feedbackEn || '',
      rating: editingReview.rating || 5,
      avatar: editingReview.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      country: editingReview.country || 'United States',
      countryFlag: editingReview.countryFlag || '🇺🇸',
      industry: editingReview.industry || 'Technology',
      category: editingReview.category || 'web-development',
      isVerified: editingReview.isVerified !== undefined ? editingReview.isVerified : true,
      featured: editingReview.featured !== undefined ? editingReview.featured : false,
      status: editingReview.status || 'approved',
      createdAt: editingReview.createdAt || new Date().toISOString()
    };

    saveTestimonial(formatted);
    setEditingReview(null);
    loadAllData();
    onDataChanged();
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteTestimonial(id);
      loadAllData();
      onDataChanged();
    }
  };

  const handleApproveToggle = (review: Testimonial) => {
    const updated: Testimonial = {
      ...review,
      status: review.status === 'approved' ? 'pending' : 'approved'
    };
    saveTestimonial(updated);
    loadAllData();
    onDataChanged();
  };

  const handleFeatureToggle = (review: Testimonial) => {
    const updated: Testimonial = {
      ...review,
      featured: !review.featured
    };
    saveTestimonial(updated);
    loadAllData();
    onDataChanged();
  };

  // STORIES CRUD
  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    const formatted: SuccessStory = {
      id: editingStory.id || `story-${Date.now()}`,
      clientName: editingStory.clientName || 'Lead Client',
      companyName: editingStory.companyName || 'Global Brand',
      industryEn: editingStory.industryEn || 'SaaS',
      industryBn: editingStory.industryBn || 'SaaS',
      serviceEn: editingStory.serviceEn || 'Full-Stack Development',
      serviceBn: editingStory.serviceBn || 'ফুল-স্ট্যাক ডেভেলপমেন্ট',
      backgroundEn: editingStory.backgroundEn || '',
      backgroundBn: editingStory.backgroundBn || '',
      challengeEn: editingStory.challengeEn || '',
      challengeBn: editingStory.challengeBn || '',
      solutionEn: editingStory.solutionEn || '',
      solutionBn: editingStory.solutionBn || '',
      technologies: editingStory.technologies || ['React', 'Next.js', 'Tailwind'],
      timelineEn: editingStory.timelineEn || '8 Weeks',
      timelineBn: editingStory.timelineBn || '৮ সপ্তাহ',
      resultsEn: editingStory.resultsEn || '',
      resultsBn: editingStory.resultsBn || '',
      beforeImage: editingStory.beforeImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      afterImage: editingStory.afterImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      clientQuoteEn: editingStory.clientQuoteEn || '',
      clientQuoteBn: editingStory.clientQuoteBn || '',
      clientRoleEn: editingStory.clientRoleEn || 'VP of Engineering',
      clientRoleBn: editingStory.clientRoleBn || 'ইঞ্জিনিয়ারিং ভিপি',
      clientPhoto: editingStory.clientPhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      featured: editingStory.featured !== undefined ? editingStory.featured : true
    };

    saveSuccessStory(formatted);
    setEditingStory(null);
    loadAllData();
    onDataChanged();
  };

  const handleDeleteStory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      deleteSuccessStory(id);
      loadAllData();
      onDataChanged();
    }
  };

  // VIDEOS CRUD
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    const formatted: TestimonialVideo = {
      id: editingVideo.id || `video-${Date.now()}`,
      titleEn: editingVideo.titleEn || '',
      titleBn: editingVideo.titleBn || '',
      clientName: editingVideo.clientName || 'Client Name',
      company: editingVideo.company || 'Enterprise Inc',
      avatar: editingVideo.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      rating: editingVideo.rating || 5,
      videoUrl: editingVideo.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: editingVideo.thumbnailUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
      shortDescriptionEn: editingVideo.shortDescriptionEn || '',
      shortDescriptionBn: editingVideo.shortDescriptionBn || '',
      featured: editingVideo.featured !== undefined ? editingVideo.featured : true
    };

    saveTestimonialVideo(formatted);
    setEditingVideo(null);
    loadAllData();
    onDataChanged();
  };

  const handleDeleteVideo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this video review?')) {
      deleteTestimonialVideo(id);
      loadAllData();
      onDataChanged();
    }
  };

  // CLIENT MOMENTS CRUD
  const handleSaveMoment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMoment) return;

    const formatted: ClientMoment = {
      id: editingMoment.id || `moment-${Date.now()}`,
      titleEn: editingMoment.titleEn || '',
      titleBn: editingMoment.titleBn || '',
      clientName: editingMoment.clientName || 'Client Name',
      company: editingMoment.company || '',
      imageUrl: editingMoment.imageUrl || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
      descriptionEn: editingMoment.descriptionEn || '',
      descriptionBn: editingMoment.descriptionBn || '',
      displayOrder: editingMoment.displayOrder !== undefined ? Number(editingMoment.displayOrder) : 1,
      visible: editingMoment.visible !== undefined ? editingMoment.visible : true
    };

    saveClientMoment(formatted);
    setEditingMoment(null);
    loadAllData();
    onDataChanged();
  };

  const handleDeleteMoment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client moment?')) {
      deleteClientMoment(id);
      loadAllData();
      onDataChanged();
    }
  };

  // FAQS CRUD
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    const formatted: FAQ = {
      id: editingFaq.id || `faq-${Date.now()}`,
      categoryEn: editingFaq.categoryEn || 'General',
      categoryBn: editingFaq.categoryBn || 'সাধারণ',
      questionEn: editingFaq.questionEn || '',
      questionBn: editingFaq.questionBn || '',
      answerEn: editingFaq.answerEn || '',
      answerBn: editingFaq.answerBn || '',
      helpfulCount: editingFaq.helpfulCount || 0
    };

    saveFAQ(formatted);
    setEditingFaq(null);
    loadAllData();
    onDataChanged();
  };

  const handleDeleteFaq = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      deleteFAQ(id);
      loadAllData();
      onDataChanged();
    }
  };

  // STATS & LOGOS SAVE
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stats) return;
    saveTestimonialStatistics(stats);
    alert('Statistics updated successfully!');
    onDataChanged();
  };

  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLogo) return;

    const formatted: ClientLogo = {
      id: editingLogo.id || `logo-${Date.now()}`,
      name: editingLogo.name || 'Brand Logo',
      logoUrl: editingLogo.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
      featured: editingLogo.featured !== undefined ? editingLogo.featured : true,
      displayOrder: editingLogo.displayOrder || 1
    };

    saveClientLogo(formatted);
    setEditingLogo(null);
    loadAllData();
    onDataChanged();
  };

  const handleDeleteLogo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this logo?')) {
      deleteClientLogo(id);
      loadAllData();
      onDataChanged();
    }
  };

  // REVIEW SETTINGS SAVE
  const handleSaveReviewSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewSettings) return;
    saveReviewSettings(reviewSettings);
    alert('Verification rules & public submission permissions updated!');
    onDataChanged();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex justify-end animate-fadeIn">
      <div className="w-full max-w-5xl bg-white dark:bg-[#141414] dark:bg-[#141414] min-h-screen shadow-2xl flex flex-col border-l border-slate-200 dark:border-neutral-700">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
              <Settings className="h-5 w-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg tracking-tight flex items-center">
                Next Solution Admin Dashboard <span className="ml-2.5 text-[10px] tracking-wider uppercase font-extrabold bg-cyan-500 text-slate-950 dark:text-white px-2 py-0.5 rounded">CMS Console</span>
              </h2>
              <p className="text-xs text-slate-400 dark:text-neutral-500">Fully reactive CRUD modules, database configuration, and section visibility controls</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 dark:text-neutral-600 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Admin Workspace Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-neutral-700 overflow-x-auto scrollbar-none">
          {(['reviews', 'stories', 'videos', 'client-moments', 'stats-logos', 'faqs', 'settings'] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setEditingReview(null);
                setEditingStory(null);
                setEditingVideo(null);
                setEditingLogo(null);
                setEditingFaq(null);
                setEditingMoment(null);
              }}
              className={`px-5 py-3.5 text-xs font-bold border-b-2 capitalize transition flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-600 dark:text-orange-400 bg-white dark:bg-[#141414] dark:bg-[#141414] font-extrabold' 
                  : 'border-transparent text-slate-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-slate-800 dark:text-neutral-100 hover:bg-slate-50 dark:hover:bg-slate-800/70 dark:bg-slate-900/60'
              }`}
            >
              {tab === 'reviews' && <MessageSquare className="h-4 w-4" />}
              {tab === 'stories' && <Layers className="h-4 w-4" />}
              {tab === 'videos' && <Video className="h-4 w-4" />}
              {tab === 'client-moments' && <Camera className="h-4 w-4" />}
              {tab === 'stats-logos' && <BarChart2 className="h-4 w-4" />}
              {tab === 'faqs' && <HelpCircle className="h-4 w-4" />}
              {tab === 'settings' && <Settings className="h-4 w-4" />}
              <span>
                {tab === 'stats-logos' ? 'Stats & Logos' : tab === 'reviews' ? 'Reviews Feed' : tab === 'stories' ? 'Success Stories' : tab === 'faqs' ? 'Manage FAQs' : tab === 'client-moments' ? 'Client Moments' : tab}
              </span>
            </button>
          ))}
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/60">
          
          {/* TAB 1: REVIEWS CRUD */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Manage Verified Customer Feed</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Edit, approve, or delete public and seeded review testimonials</p>
                </div>
                <button
                  onClick={() => setEditingReview({})}
                  className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Review</span>
                </button>
              </div>

              {/* Review Editor Form */}
              {editingReview && (
                <form onSubmit={handleSaveReview} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <h4 className="font-bold text-sm text-slate-950 dark:text-white flex items-center space-x-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                      <span>{editingReview.id ? 'Edit Review Testimonial' : 'Create New Testimonial'}</span>
                    </h4>
                    <button type="button" onClick={() => setEditingReview(null)} className="text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:text-neutral-300 dark:text-neutral-600 text-xs">Cancel</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Full Name *</label>
                      <input 
                        type="text" required value={editingReview.name || ''} 
                        onChange={e => setEditingReview({...editingReview, name: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="Sarah Jenkins"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Company *</label>
                      <input 
                        type="text" required value={editingReview.company || ''} 
                        onChange={e => setEditingReview({...editingReview, company: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="Fintech Spark Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Role (English) *</label>
                      <input 
                        type="text" required value={editingReview.roleEn || ''} 
                        onChange={e => setEditingReview({...editingReview, roleEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="VP of Digital Experience"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Country</label>
                      <input 
                        type="text" value={editingReview.country || 'United States'} 
                        onChange={e => setEditingReview({...editingReview, country: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Flag Emoji</label>
                      <input 
                        type="text" value={editingReview.countryFlag || '🇺🇸'} 
                        onChange={e => setEditingReview({...editingReview, countryFlag: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-center focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Star Rating (1-5)</label>
                      <select 
                        value={editingReview.rating || 5} 
                        onChange={e => setEditingReview({...editingReview, rating: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs bg-white dark:bg-[#141414] dark:bg-[#141414] focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Avatar Image URL</label>
                      <input 
                        type="url" value={editingReview.avatar || ''} 
                        onChange={e => setEditingReview({...editingReview, avatar: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Capability Category</label>
                      <select 
                        value={editingReview.category || 'web-development'} 
                        onChange={e => setEditingReview({...editingReview, category: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs bg-white dark:bg-[#141414] dark:bg-[#141414] focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      >
                        {categories.map(c => <option key={c.id} value={c.slug}>{c.nameEn}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Feedback Content (English) *</label>
                    <textarea 
                      required rows={3} value={editingReview.feedbackEn || ''} 
                      onChange={e => setEditingReview({...editingReview, feedbackEn: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      placeholder="Next Solution operations are unmatched..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-6 bg-slate-50 dark:bg-slate-900/60 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-neutral-200 cursor-pointer">
                      <input 
                        type="checkbox" checked={editingReview.isVerified !== false} 
                        onChange={e => setEditingReview({...editingReview, isVerified: e.target.checked})}
                        className="rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                      />
                      <span>Verified Client Badge</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-neutral-200 cursor-pointer">
                      <input 
                        type="checkbox" checked={editingReview.featured === true} 
                        onChange={e => setEditingReview({...editingReview, featured: e.target.checked})}
                        className="rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                      />
                      <span>Feature on Landing Wall</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200">Approval Status:</span>
                      <select 
                        value={editingReview.status || 'approved'} 
                        onChange={e => setEditingReview({...editingReview, status: e.target.value as any})}
                        className="rounded border border-slate-200 dark:border-neutral-700 px-2 py-0.5 text-xs bg-white dark:bg-[#141414] dark:bg-[#141414] focus:outline-none"
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button 
                      type="button" onClick={() => setEditingReview(null)}
                      className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#141414] dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800/70 dark:bg-slate-900/60 text-slate-700 dark:text-neutral-200 px-4 py-2 text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                    >
                      Save Testimonial
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews Table Grid */}
              <div className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider border-b border-slate-800 font-bold">
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Company & Category</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4">Review Preview (EN)</th>
                        <th className="py-3 px-4">Toggles</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
                      {testimonials.map((review) => (
                        <tr key={review.id} className="hover:bg-slate-50/50 transition">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2.5">
                              <img src={review.avatar} alt="" className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-neutral-700" />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white flex items-center">
                                  {review.name} <span className="ml-1 text-xs">{review.countryFlag}</span>
                                </span>
                                <span className="text-[10px] text-slate-400 dark:text-neutral-500 block">{review.roleEn}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-600 dark:text-neutral-300 dark:text-neutral-600">
                            <span className="block font-bold text-slate-800 dark:text-neutral-100">{review.company}</span>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 dark:text-neutral-600 px-1.5 py-0.5 rounded uppercase font-semibold">{review.category}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-amber-500 dark:text-amber-400">
                            {'⭐'.repeat(review.rating)}
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-slate-500 dark:text-neutral-400 dark:text-neutral-500">
                            {review.feedbackEn}
                          </td>
                          <td className="py-3 px-4 space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <button 
                                onClick={() => handleApproveToggle(review)}
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition ${
                                  review.status === 'approved' 
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20' 
                                    : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-500/20'
                                }`}
                              >
                                {review.status === 'approved' ? 'Approved' : 'Pending'}
                              </button>
                              <button 
                                onClick={() => handleFeatureToggle(review)}
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition ${
                                  review.featured 
                                    ? 'bg-blue-50 dark:bg-orange-500/10 text-blue-700 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20' 
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-neutral-400 dark:text-neutral-500'
                                }`}
                              >
                                {review.featured ? '★ Featured' : 'Standard'}
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingReview(review)}
                              className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-neutral-300 dark:text-neutral-600 hover:text-slate-900 dark:text-white transition inline-block"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteReview(review.id)}
                              className="p-1 rounded bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition inline-block"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUCCESS STORIES CRUD */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Featured Case Study Stories (Before vs After)</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Edit detailed metrics, background, solutions, and imagery deliverables</p>
                </div>
                <button
                  onClick={() => setEditingStory({})}
                  className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Case Study</span>
                </button>
              </div>

              {/* Story Form */}
              {editingStory && (
                <form onSubmit={handleSaveStory} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                      {editingStory.id ? 'Edit Case Study Story' : 'Create Case Study Story'}
                    </h4>
                    <button type="button" onClick={() => setEditingStory(null)} className="text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:text-neutral-300 dark:text-neutral-600 text-xs">Cancel</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Company Name *</label>
                      <input 
                        type="text" required value={editingStory.companyName || ''} 
                        onChange={e => setEditingStory({...editingStory, companyName: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Industry (English) *</label>
                      <input 
                        type="text" required value={editingStory.industryEn || ''} 
                        onChange={e => setEditingStory({...editingStory, industryEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Service Performed (English)</label>
                      <input 
                        type="text" value={editingStory.serviceEn || ''} 
                        onChange={e => setEditingStory({...editingStory, serviceEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Before Redesign Image URL</label>
                      <input 
                        type="text" value={editingStory.beforeImage || ''} 
                        onChange={e => setEditingStory({...editingStory, beforeImage: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">After Deliverable Image URL</label>
                      <input 
                        type="text" value={editingStory.afterImage || ''} 
                        onChange={e => setEditingStory({...editingStory, afterImage: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Name</label>
                      <input 
                        type="text" value={editingStory.clientName || ''} 
                        onChange={e => setEditingStory({...editingStory, clientName: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Role (EN)</label>
                      <input 
                        type="text" value={editingStory.clientRoleEn || ''} 
                        onChange={e => setEditingStory({...editingStory, clientRoleEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Timeline (EN)</label>
                      <input 
                        type="text" value={editingStory.timelineEn || '8 Weeks'} 
                        onChange={e => setEditingStory({...editingStory, timelineEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Challenge Summary (English) *</label>
                    <textarea 
                      required rows={2} value={editingStory.challengeEn || ''} 
                      onChange={e => setEditingStory({...editingStory, challengeEn: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Our Solution Summary (English) *</label>
                    <textarea 
                      required rows={2} value={editingStory.solutionEn || ''} 
                      onChange={e => setEditingStory({...editingStory, solutionEn: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Accomplished Results Metrics (English) *</label>
                    <textarea 
                      required rows={2} value={editingStory.resultsEn || ''} 
                      onChange={e => setEditingStory({...editingStory, resultsEn: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      placeholder="e.g. site response dropped below 300ms, sales surged +35%..."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Quote Review (English) *</label>
                    <textarea 
                      required rows={2} value={editingStory.clientQuoteEn || ''} 
                      onChange={e => setEditingStory({...editingStory, clientQuoteEn: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button 
                      type="button" onClick={() => setEditingStory(null)}
                      className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#141414] dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800/70 dark:bg-slate-900/60 text-slate-700 dark:text-neutral-200 px-4 py-2 text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                    >
                      Save Case Study
                    </button>
                  </div>
                </form>
              )}

              {/* Stories list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stories.map((story) => (
                  <div key={story.id} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-4 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-orange-400 tracking-wider bg-blue-50 dark:bg-orange-500/10 px-2 py-0.5 rounded">{story.industryEn}</span>
                        <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mt-2">{story.companyName}</h4>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500 mt-1">{story.serviceEn}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => setEditingStory(story)}
                          className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-neutral-300 dark:text-neutral-600 transition"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteStory(story.id)}
                          className="p-1.5 rounded bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-slate-100 dark:border-neutral-800 pt-3 text-slate-500 dark:text-neutral-400 dark:text-neutral-500">
                      <div>
                        <strong className="text-slate-700 dark:text-neutral-200 block">Deliverables Image:</strong>
                        <img src={story.afterImage} alt="" className="h-14 w-full object-cover rounded mt-1 border border-slate-100 dark:border-neutral-800" />
                      </div>
                      <div>
                        <strong className="text-slate-700 dark:text-neutral-200 block">Client Quote:</strong>
                        <p className="italic truncate mt-1">"{story.clientQuoteEn}"</p>
                        <p className="font-bold text-[9px] text-slate-400 dark:text-neutral-500 block mt-1">{story.clientName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VIDEO TESTIMONIALS CRUD */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Manage Video Reviews</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Add or edit video URLs, descriptions, and ratings</p>
                </div>
                <button
                  onClick={() => setEditingVideo({})}
                  className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Video</span>
                </button>
              </div>

              {/* Video form */}
              {editingVideo && (
                <form onSubmit={handleSaveVideo} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                      {editingVideo.id ? 'Edit Video Review' : 'Create Video Review'}
                    </h4>
                    <button type="button" onClick={() => setEditingVideo(null)} className="text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:text-neutral-300 dark:text-neutral-600 text-xs">Cancel</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Video Title (English) *</label>
                      <input 
                        type="text" required value={editingVideo.titleEn || ''} 
                        onChange={e => setEditingVideo({...editingVideo, titleEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="Fintech Spark: Design System Audit"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Name</label>
                      <input 
                        type="text" value={editingVideo.clientName || ''} 
                        onChange={e => setEditingVideo({...editingVideo, clientName: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Company</label>
                      <input 
                        type="text" value={editingVideo.company || ''} 
                        onChange={e => setEditingVideo({...editingVideo, company: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Rating</label>
                      <select 
                        value={editingVideo.rating || 5} 
                        onChange={e => setEditingVideo({...editingVideo, rating: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs bg-white dark:bg-[#141414] dark:bg-[#141414] focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Video YouTube Embed URL *</label>
                      <input 
                        type="text" required value={editingVideo.videoUrl || ''} 
                        onChange={e => setEditingVideo({...editingVideo, videoUrl: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Thumbnail Image URL *</label>
                      <input 
                        type="text" required value={editingVideo.thumbnailUrl || ''} 
                        onChange={e => setEditingVideo({...editingVideo, thumbnailUrl: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Description (English)</label>
                    <textarea 
                      rows={2} value={editingVideo.shortDescriptionEn || ''} 
                      onChange={e => setEditingVideo({...editingVideo, shortDescriptionEn: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button 
                      type="button" onClick={() => setEditingVideo(null)}
                      className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#141414] dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800/70 dark:bg-slate-900/60 text-slate-700 dark:text-neutral-200 px-4 py-2 text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                    >
                      Save Video
                    </button>
                  </div>
                </form>
              )}

              {/* Videos list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((vid) => (
                  <div key={vid.id} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="relative aspect-video bg-slate-900">
                      <img src={vid.thumbnailUrl} alt="" className="h-full w-full object-cover opacity-80" />
                      <div className="absolute top-3 right-3 flex space-x-1.5 z-10">
                        <button 
                          onClick={() => setEditingVideo(vid)}
                          className="p-1.5 rounded-lg bg-white/90 hover:bg-white dark:bg-[#141414] dark:bg-[#141414] text-slate-700 dark:text-neutral-200 transition"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="p-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition animate-pulse"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] text-amber-500 dark:text-amber-400">{'★'.repeat(vid.rating)}</span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{vid.titleEn}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed line-clamp-2">{vid.shortDescriptionEn}</p>
                      <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-neutral-800 text-[10px] text-slate-400 dark:text-neutral-500">
                        <span className="font-bold text-slate-700 dark:text-neutral-200">{vid.clientName}</span>
                        <span>•</span>
                        <span>{vid.company}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CLIENT MOMENTS CRUD */}
          {activeTab === 'client-moments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Manage Client Moments</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Edit or add real-life collaboration photos/moments with our clients</p>
                </div>
                <button
                  onClick={() => setEditingMoment({})}
                  className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Moment</span>
                </button>
              </div>

              {/* Moment Form */}
              {editingMoment && (
                <form onSubmit={handleSaveMoment} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                    <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                      {editingMoment.id ? 'Edit Client Moment' : 'Create Client Moment'}
                    </h4>
                    <button type="button" onClick={() => setEditingMoment(null)} className="text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:text-neutral-300 dark:text-neutral-600 text-xs">Cancel</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Moment Title (English) *</label>
                      <input 
                        type="text" required value={editingMoment.titleEn || ''} 
                        onChange={e => setEditingMoment({...editingMoment, titleEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="e.g. Project Handover with Apex"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Name *</label>
                      <input 
                        type="text" required value={editingMoment.clientName || ''} 
                        onChange={e => setEditingMoment({...editingMoment, clientName: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="Sajid Rahman"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Company</label>
                      <input 
                        type="text" value={editingMoment.company || ''} 
                        onChange={e => setEditingMoment({...editingMoment, company: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="Apex Fashion Group"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Display Order</label>
                      <input 
                        type="number" value={editingMoment.displayOrder !== undefined ? editingMoment.displayOrder : 1} 
                        onChange={e => setEditingMoment({...editingMoment, displayOrder: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Image URL *</label>
                      <input 
                        type="text" required value={editingMoment.imageUrl || ''} 
                        onChange={e => setEditingMoment({...editingMoment, imageUrl: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Description (English)</label>
                      <textarea 
                        rows={2} value={editingMoment.descriptionEn || ''} 
                        onChange={e => setEditingMoment({...editingMoment, descriptionEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                        placeholder="Describe the moment and collaboration highlights..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 dark:text-neutral-200 cursor-pointer">
                    <input 
                      type="checkbox" checked={editingMoment.visible !== false} 
                      onChange={e => setEditingMoment({...editingMoment, visible: e.target.checked})}
                      className="rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                    />
                    <span>Visible on Website</span>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button 
                      type="button" onClick={() => setEditingMoment(null)}
                      className="rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#141414] dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800/70 dark:bg-slate-900/60 text-slate-700 dark:text-neutral-200 px-4 py-2 text-xs font-bold transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                    >
                      Save Moment
                    </button>
                  </div>
                </form>
              )}

              {/* Moments List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {moments.map((mom) => (
                  <div key={mom.id} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                      <img src={mom.imageUrl} alt="" className="h-full w-full object-cover" />
                      <div className="absolute top-3 right-3 flex space-x-1.5 z-10">
                        <button 
                          onClick={() => setEditingMoment(mom)}
                          className="p-1.5 rounded-lg bg-white/90 hover:bg-white dark:bg-[#141414] dark:bg-[#141414] text-slate-700 dark:text-neutral-200 transition"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteMoment(mom.id)}
                          className="p-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition animate-pulse"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {!mom.visible && (
                        <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                          <EyeOff className="h-3 w-3" />
                          <span>Hidden</span>
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{mom.titleEn}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed line-clamp-2 mt-1">{mom.descriptionEn}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-neutral-800 text-[10px] text-slate-400 dark:text-neutral-500 mt-2">
                        <span className="font-bold text-slate-700 dark:text-neutral-200 truncate max-w-[120px]">{mom.clientName}</span>
                        <span>{mom.company}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STATS & LOGOS EDITING */}
          {activeTab === 'stats-logos' && (
            <div className="space-y-8">
              
              {/* Statistics update */}
              {stats && (
                <form onSubmit={handleSaveStats} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Global Trust Statistics</h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Update bento statistics displayed throughout the landing view</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Projects Completed</label>
                      <input 
                        type="number" value={stats.projectsCompleted || 300} 
                        onChange={e => setStats({...stats, projectsCompleted: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Happy Corporate Clients</label>
                      <input 
                        type="number" value={stats.happyClients || 150} 
                        onChange={e => setStats({...stats, happyClients: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Client Satisfaction Rate (%)</label>
                      <input 
                        type="number" value={stats.clientSatisfaction || 98} 
                        onChange={e => setStats({...stats, clientSatisfaction: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Average Star Rating</label>
                      <input 
                        type="number" step="0.1" value={stats.averageRating || 4.9} 
                        onChange={e => setStats({...stats, averageRating: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Industries Served</label>
                      <input 
                        type="number" value={stats.industriesServed || 20} 
                        onChange={e => setStats({...stats, industriesServed: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Five Star Reviews Count</label>
                      <input 
                        type="number" value={stats.fiveStarReviews || 120} 
                        onChange={e => setStats({...stats, fiveStarReviews: Number(e.target.value)})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      type="submit"
                      className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                    >
                      Update Trust Counters
                    </button>
                  </div>
                </form>
              )}

              {/* Client logos marquee manager */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Enterprise Client Logo Wall</h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Add or remove company logos in the scrolling marquee ticker</p>
                  </div>
                  <button
                    onClick={() => setEditingLogo({})}
                    className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3 py-1.5 text-xs font-bold transition flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Brand Logo</span>
                  </button>
                </div>

                {editingLogo && (
                  <form onSubmit={handleSaveLogo} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-4 space-y-3 shadow-sm max-w-xl">
                    <h4 className="font-bold text-xs text-slate-950 dark:text-white">Add Brand Partner Logo</h4>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 mb-0.5">Brand Name *</label>
                      <input 
                        type="text" required value={editingLogo.name || ''} 
                        onChange={e => setEditingLogo({...editingLogo, name: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 mb-0.5">Logo URL (Clean vector or png) *</label>
                      <input 
                        type="text" required value={editingLogo.logoUrl || ''} 
                        onChange={e => setEditingLogo({...editingLogo, logoUrl: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-end space-x-1.5 pt-1">
                      <button type="button" onClick={() => setEditingLogo(null)} className="px-3 py-1 text-xs font-bold border border-slate-200 dark:border-neutral-700 rounded">Cancel</button>
                      <button type="submit" className="px-3 py-1 text-xs font-bold bg-blue-600 dark:bg-orange-500 text-white rounded">Save Logo</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {logos.map((logo) => (
                    <div key={logo.id} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-neutral-700 p-3 flex flex-col items-center justify-between space-y-3 hover:shadow-sm transition">
                      <img src={logo.logoUrl} alt={logo.name} className="h-8 max-w-full object-contain filter grayscale opacity-70" />
                      <div className="text-center">
                        <span className="text-[10px] font-bold text-slate-700 dark:text-neutral-200 block">{logo.name}</span>
                        <button 
                          onClick={() => handleDeleteLogo(logo.id)}
                          className="text-[9px] font-bold text-rose-600 dark:text-rose-400 hover:text-rose-800 transition block mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQs CRUD */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Manage FAQs Accordion</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Edit frequently asked questions about verified review logs and calculation rules</p>
                </div>
                <button
                  onClick={() => setEditingFaq({})}
                  className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              {/* FAQ Form */}
              {editingFaq && (
                <form onSubmit={handleSaveFaq} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                    {editingFaq.id ? 'Edit FAQ Item' : 'Create New FAQ'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Category (English) *</label>
                      <input 
                        type="text" required value={editingFaq.categoryEn || ''} 
                        onChange={e => setEditingFaq({...editingFaq, categoryEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Question (English) *</label>
                      <input 
                        type="text" required value={editingFaq.questionEn || ''} 
                        onChange={e => setEditingFaq({...editingFaq, questionEn: e.target.value})}
                        className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Answer (English) *</label>
                    <textarea 
                      required rows={3} value={editingFaq.answerEn || ''} 
                      onChange={e => setEditingFaq({...editingFaq, answerEn: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 dark:border-neutral-700 px-3 py-1.5 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => setEditingFaq(null)} className="px-4 py-2 border rounded text-xs font-bold bg-white dark:bg-[#141414] dark:bg-[#141414]">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 dark:bg-orange-500 text-white rounded text-xs font-bold">Save FAQ</button>
                  </div>
                </form>
              )}

              {/* FAQs List */}
              <div className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 divide-y divide-slate-100 dark:divide-neutral-800 shadow-sm">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 flex items-start justify-between hover:bg-slate-50/50 transition">
                    <div className="space-y-1 max-w-3xl">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 dark:text-neutral-600 px-1.5 py-0.5 rounded font-bold uppercase">{faq.categoryEn}</span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{faq.questionEn}</h4>
                      <p className="text-slate-500 dark:text-neutral-400 dark:text-neutral-500 text-[11px] leading-relaxed">{faq.answerEn}</p>
                    </div>
                    <div className="flex space-x-1.5">
                      <button onClick={() => setEditingFaq(faq)} className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-neutral-300 dark:text-neutral-600 transition">
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button onClick={() => handleDeleteFaq(faq.id)} className="p-1 rounded bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & VISIBILITY SECTION */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Review Queue Verification Config */}
              <div className="md:col-span-6 space-y-6">
                {reviewSettings && (
                  <form onSubmit={handleSaveReviewSettings} className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Review Gatekeeper Settings</h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Configure public review submission permissions and vetting workflows</p>
                    </div>

                    <div className="space-y-3.5">
                      <label className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 dark:text-neutral-200 cursor-pointer">
                        <input 
                          type="checkbox" checked={reviewSettings.enablePublicSubmissions} 
                          onChange={e => setReviewSettings({...reviewSettings, enablePublicSubmissions: e.target.checked})}
                          className="rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                        />
                        <span>Enable Public Submissions Form</span>
                      </label>

                      <label className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 dark:text-neutral-200 cursor-pointer">
                        <input 
                          type="checkbox" checked={reviewSettings.requireApprovalBeforePublishing} 
                          onChange={e => setReviewSettings({...reviewSettings, requireApprovalBeforePublishing: e.target.checked})}
                          className="rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                        />
                        <span>Require Admin Vetting & Approval</span>
                      </label>

                      <label className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 dark:text-neutral-200 cursor-pointer">
                        <input 
                          type="checkbox" checked={reviewSettings.defaultVerificationStatus} 
                          onChange={e => setReviewSettings({...reviewSettings, defaultVerificationStatus: e.target.checked})}
                          className="rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                        />
                        <span>Pre-Verify New Feed Additions</span>
                      </label>

                      <label className="flex items-center space-x-2.5 text-xs font-bold text-slate-700 dark:text-neutral-200 cursor-pointer">
                        <input 
                          type="checkbox" checked={reviewSettings.notifyOnNewReview} 
                          onChange={e => setReviewSettings({...reviewSettings, notifyOnNewReview: e.target.checked})}
                          className="rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                        />
                        <span>Send Notifications to Owners</span>
                      </label>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-neutral-800">
                      <button 
                        type="submit"
                        className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                      >
                        Save Workflow Rules
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* 14 Sections Visibility control */}
              <div className="md:col-span-6">
                <div className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-neutral-700 p-5 space-y-4 shadow-sm">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Landing Section Visibility</h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 dark:text-neutral-500">Enable or disable any of the 14 interactive layout sections with a single click</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.keys(sectionVisibility).map((key) => {
                      const displayNames: Record<string, string> = {
                        hero: '01. Premium Hero Section',
                        overview: '02. Client Success Overview',
                        stories: '03. Featured Case Studies',
                        videos: '04. Video Testimonials',
                        wall: '05 & 06. Masonry Wall & Filters',
                        clientMoments: '07. Client Moments Carousel',
                        logos: '08. Scrolling Logo Wall',
                        whyUs: '09. Why Clients Love Us Grid',
                        map: '10. Global Client Map (SVG)',
                        googleReviews: '11. Google Review Style Cards',
                        achievements: '12. Before/After Achievements',
                        submissionCta: '13. Submission Call to Action',
                        faq: '14. FAQ Accordions',
                      };
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleToggleSection(key)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                            sectionVisibility[key]
                              ? 'border-blue-200 dark:border-orange-500/25 bg-blue-50/20 text-blue-900'
                              : 'border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-slate-900/60 text-slate-400 dark:text-neutral-500'
                          }`}
                        >
                          <span className="truncate pr-1">{displayNames[key] || key}</span>
                          <span className="flex-shrink-0">
                            {sectionVisibility[key] ? (
                              <Eye className="h-4 w-4 text-blue-600 dark:text-orange-400" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-slate-400 dark:text-neutral-500" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer info line */}
        <div className="bg-slate-900 border-t border-slate-800 text-slate-500 dark:text-neutral-400 dark:text-neutral-500 py-3 px-6 text-[10px] flex justify-between items-center">
          <span>Enterprise Secure Sync • Next Solution Bangladesh v2.6</span>
          <span className="flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400 dark:text-neutral-500">Database Connection Active</span>
          </span>
        </div>

      </div>
    </div>
  );
}
