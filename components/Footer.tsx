"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, Mail, Phone, MapPin, Clock, ArrowUp, Facebook, Linkedin, Twitter, Instagram, Send, Check } from 'lucide-react';
import { translations } from '@/data/translations';
import { createClient } from '@/lib/supabase/client';
import { contactRepository } from '@/repositories/contactRepository';
import { getPathForTab } from '@/config/navigation';

interface FooterProps {
  currentLang: 'en' | 'bn';
  setTab?: (tab: string) => void;
}

export default function Footer({ currentLang, setTab }: FooterProps) {
  const router = useRouter();
  const t = translations[currentLang];
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError(currentLang === 'en' ? 'Please enter your email.' : 'অনুগ্রহ করে আপনার ইমেল দিন।');
      return;
    }
    
    const supabase = createClient();
    contactRepository.addSubscriber(supabase, email)
      .then(success => {
        if (success) {
          setIsSubscribed(true);
          setEmail('');
          setTimeout(() => setIsSubscribed(false), 5000);
        } else {
          setError(currentLang === 'en' ? 'Email is already subscribed!' : 'এই ইমেলটি ইতোমধ্যে সাবস্ক্রাইব করা হয়েছে!');
        }
      })
      .catch(() => {
        setError(currentLang === 'en' ? 'An error occurred. Try again.' : 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
      });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLink = (tabId: string) => {
    if (setTab) {
      setTab(tabId);
    }
    const path = getPathForTab(tabId as any);
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-white text-gray-500 border-t border-gray-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Info */}
          <div id="footer-col-brand" className="lg:col-span-4 space-y-6">
            <div onClick={() => handleQuickLink('home')} className="flex cursor-pointer items-center space-x-2">
              <img src="/logo.jpg" alt="Next Solution" className="h-12 w-auto rounded-lg" />
              <span className="text-lg font-bold text-gray-900 tracking-tight">Next Solution</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-gray-400 max-w-xs">
              {t.footerAbout}
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-400 hover:text-blue-600 border border-gray-200 hover:bg-gray-50 transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-400 hover:text-blue-600 border border-gray-200 hover:bg-gray-50 transition">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-400 hover:text-blue-600 border border-gray-200 hover:bg-gray-50 transition">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-400 hover:text-blue-600 border border-gray-200 hover:bg-gray-50 transition">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div id="footer-col-nav" className="sm:col-span-6 lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">{t.footerQuickLinks}</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              {[
                { id: 'home', label: t.navHome },
                { id: 'about', label: t.navAbout },
                { id: 'portfolio', label: t.navPortfolio },
                { id: 'pricing', label: t.navPricing },
                { id: 'blogs', label: t.navBlogs },
                { id: 'faq', label: t.navFAQ },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleQuickLink(link.id)}
                    className="hover:text-blue-600 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Links */}
          <div id="footer-col-services" className="sm:col-span-6 lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">{t.footerServices}</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <button onClick={() => handleQuickLink('services')} className="hover:text-blue-600 transition-colors text-left">
                  {currentLang === 'en' ? 'Enterprise Web Development' : 'ওয়েব ডেভেলপমেন্ট'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('services')} className="hover:text-blue-600 transition-colors text-left">
                  {currentLang === 'en' ? 'UI/UX Product Design' : 'ইউআই/ইউএক্স ডিজাইন'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('services')} className="hover:text-blue-600 transition-colors text-left">
                  {currentLang === 'en' ? 'SEO Search Dominance' : 'এসইও অপ্টিমাইজেশন'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('services')} className="hover:text-blue-600 transition-colors text-left">
                  {currentLang === 'en' ? 'Digital Growth' : 'ডিজিটাল মার্কেটিং'}
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('services')} className="hover:text-blue-600 transition-colors text-left">
                  {currentLang === 'en' ? 'Brand Strategy' : 'ব্র্যান্ড আইডেন্টিটি'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts / Office */}
          <div id="footer-col-contact" className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">{t.footerContact}</h3>
            <ul className="space-y-3 text-xs md:text-sm text-gray-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                <span>{currentLang === 'en' ? 'Suite 404, Silicon High-Street, Dhaka, Bangladesh' : 'স্যুট ৪০৪, সিলিকন হাই-স্ট্রিট, ঢাকা, বাংলাদেশ'}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                <a href="tel:+8801711000000" className="hover:text-blue-600 transition">+880 1711 000000</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                <a href="mailto:hello@nextsolution.co" className="hover:text-blue-600 transition">hello@nextsolution.co</a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-gray-700 font-semibold">{t.footerWorkingHours}</span>
                  <span className="text-xs text-gray-400">{currentLang === 'en' ? 'Mon - Fri: 9:00 AM - 6:00 PM (GMT+6)' : 'সোম - শুক্র: সকাল ৯:০০ - সন্ধ্যা ৬:০০ (জিএমটি+৬)'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div id="footer-newsletter-row" className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-1">
            <h4 className="text-sm font-bold text-gray-900">{t.footerNewsletterTitle}</h4>
            <p className="text-xs text-gray-500">{t.footerNewsletterSub}</p>
          </div>
          <div className="md:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md md:ml-auto">
              <div className="relative flex-grow">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footerNewsletterPlaceholder}
                  className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-xs px-4 py-3 focus:outline-none focus:border-blue-500 transition duration-200"
                />
                {error && <span className="absolute left-0 -bottom-5 text-[10px] text-red-500">{error}</span>}
              </div>
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 transition flex items-center justify-center space-x-2 shadow-sm"
              >
                {isSubscribed ? <Check className="h-4 w-4 text-white" /> : <Send className="h-4 w-4 text-white" />}
                <span>{isSubscribed ? (currentLang === 'en' ? 'Subscribed' : 'যুক্ত হয়েছেন') : t.footerSubscribeBtn}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright / policy row */}
        <div id="footer-bottom-row" className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Next Solution. {t.footerRights}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
            <button 
              id="footer-link-privacy"
              onClick={() => handleQuickLink('privacy_policy')} 
              className="hover:text-blue-600 transition"
            >
              {currentLang === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি'}
            </button>
            <button 
              id="footer-link-terms"
              onClick={() => handleQuickLink('terms_conditions')} 
              className="hover:text-blue-600 transition"
            >
              {currentLang === 'en' ? 'Terms & Conditions' : 'শর্তাবলী'}
            </button>
            <button 
              id="footer-link-cookies"
              onClick={() => handleQuickLink('cookie_policy')} 
              className="hover:text-blue-600 transition"
            >
              {currentLang === 'en' ? 'Cookie Policy' : 'কুকি নীতি'}
            </button>
            <button 
              id="footer-link-admin"
              onClick={() => handleQuickLink('admin')} 
              className="hover:text-blue-600 transition"
            >
              {currentLang === 'en' ? 'Admin Panel' : 'অ্যাডমিন প্যানেল'}
            </button>
          </div>
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white hover:bg-gray-50 text-gray-400 hover:text-blue-600 transition border border-gray-200"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
