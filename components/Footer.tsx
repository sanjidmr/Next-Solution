"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowUp, Facebook, Linkedin, Twitter, Instagram, Send, Check, ArrowRight, Sparkles } from 'lucide-react';
import { translations } from '@/data/translations';
import { createClient } from '@/lib/supabase/client';
import { contactRepository } from '@/repositories/contactRepository';
import { getPathForTab } from '@/config/navigation';

interface FooterProps {
  currentLang: 'en' | 'bn';
  setTab?: (tab: string) => void;
}

export default function Footer({ currentLang, setTab }: FooterProps) {
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
          setError(currentLang === 'en' ? 'Email is already subscribed!' : 'এই ইমেলটি ইতোমধ্যে সাবস্ক্রাইব করা হয়েছে!');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="relative bg-[#050505] text-gray-400 transition-colors duration-300 overflow-hidden">

      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-orange-500/[0.04] blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-orange-600/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-orange-400/[0.025] blur-[90px]" />
      </div>

      {/* ─── CTA BAND ─── */}
      <div className="relative border-b border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
              <Sparkles className="h-3.5 w-3.5" />
              {currentLang === 'en' ? 'Ready to Scale?' : 'স্কেল করতে প্রস্তুত?'}
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {currentLang === 'en' ? (
                <>Let&apos;s Build Something <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Extraordinary</span></>
              ) : (
                <>চলুন কিছু <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">অসাধারণ</span> তৈরি করি</>
              )}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-gray-500">
              {currentLang === 'en'
                ? 'Partner with a world-class team of engineers and designers to ship products that dominate your market.'
                : 'আপনার বাজারে আধিপত্য বিস্তারকারী পণ্য তৈরি করতে ইঞ্জিনিয়ার এবং ডিজাইনারদের একটি বিশ্বমানের টিমের সাথে যুক্ত হন।'}
              </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getPathForTab('contact')}
                onClick={() => handleQuickLink('contact')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:brightness-110"
              >
                {t.btnFreeQuote}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={getPathForTab('portfolio')}
                onClick={() => handleQuickLink('portfolio')}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                {t.heroCTASecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand — large column */}
          <div className="lg:col-span-5 space-y-6 text-center sm:text-left">
            <Link href={getPathForTab('home')} onClick={() => handleQuickLink('home')} className="inline-flex cursor-pointer items-center">
              <img src="/logow.png" alt="Next Solution" className="h-11 w-auto" />
            </Link>
            <p className="max-w-sm text-[13px] leading-relaxed text-gray-500 mx-auto sm:mx-0">
              {t.footerAbout}
            </p>
            {/* Social as premium pills */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 pt-1">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1C4XWLngUR/' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                { icon: Twitter, label: 'X', href: 'https://x.com/mrsanjid007' },
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/nextsolutionmym/' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-gray-400 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-5 text-center sm:text-left">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">{t.footerQuickLinks}</h3>
            <ul className="space-y-3">
              {[
                { id: 'home', label: t.navHome },
                { id: 'about', label: t.navAbout },
                { id: 'services', label: t.navServices },
                { id: 'portfolio', label: t.navPortfolio },
                { id: 'contact', label: t.navContact },
              ].map((link) => (
                <li key={link.id}>
                  <Link
                    href={getPathForTab(link.id as any)}
                    onClick={() => handleQuickLink(link.id)}
                    className="group/link inline-flex items-center gap-1.5 text-[13px] text-gray-500 transition-colors duration-200 hover:text-white"
                  >
                    <span className="inline-block h-px w-0 bg-orange-500 transition-all duration-300 group-hover/link:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-5 text-center sm:text-left">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">{t.footerServices}</h3>
            <ul className="space-y-3">
              {[
                { label: currentLang === 'en' ? 'Web Development' : 'ওয়েব ডেভেলপমেন্ট' },
                { label: currentLang === 'en' ? 'UI/UX Design' : 'ইউআই/ইউএক্স ডিজাইন' },
                { label: currentLang === 'en' ? 'SEO & Analytics' : 'এসইও ও অ্যানালিটিক্স' },
                { label: currentLang === 'en' ? 'Digital Marketing' : 'ডিজিটাল মার্কেটিং' },
                { label: currentLang === 'en' ? 'Brand Strategy' : 'ব্র্যান্ড কৌশল' },
              ].map((svc) => (
                <li key={svc.label}>
                  <Link
                    href={getPathForTab('services')}
                    onClick={() => handleQuickLink('services')}
                    className="group/link inline-flex items-center gap-1.5 text-[13px] text-gray-500 transition-colors duration-200 hover:text-white"
                  >
                    <span className="inline-block h-px w-0 bg-orange-500 transition-all duration-300 group-hover/link:w-3" />
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-5 text-center sm:text-left">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">{t.footerContact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <MapPin className="h-3.5 w-3.5 text-orange-500" />
                </span>
                <span className="text-[13px] leading-relaxed text-gray-500">
                  {currentLang === 'en' ? 'Suite 404, Silicon High-Street, Dhaka, Bangladesh' : 'স্যুট ৪০৪, সিলিকন হাই-স্ট্রিট, ঢাকা, বাংলাদেশ'}
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <Phone className="h-3.5 w-3.5 text-orange-500" />
                </span>
                <a href="tel:+8801955417215" className="text-[13px] text-gray-500 transition-colors hover:text-white">+880 1955 417215</a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <Mail className="h-3.5 w-3.5 text-orange-500" />
                </span>
                <a href="mailto:hello@nextsolution.co" className="text-[13px] text-gray-500 transition-colors hover:text-white">hello@nextsolution.co</a>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <Clock className="h-3.5 w-3.5 text-orange-500" />
                </span>
                <div>
                  <span className="block text-[13px] font-medium text-gray-300">{t.footerWorkingHours}</span>
                  <span className="text-[12px] text-gray-600">{currentLang === 'en' ? 'Mon – Fri: 9 AM – 6 PM (GMT+6)' : 'সোম – শুক্র: ৯ AM – ৬ PM (GMT+৬)'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── NEWSLETTER ─── */}
        <div className="mt-16 rounded-2xl border border-white/[0.05] bg-white/[0.015] p-8 sm:p-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h4 className="text-base font-bold text-white">{t.footerNewsletterTitle}</h4>
              <p className="mt-1 text-[13px] text-gray-500">{t.footerNewsletterSub}</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col gap-2">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footerNewsletterPlaceholder}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[13px] text-white placeholder-gray-600 transition-all duration-300 focus:border-orange-500/40 focus:bg-white/[0.06] focus:outline-none"
                  />
                  {error && <span className="absolute -bottom-5 left-0 text-[10px] text-red-400">{error}</span>}
                </div>
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 text-[13px] font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:brightness-110"
                >
                  {isSubscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                  <span className="hidden sm:inline">{isSubscribed ? (currentLang === 'en' ? 'Subscribed' : 'যুক্ত হয়েছেন') : t.footerSubscribeBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="relative border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[12px] text-gray-600">
              &copy; {new Date().getFullYear()} Next Solution. {t.footerRights}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { id: 'privacy_policy', label: currentLang === 'en' ? 'Privacy Policy' : 'গোপনীয়তা নীতি' },
                { id: 'terms_conditions', label: currentLang === 'en' ? 'Terms & Conditions' : 'শর্তাবলী' },
                { id: 'cookie_policy', label: currentLang === 'en' ? 'Cookie Policy' : 'কুকি নীতি' },
                { id: 'admin', label: currentLang === 'en' ? 'Admin' : 'অ্যাডমিন' },
              ].map((link) => (
                <Link
                  key={link.id}
                  id={`footer-link-${link.id}`}
                  href={getPathForTab(link.id as any)}
                  onClick={() => handleQuickLink(link.id)}
                  className="text-[12px] text-gray-600 transition-colors duration-200 hover:text-orange-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="group/top flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-gray-500 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover/top:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
