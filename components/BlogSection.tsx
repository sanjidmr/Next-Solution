"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Calendar, Clock, Share2, Check, Send, ArrowLeft, MessageSquare, 
  Eye, Heart, Sparkles, BookOpen, Newspaper, Award, HelpCircle, 
  ChevronRight, Copy, ExternalLink, RefreshCw, Layers, CheckCircle2,
  AlertTriangle, Flame, ArrowRight, User, Hash, AlertCircle, FileText,
  Lightbulb, Info, Globe, Palette, Video, Megaphone, Brain, Code
} from 'lucide-react';
import { translations } from '@/data/translations';
import { getBlogs, addSubscriber, saveBlogPost } from '@/lib/db';
import { getLocalItem, setLocalItem } from '@/lib/utils';
import { BlogPost } from '@/types';

interface BlogSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

interface LocalComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  parentId?: string; // Support threaded replies!
  isApproved?: boolean;
}

export default function BlogSection({ currentLang, setTab, isFullPage = false }: BlogSectionProps) {
  const t = translations[currentLang];
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getBlogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'trending' | 'editors' | 'guides' | 'news'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // SEO Explorer panel state
  const [seoPanelOpen, setSeoPanelOpen] = useState(false);
  const [selectedServiceHero, setSelectedServiceHero] = useState<'all' | 'design' | 'dev' | 'video' | 'marketing' | 'ai'>('all');

  // Comments state persisted in localStorage keyed by post ID
  const [comments, setComments] = useState<Record<string, LocalComment[]>>(() => {
    const stored = getLocalItem('next_solution_blog_comments_v2');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing comments', e);
      }
    }
    // Default seeded comments
    return {
      '1': [
        { id: 'c1', author: 'Markus Vance', text: 'Stellar breakdown of Edge compiling. This matches our team\'s findings in Next-gen portals.', createdAt: '2026-07-02T09:00:00Z', isApproved: true },
        { id: 'c1-r1', parentId: 'c1', author: 'Sanjid Rahman', text: 'Thanks Markus! Indeed, sub-100ms response is critical for high-concurrency SaaS.', createdAt: '2026-07-02T10:15:00Z', isApproved: true }
      ],
      '2': [
        { id: 'c2', author: 'Anika Rahman', text: 'খুবই চমৎকার এবং সময়োপযোগী কন্টেন্ট! ডিজাইন সিস্টেমের প্রয়োজনীয়তা নিয়ে দারুণভাবে ব্যাখ্যা করেছেন।', createdAt: '2026-07-06T15:20:00Z', isApproved: true }
      ]
    };
  });

  // Save comments to localStorage when changed
  useEffect(() => {
    setLocalItem('next_solution_blog_comments_v2', JSON.stringify(comments));
  }, [comments]);

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Reference for content scrolling to TOC headings
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Increment views on post selection
  const handleSelectPost = (post: BlogPost) => {
    const updatedPost = { ...post, views: (post.views || 0) + 1 };
    saveBlogPost(updatedPost);
    setBlogs(getBlogs());
    setSelectedPost(updatedPost);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset reply states
    setReplyToId(null);
    setCommentName('');
    setCommentText('');
  };

  // Extract all categories with dynamic count
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    let totalCount = 0;
    
    blogs.forEach(b => {
      if (b.status === 'published') {
        totalCount++;
        const cat = currentLang === 'en' ? b.categoryEn : b.categoryBn;
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    return {
      All: totalCount,
      ...counts
    };
  }, [blogs, currentLang]);

  // Extract tag cloud
  const tagCloud = useMemo(() => {
    const tagsSet = new Set<string>();
    blogs.forEach(b => {
      if (b.status === 'published' && b.tags) {
        b.tags.forEach(t => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet);
  }, [blogs]);

  // Filter and sort blogs dynamically
  const processedBlogs = useMemo(() => {
    return blogs.filter(item => {
      // Must be published
      if (item.status !== 'published') return false;

      // Category filter
      const itemCategory = currentLang === 'en' ? item.categoryEn : item.categoryBn;
      const matchesCategory = activeCategory === 'All' || itemCategory === activeCategory;

      // Tag filter
      const matchesTag = !selectedTag || (item.tags && item.tags.includes(selectedTag));

      // Secondary category filter tab
      let matchesFilter = true;
      if (activeFilter === 'popular') {
        matchesFilter = (item.views || 0) > 3000;
      } else if (activeFilter === 'trending') {
        matchesFilter = !!item.isTrending;
      } else if (activeFilter === 'editors') {
        matchesFilter = !!item.isEditorsPick;
      } else if (activeFilter === 'guides') {
        matchesFilter = !!item.isLearningGuide;
      } else if (activeFilter === 'news') {
        matchesFilter = !!item.isLatestNews;
      }

      // Search match
      const term = searchQuery.trim().toLowerCase();
      if (!term) return matchesCategory && matchesTag && matchesFilter;

      const title = (currentLang === 'en' ? item.titleEn : item.titleBn).toLowerCase();
      const excerpt = (currentLang === 'en' ? item.excerptEn : item.excerptBn).toLowerCase();
      const content = (currentLang === 'en' ? item.contentEn : item.contentBn).toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();

      const matchesSearch = title.includes(term) || excerpt.includes(term) || content.includes(term) || tags.includes(term);
      return matchesCategory && matchesTag && matchesFilter && matchesSearch;
    });
  }, [blogs, activeCategory, activeFilter, selectedTag, searchQuery, currentLang]);

  // Popular posts for sidebar (sorted by views descending)
  const sidebarPopularPosts = useMemo(() => {
    return [...blogs]
      .filter(b => b.status === 'published')
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 4);
  }, [blogs]);

  // Featured Post
  const featuredPost = useMemo(() => {
    // Pick flagged featured or the one with the highest views
    const flagged = blogs.find(b => b.status === 'published' && b.isFeatured);
    if (flagged) return flagged;
    return blogs.filter(b => b.status === 'published')[0] || null;
  }, [blogs]);

  // Parse table of contents headings dynamically
  const parsedHeadings = useMemo(() => {
    if (!selectedPost) return [];
    const content = currentLang === 'en' ? selectedPost.contentEn : selectedPost.contentBn;
    const lines = content.split('\n');
    const headings: { text: string; id: string; level: number }[] = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length; // 2 for h2, 3 for h3
        const text = match[2].trim();
        // Generate valid HTML ID
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');
        headings.push({ text, id, level });
      }
    });
    return headings;
  }, [selectedPost, currentLang]);

  // Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    setNewsletterSuccess(false);

    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterError(currentLang === 'en' ? 'Please enter a valid email address.' : 'অনুগ্রহ করে একটি সঠিক ইমেল প্রবেশ করান।');
      return;
    }

    const success = addSubscriber(newsletterEmail);
    if (success) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } else {
      setNewsletterError(currentLang === 'en' ? 'This email is already subscribed!' : 'এই ইমেলটি ইতিপূর্বে সাবস্ক্রাইব করা হয়েছে!');
    }
  };

  // Add Comment/Reply
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: LocalComment = {
      id: `comm-${Date.now()}`,
      author: commentName.trim(),
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
      parentId: replyToId || undefined,
      isApproved: true // Auto-approved for frictionless demo
    };

    setComments(prev => ({
      ...prev,
      [selectedPost.id]: [newComment, ...(prev[selectedPost.id] || [])]
    }));

    setCommentName('');
    setCommentText('');
    setReplyToId(null);
  };

  // Share mechanics
  const handleShare = (platform: 'facebook' | 'linkedin' | 'twitter' | 'whatsapp' | 'copy', post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.slug || post.id}`;
    const text = currentLang === 'en' ? post.titleEn : post.titleBn;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    } else {
      let shareUrl = '';
      if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      else if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      else if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      else if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
      
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Copy Code block helper
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    });
  };

  // Next and Prev post navigation helper
  const navigationPosts = useMemo(() => {
    if (!selectedPost) return { prev: null, next: null };
    const published = blogs.filter(b => b.status === 'published');
    const currentIndex = published.findIndex(b => b.id === selectedPost.id);
    
    return {
      prev: currentIndex > 0 ? published[currentIndex - 1] : null,
      next: currentIndex < published.length - 1 ? published[currentIndex + 1] : null
    };
  }, [selectedPost, blogs]);

  // Related articles recommendation (same category, excluding current)
  const relatedArticles = useMemo(() => {
    if (!selectedPost) return [];
    return blogs
      .filter(b => b.status === 'published' && b.id !== selectedPost.id && b.categoryEn === selectedPost.categoryEn)
      .slice(0, 3);
  }, [selectedPost, blogs]);

  // Interactive head element manipulation in client-side SPA (to show premium SEO fidelity)
  useEffect(() => {
    if (!selectedPost) {
      document.title = currentLang === 'en' 
        ? 'Insights, Ideas & Digital Growth Blog | Next Solution' 
        : 'ইনসাইটস, আইডিয়া ও ডিজিটাল গ্রোথ ব্লগ | নেক্সট সলিউশন';
    } else {
      const seoTitle = currentLang === 'en' 
        ? (selectedPost.seoTitleEn || selectedPost.titleEn) 
        : (selectedPost.seoTitleBn || selectedPost.titleBn);
      document.title = `${seoTitle} | Next Solution Blog`;
    }
  }, [selectedPost, currentLang]);

  // Scroll to targeted section
  const handleHeadingScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Simple custom Markdown to JSX parser
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    let inList = false;
    let listItems: string[] = [];
    const elements: React.ReactNode[] = [];

    // Helper to push cached list
    const flushList = (key: string) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 space-y-2 my-4 text-gray-700 dark:text-neutral-200 leading-relaxed font-sans text-xs md:text-sm">
            {listItems.map((item, i) => (
              <li key={`li-${i}`}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // Handle table blocks
      if (line.startsWith('|')) {
        flushList(`before-table-${i}`);
        const rows: string[][] = [];
        let j = i;
        while (j < lines.length && lines[j].startsWith('|')) {
          // Skip the divider rows like |---|---|
          if (!lines[j].includes('---')) {
            const cells = lines[j]
              .split('|')
              .map(c => c.trim())
              .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
            rows.push(cells);
          }
          j++;
        }
        
        if (rows.length > 0) {
          elements.push(
            <div key={`table-wrapper-${i}`} className="overflow-x-auto border border-gray-100 dark:border-neutral-800 rounded-xl my-6 bg-white dark:bg-[#141414] shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800 font-bold text-gray-700 dark:text-neutral-200">
                    {rows[0].map((cell, idx) => (
                      <th key={`th-${idx}`} className="p-3.5 font-semibold text-gray-800 dark:text-neutral-100">{cell}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-600 dark:text-neutral-300 dark:text-neutral-600 font-sans">
                  {rows.slice(1).map((row, rowIdx) => (
                    <tr key={`tr-${rowIdx}`} className="hover:bg-gray-50 dark:bg-neutral-900 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={`td-${cellIdx}`} className="p-3.5 whitespace-pre-wrap">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        i = j - 1;
        i++;
        continue;
      }

      // Handle code block parsing
      if (line.startsWith('```')) {
        flushList(`before-code-${i}`);
        const lang = line.slice(3).trim();
        const codeLines: string[] = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].startsWith('```')) {
          codeLines.push(lines[j]);
          j++;
        }
        const fullCode = codeLines.join('\n');
        const codeId = `code-block-${i}`;

        elements.push(
          <div key={`code-block-wrapper-${i}`} className="my-6 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md font-mono text-xs text-slate-300 relative group/code">
            <div className="bg-slate-950/80 px-4 py-2 flex items-center justify-between border-b border-slate-800/60 text-[10px] uppercase font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-blue-400 dark:text-orange-300" />
                {lang || 'code snippet'}
              </span>
              <button
                type="button"
                onClick={() => handleCopyCode(codeId, fullCode)}
                className="flex items-center gap-1 hover:text-white transition"
              >
                {copiedCodeId === codeId ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto scrollbar-thin text-[11px] md:text-xs leading-relaxed text-slate-200">
              <code>{fullCode}</code>
            </pre>
          </div>
        );
        i = j;
        i++;
        continue;
      }

      // Handle custom Callout Boxes (Tip, Warning, Note)
      if (line.startsWith('[Tip]') || line.startsWith('[Warning]') || line.startsWith('[Note]')) {
        flushList(`before-callout-${i}`);
        const isTip = line.startsWith('[Tip]');
        const isWarning = line.startsWith('[Warning]');
        const alertText = line
          .replace('[Tip]', '')
          .replace('[Warning]', '')
          .replace('[Note]', '')
          .trim();
        
        let calloutBg = 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 text-emerald-800';
        let iconElement = <Lightbulb className="h-4.5 w-4.5 text-emerald-500 dark:text-emerald-400 shrink-0" />;
        
        if (isWarning) {
          calloutBg = 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 text-amber-800';
          iconElement = <AlertTriangle className="h-4.5 w-4.5 text-amber-500 dark:text-amber-400 shrink-0" />;
        } else if (!isTip) {
          calloutBg = 'bg-blue-50 dark:bg-orange-500/10 border-blue-200 dark:border-orange-500/25 text-blue-800';
          iconElement = <Info className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400 shrink-0" />;
        }

        elements.push(
          <div key={`callout-${i}`} className={`flex items-start gap-3.5 p-4 rounded-xl border ${calloutBg} my-5 font-sans text-xs md:text-sm shadow-sm`}>
            {iconElement}
            <div className="leading-relaxed">
              {alertText}
            </div>
          </div>
        );
        i++;
        continue;
      }

      // Handle Headings (##, ###)
      if (line.startsWith('## ') || line.startsWith('### ')) {
        flushList(`before-header-${i}`);
        const isH2 = line.startsWith('## ');
        const headerText = line.replace(/^(#{2,3})\s+/, '').trim();
        const headerId = headerText
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');

        if (isH2) {
          elements.push(
            <h2
              id={headerId}
              key={`h2-${i}`}
              className="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-100 dark:border-neutral-800 pb-2 font-sans flex items-center gap-2 group"
            >
              <span className="text-blue-500 dark:text-orange-400 font-mono text-sm font-medium select-none group-hover:inline hidden">#</span>
              {headerText}
            </h2>
          );
        } else {
          elements.push(
            <h3
              id={headerId}
              key={`h3-${i}`}
              className="text-sm md:text-base font-bold text-gray-900 dark:text-white mt-6 mb-3 font-sans"
            >
              {headerText}
            </h3>
          );
        }
        i++;
        continue;
      }

      // Handle blockquotes
      if (line.startsWith('>')) {
        flushList(`before-quote-${i}`);
        const quoteText = line.replace(/^>\s*/, '').trim();
        elements.push(
          <blockquote key={`blockquote-${i}`} className="border-l-4 border-blue-600 pl-4 py-1 my-6 bg-gray-50 dark:bg-neutral-900 rounded-r-lg italic text-gray-700 dark:text-neutral-200 text-xs md:text-sm leading-relaxed">
            {quoteText}
          </blockquote>
        );
        i++;
        continue;
      }

      // Handle lists
      if (line.startsWith('* ') || line.match(/^\d+\.\s/)) {
        inList = true;
        const listItemText = line.startsWith('* ') ? line.slice(2) : line.replace(/^\d+\.\s/, '');
        listItems.push(listItemText);
        i++;
        continue;
      }

      // Handle blank lines or continuous paragraph blocks
      if (line.trim() === '') {
        flushList(`blank-${i}`);
      } else {
        flushList(`para-before-${i}`);
        elements.push(
          <p key={`para-${i}`} className="text-gray-600 dark:text-neutral-300 dark:text-neutral-600 leading-relaxed text-xs md:text-sm font-sans mb-4">
            {line}
          </p>
        );
      }
      i++;
    }

    // Flush final lists
    flushList('final');

    return elements;
  };

  // Reset tag filtering
  const handleResetFilters = () => {
    setSelectedTag(null);
    setActiveCategory('All');
    setActiveFilter('all');
    setSearchQuery('');
  };

  return (
    <section id="blogs-section" className={`bg-[#FAFAFA] text-gray-800 dark:text-neutral-100 ${isFullPage ? 'pt-0 pb-20' : ''}`}>
      
      {/* 1. HERO SECTION */}
      <div className="bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-neutral-800 pt-10 pb-16 md:pt-12 md:pb-20 relative overflow-hidden">
        {/* Subtle geometric grid & abstract premium ambient lights */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-75" />
        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-radial from-violet-400/10 via-purple-200/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 h-[600px] w-[600px] rounded-full bg-radial from-blue-300/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="space-y-6 lg:col-span-6 text-left">
              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 text-[11px] font-semibold tracking-wider text-gray-400 dark:text-neutral-500 uppercase">
                <span className="hover:text-blue-600 dark:text-orange-400 transition-colors cursor-pointer" onClick={() => setTab('home')}>{currentLang === 'en' ? 'Home' : 'হোম'}</span>
                <ChevronRight className="h-3 w-3 text-neutral-300 dark:text-neutral-600" />
                <span className="text-gray-700 dark:text-neutral-200">{currentLang === 'en' ? 'Intelligence Hub' : 'ইন্টেলিজেন্স হাব'}</span>
              </nav>

              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 dark:bg-orange-500/10 border border-indigo-100/50 shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-orange-400 animate-pulse" />
                  {currentLang === 'en' ? 'Integrated Knowledge Center' : 'সমন্বিত নলেজ সেন্টার'}
                </span>
                
                <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                  {currentLang === 'en' ? (
                    <>
                      Insights for <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-orange-500 via-indigo-600 to-purple-600">
                        Every Discipline.
                      </span>
                    </>
                  ) : (
                    <>
                      সব সেবার <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-orange-500 via-indigo-600 to-purple-600">
                        সেরা ইনসাইটস।
                      </span>
                    </>
                  )}
                </h1>
                
                <p className="text-sm md:text-base text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-xl font-sans">
                  {currentLang === 'en' 
                    ? 'Unlock enterprise-grade design philosophies, high-performance tech stacks, video-editing strategies, organic SEO breakthroughs, and custom AI agent blueprints written by team leaders.'
                    : 'সিনিয়র টিম লিডারদের অভিজ্ঞতার আলোকে ডিজাইন থিওরি, হাই-পারফরম্যান্স ডেভেলপমেন্ট, হাই-রিটেনশন ভিডিও এডিটিং, আধুনিক এসইও স্ট্র্যাটেজি এবং এআই অটোমেশনের কমপ্লিট সোর্স গাইড বুক।'}
                </p>
              </div>

              {/* Service Quick Filter Indicators */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 max-w-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono block">
                  {currentLang === 'en' ? '⚡ EXPLORE BY DISCIPLINE FIELD:' : '⚡ আপনার পছন্দের ফিল্ড সিলেক্ট করুন:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: currentLang === 'en' ? 'All Channels' : 'সবগুলো', icon: Layers, color: 'hover:border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:bg-neutral-900 hover:text-neutral-900 dark:text-white' },
                    { id: 'design', label: currentLang === 'en' ? 'Design' : 'ডিজাইন', icon: Palette, color: 'active:border-pink-300 bg-pink-50/10 hover:bg-pink-50/40 text-pink-600 dark:text-pink-400 border-pink-100/30' },
                    { id: 'dev', label: currentLang === 'en' ? 'Development' : 'কোড', icon: Code, color: 'active:border-blue-300 bg-blue-50/10 dark:bg-orange-500/5 hover:bg-blue-50/40 dark:bg-orange-500/5 text-blue-600 dark:text-orange-400 border-blue-100/30' },
                    { id: 'video', label: currentLang === 'en' ? 'Video/Edit' : 'ভিডিও', icon: Video, color: 'active:border-amber-300 bg-amber-50/10 hover:bg-amber-50/40 text-amber-600 dark:text-amber-400 border-amber-100/30' },
                    { id: 'marketing', label: currentLang === 'en' ? 'SEO/Growth' : 'এসইও', icon: Megaphone, color: 'active:border-emerald-300 bg-emerald-50/10 hover:bg-emerald-50/40 text-emerald-600 dark:text-emerald-400 border-emerald-100/30' },
                    { id: 'ai', label: currentLang === 'en' ? 'AI/Agents' : 'এআই', icon: Brain, color: 'active:border-purple-300 bg-purple-50/10 dark:bg-orange-500/5 hover:bg-purple-50/40 dark:bg-orange-500/5 text-purple-600 dark:text-purple-400 dark:text-purple-300 border-purple-100/30' }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = selectedServiceHero === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedServiceHero(item.id as any)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs scale-[1.02]' 
                            : `bg-white dark:bg-[#141414] border-neutral-200/80 text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 ${item.color}`
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action row with anchors */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-scroll-search"
                  onClick={() => {
                    const searchBar = document.getElementById('search-anchor');
                    if (searchBar) searchBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-5 py-3.5 transition-all shadow-md shadow-black/5 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  <span>{currentLang === 'en' ? 'Search Articles' : 'নিবন্ধ খুঁজুন'}</span>
                </button>
                <button
                  id="hero-scroll-newsletter"
                  onClick={() => {
                    const newsletter = document.getElementById('newsletter-anchor');
                    if (newsletter) newsletter.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="rounded-xl border border-gray-200/80 hover:bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-neutral-200 text-xs font-bold px-5 py-3.5 transition flex items-center gap-2 bg-white dark:bg-[#141414] cursor-pointer"
                >
                  <Newspaper className="h-4 w-4 text-gray-400 dark:text-neutral-500" />
                  <span>{currentLang === 'en' ? 'Subscribe Newsletter' : 'নিউজলেটারে যুক্ত হোন'}</span>
                </button>
              </div>
            </div>

            {/* Right Modern Interactive Services Dashboard (Pure custom layout for all services representation) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md p-0.5 rounded-3xl bg-gradient-to-b from-neutral-200/60 via-neutral-100/30 to-violet-500/10 shadow-xl shadow-neutral-100/80">
                <div className="bg-white dark:bg-[#141414] rounded-[22px] p-6 md:p-8 space-y-5 relative overflow-hidden">
                  
                  {/* Decorative glowing gradient circle inside card */}
                  <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-indigo-100/20 dark:bg-orange-500/5 blur-3xl pointer-events-none" />
                  
                  {/* Header Title for the matrix */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-indigo-600 dark:text-orange-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                        {currentLang === 'en' ? 'Integrated Knowledge Pulse' : 'সমন্বিত নলেজ ভিউ'}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 uppercase tracking-wider font-mono">
                      {currentLang === 'en' ? 'Live Feeds' : 'সরাসরি ফিড'}
                    </span>
                  </div>

                  {/* Interactive Details Container with smooth state rendering */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedServiceHero}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 text-left"
                    >
                      {/* Interactive Header Display */}
                      <div className="bg-neutral-50/80 rounded-2xl p-4 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider font-mono">
                            {currentLang === 'en' ? 'Selected Channel Stream' : 'নির্বাচিত চ্যানেল ক্যাটাগরি'}
                          </span>
                          <h4 className="text-sm font-extrabold text-neutral-800 dark:text-neutral-100 mt-0.5">
                            {selectedServiceHero === 'all' && (currentLang === 'en' ? 'Cross-Discipline Insights' : 'সবগুলো ক্যাটাগরি')}
                            {selectedServiceHero === 'design' && (currentLang === 'en' ? 'Aesthetic Design & Brand' : 'ডিজাইন ও আর্টওয়ার্ক')}
                            {selectedServiceHero === 'dev' && (currentLang === 'en' ? 'Full-Stack Code & Cloud' : 'কোডিং ও ক্লাউড')}
                            {selectedServiceHero === 'video' && (currentLang === 'en' ? 'Video Production & Motion' : 'ভিডিও এডিটিং')}
                            {selectedServiceHero === 'marketing' && (currentLang === 'en' ? 'Semantic SEO & Growth Ads' : 'এসইও ও গ্রোথ')}
                            {selectedServiceHero === 'ai' && (currentLang === 'en' ? 'AI Automations & LLM Agents' : 'এআই ও অটোমেশন')}
                          </h4>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-[#141414] border border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 shadow-xs">
                          {selectedServiceHero === 'all' && <Layers className="h-4.5 w-4.5 text-neutral-600 dark:text-neutral-300 dark:text-neutral-600" />}
                          {selectedServiceHero === 'design' && <Palette className="h-4.5 w-4.5 text-pink-600 dark:text-pink-400" />}
                          {selectedServiceHero === 'dev' && <Code className="h-4.5 w-4.5 text-blue-600 dark:text-orange-400" />}
                          {selectedServiceHero === 'video' && <Video className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />}
                          {selectedServiceHero === 'marketing' && <Megaphone className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />}
                          {selectedServiceHero === 'ai' && <Brain className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400 dark:text-purple-300" />}
                        </div>
                      </div>

                      {/* Hot topics block */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider font-mono block">
                          {currentLang === 'en' ? '🔥 Trending Masterclass Topics:' : '🔥 বর্তমান ট্রেন্ডিং টপিকসমূহ:'}
                        </span>

                        <div className="space-y-2">
                          {/* Topic 1 */}
                          <div className="p-3 bg-white dark:bg-[#141414] hover:bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-all duration-200 flex gap-3 items-start">
                            <span className="text-xs font-bold text-neutral-300 dark:text-neutral-600 font-mono mt-0.5">01</span>
                            <div>
                              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-snug">
                                {selectedServiceHero === 'all' && (currentLang === 'en' ? 'The Synergy of Design, High-Performance Code, and AI workflows.' : 'ডিজাইন, কোড এবং এআই ওয়ার্কফ্লোকে একসাথে কাজে লাগানোর নিয়ম।')}
                                {selectedServiceHero === 'design' && (currentLang === 'en' ? 'Visual Branding Secrets: Grid Systems and Font Architectures.' : 'ডিজাইনে গ্রিড সিস্টেম ও সঠিক টাইপোগ্রাফি নির্বাচন করার মূল গাইড।')}
                                {selectedServiceHero === 'dev' && (currentLang === 'en' ? 'Building Ultrafast Apps with NextJS 15 & Server Components.' : 'NextJS ১৫ এবং সার্ভার কম্পোনেন্ট ব্যবহার করে হাই-স্পিড ওয়েব অ্যাপ।')}
                                {selectedServiceHero === 'video' && (currentLang === 'en' ? 'Hooking Audience in 3 Seconds: Dynamic Motion Video Editing.' : 'ভিডিওর প্রথম ৩ সেকেন্ডে দর্শককে ধরে রাখার মোশন গ্রাফিক্স সিক্রেট।')}
                                {selectedServiceHero === 'marketing' && (currentLang === 'en' ? 'Semantic Keyword Clusters: Dominate Google Rankings in 2026.' : 'সিমেন্টিক কিওয়ার্ড ক্লাস্টার: ২০২৬ সালে সার্চ ইঞ্জিনের শীর্ষে থাকার গাইড।')}
                                {selectedServiceHero === 'ai' && (currentLang === 'en' ? 'Chaining Prompts and LLMs: Developing Reliable AI Agents.' : 'প্রম্পট চেইনিং ও মডেল টিউনিং: ব্যবসায় স্বয়ংক্রিয় এআই এজেন্ট তৈরি।')}
                              </p>
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-indigo-600 dark:text-orange-400 mt-1 uppercase font-mono">
                                <Sparkles className="h-2 w-2" />
                                {currentLang === 'en' ? '12 Min Read • PRO RESOURCE' : '১২ মিনিট রিড • প্রো আর্টিকেল'}
                              </span>
                            </div>
                          </div>

                          {/* Topic 2 */}
                          <div className="p-3 bg-white dark:bg-[#141414] hover:bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-all duration-200 flex gap-3 items-start">
                            <span className="text-xs font-bold text-neutral-300 dark:text-neutral-600 font-mono mt-0.5">02</span>
                            <div>
                              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-snug">
                                {selectedServiceHero === 'all' && (currentLang === 'en' ? 'How Semantic SEO and Viral Video Hooks Scale organic acquisition.' : 'এসইও এবং ভাইরাল মোশন ভিডিও কীভাবে অর্গানিক কাস্টমার বৃদ্ধি করে।')}
                                {selectedServiceHero === 'design' && (currentLang === 'en' ? 'User-Centric Prototyping: Interactive Wireframes that convert.' : 'কনভার্শন-ফোকাসড ইউআই প্রোটোটাইপ এবং ইন্টারঅ্যাকশন ডিজাইন থিওরি।')}
                                {selectedServiceHero === 'dev' && (currentLang === 'en' ? 'PostgreSQL Schema Tuning: Indexing Strategies for SaaS loads.' : 'ডাটাবেস অপ্টিমাইজেশন: সফটওয়্যার অ্যাপে কুয়েরি স্পিড বৃদ্ধি করার উপায়।')}
                                {selectedServiceHero === 'video' && (currentLang === 'en' ? 'Commercial Video Production: Adobe Premiere Rendering Pipelines.' : 'প্রফেশনাল ভিডিও প্রোডাকশন এবং প্রিমিয়ার প্রো রেন্ডারিং গাইড বুক।')}
                                {selectedServiceHero === 'marketing' && (currentLang === 'en' ? 'Google CTR Optimization: Designing Snappy SERP Previews.' : 'গুগল সিটিআর অপ্টিমাইজেশন: আকর্ষণীয় সার্চ প্রিভিউ তৈরির মূল নিয়ম।')}
                                {selectedServiceHero === 'ai' && (currentLang === 'en' ? 'Automating Support: Resolving 75% Customer tickets with Bots.' : 'অটোমেটেড সাপোর্ট: ইন্টেলিজেন্ট বট দিয়ে কাস্টমার কেয়ার সাশ্রয় করার পদ্ধতি।')}
                              </p>
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-indigo-600 dark:text-orange-400 mt-1 uppercase font-mono">
                                <Sparkles className="h-2 w-2" />
                                {currentLang === 'en' ? '8 Min Read • EXPERT AUTHOR' : '৮ মিনিট রিড • এক্সপার্ট গাইড'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Guaranteed Trust Footer */}
                  <div className="mt-2 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-mono">
                      {currentLang === 'en' ? '📚 UPDATED LIVE DAILY BY LEAD ARCHITECTS' : '📚 প্রতিদিন আমাদের অভিজ্ঞ লিড টিম দ্বারা আপডেটকৃত'}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-orange-400 uppercase tracking-wider bg-indigo-50 dark:bg-orange-500/10 px-2 py-0.5 rounded font-mono">
                      {currentLang === 'en' ? '60+ RESOURCES' : '৬০+ রিসোর্স'}
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* DYNAMIC METADATA & SEO DIAGNOSTIC TRIGGER */}
      <div className="bg-slate-900 border-y border-slate-800 text-slate-300 py-3 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-500/20 text-indigo-400 dark:text-orange-300 border border-indigo-500/30 px-2 py-0.5 font-mono text-[10px] font-bold">SEO Audit</span>
            <span className="text-slate-400 font-sans">Inspect visual SERP, Twitter previews, and Article Schemas instantly:</span>
          </div>
          <button
            type="button"
            onClick={() => setSeoPanelOpen(!seoPanelOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 dark:bg-orange-500 text-white font-bold transition font-sans shadow"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{seoPanelOpen ? 'Close SEO Inspector' : 'Open SEO Explorer Panel'}</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC SEO AUDIT PANEL */}
      <AnimatePresence>
        {seoPanelOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-950 border-b border-slate-800 text-slate-300 overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono text-xs">
              
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-blue-400 dark:text-orange-300" />
                    SEO Meta & Schema.org Diagnostic Tool
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Real-time code structure generated for the active view context</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSeoPanelOpen(false)}
                  className="text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded"
                >
                  ✕ Close Panel
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Simulated Google Search Result & Social Card Preview (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <h5 className="font-sans text-[11px] font-bold uppercase tracking-wider text-blue-400 dark:text-orange-300">Google SERP Simulator</h5>
                    {/* Google result visual card */}
                    <div className="bg-white dark:bg-[#141414] text-black p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm font-sans space-y-1">
                      <div className="text-[11px] text-gray-500 dark:text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                        <span>https://next-solution.com</span>
                        <ChevronRight className="h-2 w-2" />
                        <span>blog</span>
                        {selectedPost && (
                          <>
                            <ChevronRight className="h-2 w-2" />
                            <span className="truncate max-w-[120px]">{selectedPost.slug}</span>
                          </>
                        )}
                      </div>
                      <h4 className="text-base text-[#FF4D00] hover:underline font-medium cursor-pointer leading-tight">
                        {selectedPost 
                          ? (currentLang === 'en' ? selectedPost.seoTitleEn : selectedPost.seoTitleBn) || selectedPost.titleEn
                          : (currentLang === 'en' ? 'Insights, Ideas & Digital Growth Blog' : 'ইনসাইটস, আইডিয়া ও ডিজিটাল গ্রোথ ব্লগ') + ' | Next Solution'}
                      </h4>
                      <p className="text-[12px] text-[#4d5156] leading-relaxed">
                        {selectedPost 
                          ? (currentLang === 'en' ? selectedPost.seoDescEn : selectedPost.seoDescBn) || selectedPost.excerptEn
                          : 'Explore enterprise-grade technology blueprinting, high-converting product design methodologies, and cutting-edge semantic SEO algorithms engineered by senior architects.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-sans text-[11px] font-bold uppercase tracking-wider text-purple-400 dark:text-purple-300">Twitter Card (Summary Large Image)</h5>
                    {/* Twitter card visual */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden font-sans text-xs">
                      <div className="aspect-video bg-slate-950 overflow-hidden relative">
                        <img 
                          src={selectedPost ? selectedPost.image : 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'} 
                          alt="Twitter card header"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-[9px] px-2 py-0.5 rounded text-white uppercase font-bold tracking-wider">
                          Twitter Summary Preview
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-800 space-y-1 bg-slate-950/40 text-slate-300">
                        <span className="text-[9px] text-slate-500 uppercase font-mono">next-solution.com</span>
                        <h4 className="font-bold text-white text-xs truncate">
                          {selectedPost 
                            ? selectedPost.titleEn
                            : 'Insights, Ideas & Digital Growth Blog'}
                        </h4>
                        <p className="text-[10px] text-slate-400 line-clamp-2">
                          {selectedPost 
                            ? selectedPost.excerptEn
                            : 'Explore enterprise technology blueprinting and SEO algorithms.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Head Metadata & Schema JSON-LD (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <h5 className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-400">Current HTML Meta tags</h5>
                    <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-[10px] text-slate-300 space-y-1 overflow-x-auto leading-relaxed font-mono">
                      <div>&lt;title&gt;<span className="text-blue-400 dark:text-orange-300">{selectedPost ? selectedPost.titleEn : 'Blog Intelligence Hub'} | Next Solution</span>&lt;/title&gt;</div>
                      <div>&lt;meta name="description" content="<span className="text-amber-400">{selectedPost ? selectedPost.excerptEn : 'Explore digital agency blog.'}</span>" /&gt;</div>
                      <div>&lt;link rel="canonical" href="<span className="text-emerald-400">{selectedPost ? selectedPost.canonicalUrl || `https://next-solution.com/blog/${selectedPost.slug}` : 'https://next-solution.com/blog'}</span>" /&gt;</div>
                      <div>&lt;meta property="og:type" content="article" /&gt;</div>
                      <div>&lt;meta property="og:title" content="<span className="text-blue-400 dark:text-orange-300">{selectedPost ? selectedPost.titleEn : 'Blog Intelligence'}</span>" /&gt;</div>
                      <div>&lt;meta property="og:image" content="<span className="text-purple-400 dark:text-purple-300">{selectedPost ? selectedPost.image : 'banner_url'}</span>" /&gt;</div>
                      <div>&lt;meta name="twitter:card" content="summary_large_image" /&gt;</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-sans text-[11px] font-bold uppercase tracking-wider text-emerald-400">Schema.org Article (JSON-LD Structured Code)</h5>
                    <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-[10px] text-emerald-400 space-y-1 overflow-x-auto max-h-[160px] scrollbar-thin font-mono">
                      <pre>{JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": selectedPost ? "BlogPosting" : "Blog",
                        "headline": selectedPost ? selectedPost.titleEn : "Next Solution Blog",
                        "image": selectedPost ? [selectedPost.image] : [],
                        "datePublished": selectedPost ? selectedPost.publishedAt : "2026-07-11",
                        "author": {
                          "@type": "Person",
                          "name": selectedPost ? selectedPost.author : "Sanjid Rahman"
                        },
                        "publisher": {
                          "@type": "Organization",
                          "name": "Next Solution",
                          "logo": {
                            "@type": "ImageObject",
                            "url": "https://nextsolution.co/logo.svg"
                          }
                        },
                        "description": selectedPost ? selectedPost.excerptEn : "Agency blog."
                      }, null, 2)}</pre>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>✓ Structured data validated for schema.org</span>
                      <span className="text-indigo-400 dark:text-orange-300 flex items-center gap-1 cursor-pointer hover:underline" onClick={() => window.open('https://validator.schema.org/', '_blank')}>
                        Schema Validator <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        
        {selectedPost ? (
          /* =======================================================
             INDIVIDUAL BLOG ARTICLE VIEW
             ======================================================= */
          <div id="blog-article-reader" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Stick Column - Table of Contents on Desktop (3 Cols) */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                
                {/* Back Link */}
                <button
                  id="toc-back-to-list-btn"
                  onClick={() => setSelectedPost(null)}
                  className="group flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-gray-900 dark:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>{currentLang === 'en' ? 'Back to Articles' : 'নিবন্ধ তালিকায় ফিরুন'}</span>
                </button>

                {/* Dynamic Table of Contents */}
                {parsedHeadings.length > 0 && (
                  <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 space-y-4 shadow-sm">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-blue-500 dark:text-orange-400" />
                      {currentLang === 'en' ? 'Table of Contents' : 'সূচিপত্র'}
                    </h4>
                    <nav className="space-y-2 text-xs">
                      {parsedHeadings.map((h, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleHeadingScroll(h.id)}
                          className={`block text-left hover:text-blue-600 dark:text-orange-400 transition-colors ${
                            h.level === 3 ? 'pl-3.5 text-gray-400 dark:text-neutral-500 border-l border-gray-100 dark:border-neutral-800 py-0.5' : 'text-gray-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold py-1'
                          }`}
                        >
                          {h.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Popular posts nested sidebar */}
                <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 space-y-4 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="h-4.5 w-4.5 text-amber-500 dark:text-amber-400 animate-pulse" />
                    {currentLang === 'en' ? 'Popular Articles' : 'জনপ্রিয় আর্টিকেলসমূহ'}
                  </h4>
                  <div className="space-y-3.5">
                    {sidebarPopularPosts.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectPost(item)}
                        className="cursor-pointer group flex gap-3 items-start"
                      >
                        <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-gray-50 dark:bg-neutral-900">
                          <img src={item.image} alt={item.titleEn} className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <h5 className="text-[11px] font-bold text-gray-800 dark:text-neutral-100 line-clamp-2 group-hover:text-blue-600 dark:text-orange-400 transition-colors">
                            {currentLang === 'en' ? item.titleEn : item.titleBn}
                          </h5>
                          <span className="text-[9px] text-gray-400 dark:text-neutral-500 flex items-center gap-1">
                            <Eye className="h-2.5 w-2.5" />
                            {item.views || 0} views
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Middle Main Column - Article Content & Author Core (6 Cols) */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Breadcrumb path for mobile screens */}
              <div className="lg:hidden flex items-center justify-between">
                <button
                  id="mobile-back-to-list-btn"
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-gray-900 dark:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{currentLang === 'en' ? 'Back' : 'ফিরুন'}</span>
                </button>
                <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-mono uppercase">Reading mode</span>
              </div>

              {/* Reader Header Card */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    {currentLang === 'en' ? selectedPost.categoryEn : selectedPost.categoryBn}
                  </span>
                  {selectedPost.isTrending && (
                    <span className="rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Flame className="h-3 w-3 fill-amber-400 text-amber-400 animate-pulse" />
                      Trending
                    </span>
                  )}
                </div>

                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.15]">
                  {currentLang === 'en' ? selectedPost.titleEn : selectedPost.titleBn}
                </h1>

                {/* Inline Author card */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 border-y border-gray-100 dark:border-neutral-800 py-3.5 bg-white dark:bg-[#141414] px-3.5 rounded-xl border border-gray-100/50">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                      <img 
                        src={selectedPost.authorPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} 
                        alt={selectedPost.author} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900 dark:text-white text-xs">{selectedPost.author}</span>
                      <span className="text-[9px] text-gray-400 dark:text-neutral-500 uppercase tracking-wider">
                        {currentLang === 'en' ? selectedPost.authorRoleEn : selectedPost.authorRoleBn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-medium text-gray-400 dark:text-neutral-500 text-[10px] tracking-wider uppercase ml-auto">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-gray-300 dark:text-neutral-500" />
                      {selectedPost.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-gray-300 dark:text-neutral-500" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Image Frame */}
              <div className="aspect-video overflow-hidden rounded-2xl border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 shadow-sm">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.titleEn}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dynamic Styled Content Reader */}
              <div ref={articleContentRef} className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 md:p-8 shadow-sm">
                
                {/* Excerpt Summary highlight */}
                <div className="border-l-4 border-blue-600 pl-4 py-2 bg-slate-50 rounded-r-xl text-gray-800 dark:text-neutral-100 text-sm md:text-base font-semibold leading-relaxed mb-6 font-sans">
                  {currentLang === 'en' ? selectedPost.excerptEn : selectedPost.excerptBn}
                </div>

                {/* Styled content body */}
                <div className="space-y-4">
                  {renderMarkdown(currentLang === 'en' ? selectedPost.contentEn : selectedPost.contentBn)}
                </div>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-1.5 pt-6 mt-8 border-t border-gray-100 dark:border-neutral-800">
                  {selectedPost.tags && selectedPost.tags.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedTag(tag);
                        setSelectedPost(null);
                      }}
                      className="rounded-lg bg-gray-50 dark:bg-neutral-900 px-2.5 py-1 text-[11px] font-bold text-gray-600 dark:text-neutral-300 dark:text-neutral-600 border border-gray-200 dark:border-neutral-700 hover:border-blue-500 hover:text-blue-600 dark:text-orange-400 transition"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author Biography Section */}
              <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
                  <User className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400" />
                  {currentLang === 'en' ? 'About The Expert' : 'লেখক পরিচিতি'}
                </h4>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
                    <img 
                      src={selectedPost.authorPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} 
                      alt={selectedPost.author} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-gray-900 dark:text-white text-sm leading-none">{selectedPost.author}</span>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-semibold font-mono uppercase">
                        {currentLang === 'en' ? selectedPost.authorRoleEn : selectedPost.authorRoleBn}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                      {currentLang === 'en' ? selectedPost.authorBioEn : selectedPost.authorBioBn}
                    </p>
                    <div className="flex items-center space-x-3 text-xs font-bold text-blue-600 dark:text-orange-400">
                      {selectedPost.authorTwitter && (
                        <a href={`https://twitter.com/${selectedPost.authorTwitter}`} target="_blank" rel="noreferrer" className="hover:underline">
                          @{selectedPost.authorTwitter}
                        </a>
                      )}
                      {selectedPost.authorLinkedin && (
                        <a href={`https://linkedin.com/in/${selectedPost.authorLinkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous / Next Article Navigation Footer */}
              <div className="grid grid-cols-2 gap-4">
                {navigationPosts.prev ? (
                  <div
                    onClick={() => handleSelectPost(navigationPosts.prev!)}
                    className="cursor-pointer bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-neutral-800 p-4 hover:border-blue-500 transition shadow-sm text-left group space-y-1"
                  >
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-500 flex items-center gap-1 leading-none">
                      <ArrowLeft className="h-3 w-3" />
                      Prev Article
                    </span>
                    <h5 className="text-[11px] font-black text-gray-800 dark:text-neutral-100 line-clamp-1 group-hover:text-blue-600 dark:text-orange-400 transition-colors">
                      {currentLang === 'en' ? navigationPosts.prev.titleEn : navigationPosts.prev.titleBn}
                    </h5>
                  </div>
                ) : <div className="invisible"></div>}

                {navigationPosts.next ? (
                  <div
                    onClick={() => handleSelectPost(navigationPosts.next!)}
                    className="cursor-pointer bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-neutral-800 p-4 hover:border-blue-500 transition shadow-sm text-right group space-y-1"
                  >
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-neutral-500 flex items-center gap-1 leading-none justify-end">
                      Next Article
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <h5 className="text-[11px] font-black text-gray-800 dark:text-neutral-100 line-clamp-1 group-hover:text-blue-600 dark:text-orange-400 transition-colors">
                      {currentLang === 'en' ? navigationPosts.next.titleEn : navigationPosts.next.titleBn}
                    </h5>
                  </div>
                ) : <div className="invisible"></div>}
              </div>

              {/* Interactive Comment Threading Engine Section */}
              <div id="article-comments-block" className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <MessageSquare className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400 animate-pulse" />
                    <span>{currentLang === 'en' ? 'Article Discussion' : 'নিবন্ধ আলোচনা'}</span>
                    <span className="text-xs bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-mono font-bold">
                      {(comments[selectedPost.id] || []).length}
                    </span>
                  </h3>
                  {replyToId && (
                    <button
                      onClick={() => setReplyToId(null)}
                      className="text-[10px] font-bold text-red-500 dark:text-red-400 hover:underline"
                    >
                      Cancel replying
                    </button>
                  )}
                </div>

                {/* Comment Input form */}
                <form onSubmit={handleAddComment} className="space-y-3.5">
                  {replyToId && (
                    <div className="bg-blue-50/5 dark:bg-orange-500/50 p-2.5 rounded-lg border border-blue-100 dark:border-orange-500/20 text-[11px] text-blue-800 flex items-center justify-between">
                      <span>Replying to comment thread: <strong>#{replyToId}</strong></span>
                      <button type="button" onClick={() => setReplyToId(null)} className="text-xs text-blue-500 dark:text-orange-400">✕</button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      id="comment-author-input"
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder={currentLang === 'en' ? 'Your Name' : 'আপনার নাম'}
                      className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-2 text-xs text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <textarea
                    id="comment-text-textarea"
                    required
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={replyToId ? 'Write your nested reply...' : (currentLang === 'en' ? 'Write a professional comment...' : 'একটি পেশাদার মন্তব্য লিখুন...')}
                    className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-2 text-xs text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      id="submit-comment-btn"
                      type="submit"
                      className="flex items-center space-x-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 transition shadow-sm"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{replyToId ? 'Post Reply' : (currentLang === 'en' ? 'Post Comment' : 'মন্তব্য প্রকাশ করুন')}</span>
                    </button>
                  </div>
                </form>

                {/* Structured nested comment lists rendering */}
                <div className="space-y-4 pt-4 divide-y divide-gray-50">
                  {/* Separate root comments and nested replies */}
                  {(() => {
                    const postComments = comments[selectedPost.id] || [];
                    const roots = postComments.filter(c => !c.parentId);
                    const replies = postComments.filter(c => !!c.parentId);

                    return roots.map((root) => {
                      const commentReplies = replies.filter(r => r.parentId === root.id);

                      return (
                        <div key={root.id} className="pt-4 space-y-3.5">
                          {/* Root Comment Row */}
                          <div className="flex items-start gap-3 text-xs leading-relaxed">
                            <div className="h-8 w-8 shrink-0 rounded-full bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 flex items-center justify-center font-bold border border-blue-100 dark:border-orange-500/20">
                              {root.author.charAt(0)}
                            </div>
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-gray-900 dark:text-white">{root.author}</span>
                                  <span className="text-[9px] text-gray-400 dark:text-neutral-500 font-mono font-medium">{new Date(root.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[8px] uppercase tracking-wider font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-500/20">Approved</span>
                                  <button
                                    type="button"
                                    onClick={() => setReplyToId(root.id)}
                                    className="text-[10px] font-bold text-blue-600 dark:text-orange-400 hover:underline"
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-neutral-300 dark:text-neutral-600 font-sans text-xs">{root.text}</p>
                            </div>
                          </div>

                          {/* Threaded Nested Replies */}
                          {commentReplies.length > 0 && (
                            <div className="pl-8 border-l-2 border-gray-100 dark:border-neutral-800 space-y-3 pt-1">
                              {commentReplies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-2.5 text-xs leading-relaxed">
                                  <div className="h-7 w-7 shrink-0 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 dark:text-purple-300 flex items-center justify-center font-bold border border-purple-100 dark:border-purple-500/20">
                                    {reply.author.charAt(0)}
                                  </div>
                                  <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900 dark:text-white">{reply.author}</span>
                                        <span className="text-[9px] text-gray-400 dark:text-neutral-500 font-mono font-medium">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                      </div>
                                      <span className="text-[8px] uppercase tracking-wider font-bold bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">Approved</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-neutral-300 dark:text-neutral-600 font-sans text-xs">{reply.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}

                  {(comments[selectedPost.id] || []).length === 0 && (
                    <p className="text-xs text-gray-400 dark:text-neutral-500 italic text-center py-6">
                      {currentLang === 'en' ? 'No comments on this article yet. Be the first to share your thoughts!' : 'এই নিবন্ধে এখনও কোন মন্তব্য করা হয়নি। আপনার মতামত প্রকাশকারী প্রথম ব্যক্তি হোন!'}
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar (3 Cols) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="sticky top-24 space-y-6">
                
                {/* 1. Share Widget */}
                <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 space-y-4 shadow-sm text-center">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 justify-center border-b border-gray-50 pb-2.5">
                    <Share2 className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400" />
                    {currentLang === 'en' ? 'Share This Post' : 'নিবন্ধটি শেয়ার করুন'}
                  </h4>
                  <div className="grid grid-cols-5 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleShare('facebook', selectedPost)}
                      className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-blue-600 dark:text-orange-400 transition border border-gray-100 dark:border-neutral-800 flex items-center justify-center"
                      title="Facebook"
                    >
                      <span className="font-sans font-black text-sm">F</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare('linkedin', selectedPost)}
                      className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-sky-700 transition border border-gray-100 dark:border-neutral-800 flex items-center justify-center"
                      title="LinkedIn"
                    >
                      <span className="font-sans font-black text-sm">In</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare('twitter', selectedPost)}
                      className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-black transition border border-gray-100 dark:border-neutral-800 flex items-center justify-center"
                      title="X / Twitter"
                    >
                      <span className="font-sans font-black text-sm">X</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare('whatsapp', selectedPost)}
                      className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-emerald-600 dark:text-emerald-400 transition border border-gray-100 dark:border-neutral-800 flex items-center justify-center"
                      title="WhatsApp"
                    >
                      <span className="font-sans font-black text-sm">WA</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare('copy', selectedPost)}
                      className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-blue-500 dark:text-orange-400 transition border border-gray-100 dark:border-neutral-800 flex items-center justify-center"
                      title="Copy Link"
                    >
                      {isCopied ? <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  {isCopied && <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">Link Copied!</div>}
                </div>

                {/* 2. Interactive Consultation Call To Action Card */}
                <div className="bg-gradient-to-br from-blue-600 dark:from-orange-500 to-purple-700 text-white rounded-2xl p-5 space-y-4 shadow-lg text-left relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
                  <h4 className="text-sm font-bold leading-tight relative z-10">
                    {currentLang === 'en' ? 'Need Custom Software Redesign?' : 'কাস্টম সফ্টওয়্যার রিডিজাইন প্রয়োজন?'}
                  </h4>
                  <p className="text-[11px] text-blue-100 leading-relaxed relative z-10">
                    Collaborate with Sanjid and senior designers to draft high-concurrency portals that achieve peak loading speeds.
                  </p>
                  <div className="space-y-2 pt-1 relative z-10">
                    <button
                      onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-full text-center rounded-xl bg-white dark:bg-[#141414] text-blue-600 dark:text-orange-400 hover:bg-blue-50 dark:bg-orange-500/10 text-xs font-bold py-2.5 transition shadow shadow-black/5"
                    >
                      Book 1-on-1 Consultation
                    </button>
                    <button
                      onClick={() => { setTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-full text-center text-xs font-semibold hover:underline text-white/90"
                    >
                      Explore Agency Services
                    </button>
                  </div>
                </div>

                {/* 3. Related articles block */}
                {relatedArticles.length > 0 && (
                  <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 space-y-4 shadow-sm">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
                      <BookOpen className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400" />
                      Related Reading
                    </h4>
                    <div className="space-y-4">
                      {relatedArticles.map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => handleSelectPost(rel)}
                          className="cursor-pointer group space-y-1.5"
                        >
                          <div className="aspect-video rounded-xl overflow-hidden bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                            <img src={rel.image} alt={rel.titleEn} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                          </div>
                          <h5 className="text-[11px] font-black text-gray-800 dark:text-neutral-100 leading-snug group-hover:text-blue-600 dark:text-orange-400 line-clamp-2 transition-colors">
                            {currentLang === 'en' ? rel.titleEn : rel.titleBn}
                          </h5>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        ) : (
          /* =======================================================
             MAIN BLOG LANDING LIST VIEW
             ======================================================= */
          <div className="space-y-12">
            
            {/* 2. FEATURED ARTICLE SECTION (Large Asymmetric Layout) */}
            {featuredPost && (
              <div 
                id="featured-article-hero"
                onClick={() => handleSelectPost(featuredPost)}
                className="bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-neutral-800 overflow-hidden cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 shadow-sm"
              >
                {/* Asymmetric left column: Image (7 Cols) */}
                <div className="lg:col-span-7 aspect-video lg:aspect-auto overflow-hidden relative bg-slate-50 border-r border-gray-50">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.titleEn}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-amber-400" />
                    Featured Intelligence
                  </span>
                </div>

                {/* Asymmetric right column: Metadata details (5 Cols) */}
                <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-orange-400 block">
                      {currentLang === 'en' ? featuredPost.categoryEn : featuredPost.categoryBn}
                    </span>
                    
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight tracking-tight hover:text-blue-600 dark:text-orange-400 transition-colors">
                      {currentLang === 'en' ? featuredPost.titleEn : featuredPost.titleBn}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed line-clamp-4 font-sans">
                      {currentLang === 'en' ? featuredPost.excerptEn : featuredPost.excerptBn}
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-gray-50 pt-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-neutral-500">
                      <span className="flex items-center gap-1.5 font-sans">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.publishedAt}
                      </span>
                      <span className="flex items-center gap-1.5 font-sans">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
                          <img src={featuredPost.authorPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} alt={featuredPost.author} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-neutral-200">{featuredPost.author}</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600 dark:text-orange-400 flex items-center gap-1 group">
                        <span>Read Article</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TWO-COLUMN GRID: Left Main Post Grid & Right Sticky Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Post list with dynamic category & tag filtration (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Anchored search bar element */}
                <div id="search-anchor" className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  
                  {/* Category filters inside list view */}
                  <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {(Object.keys(categoriesWithCounts) as (keyof typeof categoriesWithCounts)[]).map((catKey) => {
                      const count = categoriesWithCounts[catKey];
                      const displayTitle = catKey === 'All' 
                        ? (currentLang === 'en' ? 'All' : 'সব নিবন্ধ') 
                        : catKey;

                      return (
                        <button
                          key={catKey}
                          onClick={() => {
                            setActiveCategory(catKey);
                            setSelectedTag(null);
                          }}
                          className={`px-3.5 py-2 text-xs font-bold rounded-xl transition duration-200 border whitespace-nowrap flex items-center gap-1.5 ${
                            activeCategory === catKey
                              ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                              : 'bg-slate-50 border-gray-200/60 hover:bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 dark:text-neutral-600'
                          }`}
                        >
                          <span>{displayTitle}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            activeCategory === catKey ? 'bg-white/20 text-white' : 'bg-gray-200/50 text-gray-500 dark:text-neutral-400 dark:text-neutral-500'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Search */}
                  <div className="relative shrink-0 md:w-56 w-full">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400 dark:text-neutral-500" />
                    <input
                      id="blog-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={currentLang === 'en' ? 'Search topics...' : 'খুঁজুন...'}
                      className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] pl-9 pr-4 py-2.5 text-xs text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Sub category / Parameters tabs row */}
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  {[
                    { id: 'all', label: currentLang === 'en' ? 'All Feed' : 'সব পোস্ট', icon: <Layers className="h-3.5 w-3.5" /> },
                    { id: 'popular', label: currentLang === 'en' ? 'Popular' : 'জনপ্রিয়', icon: <Eye className="h-3.5 w-3.5" /> },
                    { id: 'trending', label: currentLang === 'en' ? 'Trending' : 'ট্রেন্ডিং', icon: <Flame className="h-3.5 w-3.5" /> },
                    { id: 'editors', label: currentLang === 'en' ? "Editor's Picks" : 'পছন্দসমূহ', icon: <Award className="h-3.5 w-3.5" /> },
                    { id: 'guides', label: currentLang === 'en' ? 'Learning Guides' : 'গাইড বুক', icon: <BookOpen className="h-3.5 w-3.5" /> },
                    { id: 'news', label: currentLang === 'en' ? 'Latest News' : 'সংবাদ', icon: <Newspaper className="h-3.5 w-3.5" /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveFilter(tab.id as any);
                        setSelectedTag(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 whitespace-nowrap ${
                        activeFilter === tab.id
                          ? 'bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20'
                          : 'text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:text-neutral-300 dark:text-neutral-600'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tags filter alert indicator */}
                {(selectedTag || searchQuery || activeCategory !== 'All' || activeFilter !== 'all') && (
                  <div className="bg-blue-50/5 dark:bg-orange-500/50 rounded-xl border border-blue-100/60 p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400" />
                      <span>
                        Filtering articles by:{' '}
                        <strong>
                          {selectedTag ? `#${selectedTag}` : ''}
                          {activeCategory !== 'All' ? ` Category: ${activeCategory}` : ''}
                          {activeFilter !== 'all' ? ` Tab: ${activeFilter}` : ''}
                          {searchQuery ? ` Search: "${searchQuery}"` : ''}
                        </strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-blue-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Primary Blogs grid rendering */}
                {processedBlogs.length > 0 ? (
                  <div id="blogs-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {processedBlogs.map((post) => (
                      <div
                        id={`blog-card-${post.id}`}
                        key={post.id}
                        onClick={() => handleSelectPost(post)}
                        className="group bg-white dark:bg-[#141414] cursor-pointer overflow-hidden rounded-2xl border border-gray-100 dark:border-neutral-800 hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm"
                      >
                        <div>
                          {/* Image box */}
                          <div className="relative aspect-video overflow-hidden bg-slate-50">
                            <img
                              src={post.image}
                              alt={currentLang === 'en' ? post.titleEn : post.titleBn}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute left-3 bottom-3 rounded-md bg-gray-950/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider border border-white/10">
                              {currentLang === 'en' ? post.categoryEn : post.categoryBn}
                            </span>
                          </div>

                          {/* Content block */}
                          <div className="p-5 space-y-2.5">
                            <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-wider font-sans">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {post.publishedAt}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {post.readTime}
                              </span>
                            </div>

                            <h4 className="text-sm md:text-base font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:text-orange-400 transition-colors line-clamp-2">
                              {currentLang === 'en' ? post.titleEn : post.titleBn}
                            </h4>

                            <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 line-clamp-3 leading-relaxed font-sans">
                              {currentLang === 'en' ? post.excerptEn : post.excerptBn}
                            </p>
                          </div>
                        </div>

                        {/* Author Bottom bar */}
                        <div className="p-5 pt-3 border-t border-gray-50 bg-slate-50/20 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-800">
                              <img src={post.authorPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} alt={post.author} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-600 dark:text-neutral-300 dark:text-neutral-600">{post.author.split(' ')[0]}</span>
                          </div>
                          <span className="text-[11px] font-bold text-blue-600 dark:text-orange-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                            <span>Read</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div id="blog-empty-state" className="text-center py-16 border border-dashed border-gray-200 dark:border-neutral-700 rounded-3xl max-w-md mx-auto space-y-3 bg-white dark:bg-[#141414]">
                    <HelpCircle className="h-10 w-10 text-gray-300 dark:text-neutral-500 mx-auto" />
                    <div className="space-y-1">
                      <span className="block text-sm text-gray-900 dark:text-white font-bold">No articles match parameters.</span>
                      <span className="block text-xs text-gray-400 dark:text-neutral-500">Try adjusting your filters or keywords to load posts.</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[11px] font-bold px-4 py-2 transition"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

              </div>

              {/* Right Sidebar Column: Sticky Widgets (4 Cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Widget 1: Inbound Newsletter subscription */}
                  <div id="newsletter-anchor" className="bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm text-left">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400 flex items-center gap-1">
                        <Newspaper className="h-3.5 w-3.5" />
                        Weekly Intelligence Newsletter
                      </span>
                      <h4 className="text-sm font-black text-gray-900 dark:text-white">Subscribe for SaaS playbooks</h4>
                      <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-sans">
                        Receive monthly SEO diagnostic checklists, custom Edge computing templates, and digital marketing insights directly to your inbox.
                      </p>
                    </div>

                    <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-2.5 text-xs text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold py-2.5 transition flex items-center justify-center gap-2"
                      >
                        <span>Join Subscriber Pool</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </form>

                    {newsletterSuccess && (
                      <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20 p-3 flex items-start gap-2 text-emerald-800 text-[11px] font-sans">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span>Success! You have been successfully registered to Next Solution newsletter pool.</span>
                      </div>
                    )}

                    {newsletterError && (
                      <div className="bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-100 dark:border-amber-500/20 p-3 flex items-start gap-2 text-amber-800 text-[11px] font-sans">
                        <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span>{newsletterError}</span>
                      </div>
                    )}
                  </div>

                  {/* Widget 2: Popular posts list */}
                  <div className="bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm text-left">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
                      <Flame className="h-4.5 w-4.5 text-amber-500 dark:text-amber-400" />
                      Popular Publications
                    </h4>
                    <div className="space-y-4">
                      {sidebarPopularPosts.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectPost(item)}
                          className="cursor-pointer group flex gap-3.5 items-start"
                        >
                          <div className="h-12 w-12 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-gray-100 dark:border-neutral-800">
                            <img src={item.image} alt={item.titleEn} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <h5 className="text-xs font-black text-gray-800 dark:text-neutral-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:text-orange-400 transition-colors">
                              {currentLang === 'en' ? item.titleEn : item.titleBn}
                            </h5>
                            <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-neutral-500 font-mono">
                              <span>{item.publishedAt}</span>
                              <span className="flex items-center gap-0.5">
                                <Eye className="h-3 w-3" />
                                {item.views || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Widget 3: Tag Cloud Filter */}
                  <div className="bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm text-left">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
                      <Hash className="h-4 w-4 text-blue-500 dark:text-orange-400" />
                      Tag Index Cloud
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {tagCloud.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSelectedTag(tag);
                            setSelectedPost(null);
                          }}
                          className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition border ${
                            selectedTag === tag
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-slate-50 border-gray-200/60 hover:bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-gray-800 dark:text-neutral-100'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Widget 4: Static Premium Advertisement Frame */}
                  <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-md text-left space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-blue-400 dark:text-orange-300 font-mono">Next Solution Ads</span>
                      <h4 className="text-xs font-bold leading-tight text-white">Scale your startup to $10M ARR with custom software</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                        Our specialized engineering squads deliver headless ecommerce, React dashboards, and automated CRM pipelines in weeks.
                      </p>
                    </div>
                    <button
                      onClick={() => { setTab('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-full text-center rounded-xl bg-blue-600 hover:bg-blue-500 dark:bg-orange-500 text-white text-[10px] font-bold py-2 transition"
                    >
                      Compare Sprints & Settle Retainers
                    </button>
                  </div>

                  {/* Widget 5: Social Channels */}
                  <div className="bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm text-left">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
                      <Globe className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400" />
                      Follow Social Nodes
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-500 dark:text-neutral-400 dark:text-neutral-500">
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 dark:text-orange-400 p-2 bg-slate-50 rounded-xl hover:bg-blue-50/20 dark:bg-orange-500/5 transition">
                        <span>LinkedIn</span>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-sky-500 p-2 bg-slate-50 rounded-xl hover:bg-sky-50/20 transition">
                        <span>Twitter/X</span>
                      </a>
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-black p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                        <span>GitHub</span>
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-red-500 dark:text-red-400 p-2 bg-slate-50 rounded-xl hover:bg-red-50/20 transition">
                        <span>YouTube</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* 3. CORE FAQ PREVIEW SUB-SECTION */}
            <div id="blog-faq-section" className="bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 md:p-10 space-y-8 shadow-sm">
              <div className="space-y-2 text-center max-w-2xl mx-auto">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-orange-400 block">Frequently Asked Questions</span>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">CMS & Digital Agency FAQs</h3>
                <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 font-sans leading-relaxed">
                  Learn about our collaborative model, design guidelines, code delivery, and search optimization standards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    q: 'How are blog posts deployed and managed in the CMS?',
                    a: 'All posts can be drafted, scheduled, or instantly published live from the secured Admin Dashboard tab. Any changes made to titles, contents, tags, and authors persist in the simulated database.'
                  },
                  {
                    q: 'Do your compiled web architectures meet Core Web Vitals?',
                    a: 'Yes! Next Solution guarantees 100/100 Lighthouse speed performance. We pre-render pages into flat static markup, load optimized WebP image frameworks, and ensure zero layout shifts.'
                  },
                  {
                    q: 'Can we configure multi-user editing roles in the dashboard?',
                    a: 'Absolutely. The Admin Panel allows creating different administrative accounts with customized roles, such as SuperAdmin (full controls) or Editor (content editing only).'
                  },
                  {
                    q: 'How does the automated semantic search engine optimize results?',
                    a: 'The blog incorporates dynamic client-side filtering, fuzzy matching across titles and contents, and structured tag catalogs so readers locate relevant intelligence in milliseconds.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-gray-50 bg-[#FAFAFA] space-y-2">
                    <h5 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-2">
                      <HelpCircle className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400 shrink-0" />
                      {item.q}
                    </h5>
                    <p className="text-[11px] text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-sans pl-6">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-bold text-blue-600 dark:text-orange-400 hover:underline flex items-center gap-1 justify-center mx-auto"
                >
                  <span>See more database-driven FAQs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* 4. FINAL COMPREHENSIVE CTA */}
            <div id="blog-footer-cta" className="rounded-3xl bg-gradient-to-r from-blue-600 dark:from-orange-500 to-indigo-700 text-white p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <h2 className="font-sans text-2xl md:text-4xl font-black leading-tight max-w-2xl mx-auto relative z-10">
                {currentLang === 'en' 
                  ? 'Ready to scale your digital presence with compiled Next-gen software?' 
                  : 'আপনার আইডিয়াকে সাফল্যের শিখরে নিয়ে যেতে প্রস্তুত?'}
              </h2>
              <p className="text-xs md:text-sm text-blue-100 max-w-lg mx-auto relative z-10 font-sans leading-relaxed">
                {currentLang === 'en' 
                  ? 'Collaborate with senior solutions architects, UI strategists, and SEO specialists. Book your 100% free consult today.'
                  : 'সিনিয়র সলিউশন আর্কিটেক্ট, ইউআই ডিজাইনার এবং এসইও বিশেষজ্ঞদের সাথে আপনার কাস্টম সফটওয়্যার ডিজাইন শুরু করুন।'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
                <button
                  id="final-cta-pricing-btn"
                  onClick={() => { setTab('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl bg-white dark:bg-[#141414] hover:bg-gray-50 dark:bg-neutral-900 text-blue-600 dark:text-orange-400 text-xs font-bold px-6 py-3.5 transition hover:scale-[1.02] shadow-md shadow-black/5"
                >
                  Book Consultation Now
                </button>
                <button
                  id="final-cta-contact-btn"
                  onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-6 py-3.5 transition hover:scale-[1.02]"
                >
                  Request Customized Quote
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
