"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, ThumbsUp, Sparkles, MessageCircle } from 'lucide-react';
import { translations } from '@/data/translations';
import { getFAQs, saveFAQ } from '@/lib/db';
import { FAQ } from '@/types';

interface FAQSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

export default function FAQSection({ currentLang, setTab, isFullPage = false }: FAQSectionProps) {
  const t = translations[currentLang];
  const [faqs, setFaqs] = useState<FAQ[]>(() => getFAQs());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [votedIds, setVotedIds] = useState<Set<string>>(() => new Set());

  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      const term = searchQuery.trim().toLowerCase();
      if (!term) return true;

      const q = (currentLang === 'en' ? faq.questionEn : faq.questionBn).toLowerCase();
      const a = (currentLang === 'en' ? faq.answerEn : faq.answerBn).toLowerCase();
      const cat = (currentLang === 'en' ? faq.categoryEn : faq.categoryBn).toLowerCase();

      return q.includes(term) || a.includes(term) || cat.includes(term);
    });
  }, [faqs, searchQuery, currentLang]);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleVoteHelpful = (e: React.MouseEvent, faqId: string) => {
    e.stopPropagation(); // Avoid triggering accordion toggle
    if (votedIds.has(faqId)) return; // Already voted

    const updatedFaqs = faqs.map(item => {
      if (item.id === faqId) {
        const updated = { ...item, helpfulCount: item.helpfulCount + 1 };
        saveFAQ(updated); // Update in localStorage db
        return updated;
      }
      return item;
    });

    setFaqs(updatedFaqs);
    setVotedIds(prev => {
      const copy = new Set(prev);
      copy.add(faqId);
      return copy;
    });
  };

  return (
    <section id="faq-section" className={`bg-white dark:bg-[#141414] py-20 ${isFullPage ? 'min-h-screen py-24' : ''}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
            {currentLang === 'en' ? 'COMMON QUERIES' : 'সাধারণ জিজ্ঞাসাসমূহ'}
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t.sectionFAQTitle}
          </h2>
          <p className="text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500">
            {t.sectionFAQSub}
          </p>
        </div>

        {/* Search Bar */}
        <div id="faq-search-row" className="relative w-full max-w-md mx-auto mb-12">
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-400 dark:text-neutral-500" />
          <input
            id="faq-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'en' ? 'Type keywords to filter questions...' : 'প্রশ্ন ফিল্টার করতে কিওয়ার্ড লিখুন...'}
            className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-11 py-3.5 text-sm text-gray-800 dark:text-neutral-100 placeholder-gray-400 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>

        {/* FAQs Accordion Block */}
        {filteredFAQs.length > 0 ? (
          <div id="faq-accordion-container" className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              const hasVoted = votedIds.has(faq.id);

              return (
                <div
                  id={`faq-item-${faq.id}`}
                  key={faq.id}
                  onClick={() => toggleAccordion(faq.id)}
                  className={`rounded-2xl border bg-white dark:bg-[#141414] p-5 cursor-pointer transition duration-300 ${
                    isExpanded
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200/60 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  {/* Accordion trigger row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 text-left">
                      <HelpCircle className={`h-5 w-5 shrink-0 transition duration-300 ${isExpanded ? 'text-blue-500 dark:text-orange-400' : 'text-gray-400 dark:text-neutral-500'}`} />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {currentLang === 'en' ? faq.questionEn : faq.questionBn}
                      </span>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-neutral-400 dark:text-neutral-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 dark:text-neutral-500" />
                      )}
                    </div>
                  </div>

                  {/* Accordion Collapsible panel */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-4">
                      <p className="text-xs md:text-sm leading-relaxed text-gray-600 dark:text-neutral-300 dark:text-neutral-600">
                        {currentLang === 'en' ? faq.answerEn : faq.answerBn}
                      </p>
                      
                      {/* Voting and category sub-row */}
                      <div className="flex items-center justify-between text-[10px] font-semibold text-gray-400 dark:text-neutral-500 pt-2">
                        <span className="rounded bg-white dark:bg-[#141414] border border-gray-200 dark:border-neutral-700 px-2 py-0.5 uppercase tracking-wider">
                          {currentLang === 'en' ? faq.categoryEn : faq.categoryBn}
                        </span>
                        
                        {/* Vote trigger */}
                        <div className="flex items-center space-x-2">
                          <span>{currentLang === 'en' ? 'Was this helpful?' : 'এটি কি সহায়ক ছিল?'}</span>
                          <button
                            id={`faq-vote-btn-${faq.id}`}
                            onClick={(e) => handleVoteHelpful(e, faq.id)}
                            disabled={hasVoted}
                            className={`flex items-center space-x-1 rounded-md px-2 py-1 border transition duration-200 ${
                              hasVoted
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 text-emerald-600 dark:text-emerald-400'
                                : 'hover:bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-400 dark:text-neutral-500'
                            }`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                            <span>{faq.helpfulCount}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div id="faq-empty-state" className="text-center py-16 border border-dashed border-gray-200 dark:border-neutral-700 rounded-2xl max-w-md mx-auto">
            <span className="block text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 font-medium">
              {currentLang === 'en' ? 'No FAQs match your keyword criteria.' : 'আপনার কিওয়ার্ডের সাথে মিলে কোনো প্রশ্নোত্তর পাওয়া যায়নি।'}
            </span>
          </div>
        )}

        {/* FAQ CTA bottom banner */}
        <div id="faq-footer-banner" className="mt-16 text-center bg-[#FAFAFA] dark:bg-[#1a1a1a] border border-gray-100 dark:border-neutral-800 p-6 rounded-2xl space-y-4">
          <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
            <Sparkles className="h-4.5 w-4.5 text-blue-500 dark:text-orange-400" />
            <span>{currentLang === 'en' ? 'Still have lingering questions?' : 'এখনও কোনো অমীমাংসিত প্রশ্ন আছে?'}</span>
          </h4>
          <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 max-w-md mx-auto">
            {currentLang === 'en' ? 'Get direct answers from a partner regarding server compliance, pricing, or custom code warranties.' : 'সার্ভার কমপ্লায়েন্স, বাজেট বা কাস্টম কোড ওয়ারেন্টি সম্পর্কে সরাসরি উত্তর পেতে আমাদের সাথে যোগাযোগ করুন।'}
          </p>
          <button
            id="faq-contact-cta"
            onClick={() => setTab('contact')}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 transition flex items-center space-x-1.5 mx-auto shadow-md shadow-blue-600/10"
          >
            <MessageCircle className="h-4 w-4 text-white" />
            <span>{currentLang === 'en' ? 'Contact Engineers' : 'ইঞ্জিনিয়ারদের সাথে কথা বলুন'}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
