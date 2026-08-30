"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle, Smartphone, 
  ExternalLink, AlertCircle, MessageSquare, HelpCircle, Shield
} from 'lucide-react';
import { translations } from '@/data/translations';
import { addMessage, getServices } from '@/lib/db';

// Default services for server-side rendering fallback
const defaultServices = [
  { id: 1, titleEn: 'Web Development', titleBn: 'à¦“à¦¯à¦¼à§‡à¦¬ à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ' },
  { id: 2, titleEn: 'Mobile App', titleBn: 'à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦…à§à¦¯à¦¾à¦ª' },
  { id: 3, titleEn: 'UI/UX Design', titleBn: 'à¦‡à¦‰à¦†à¦‡/à¦‰à¦‡à¦•à§à¦¸ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨' },
  { id: 4, titleEn: 'Graphic Design', titleBn: 'à¦—à§à¦°à¦¾à¦«à¦¿à¦•à§à¦¸ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨' },
  { id: 5, titleEn: 'Video Editing', titleBn: 'à¦­à¦¿à¦¡à¦¿à¦“ à¦à¦¡à¦¿à¦Ÿà¦¿à¦‚' },
  { id: 6, titleEn: 'Digital Marketing', titleBn: 'à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿà¦¿à¦‚' },
  { id: 7, titleEn: 'AI Automation', titleBn: 'à¦à¦†à¦‡ à¦…à¦Ÿà§‹à¦®à§‡à¦¶à¦¨' },
  { id: 8, titleEn: 'SEO', titleBn: 'à¦à¦¸à¦‡à¦“' }
];


interface ContactSectionProps {
  currentLang: 'en' | 'bn';
  isFullPage?: boolean;
}

export default function ContactSection({ currentLang, isFullPage = false }: ContactSectionProps) {
  const t = translations[currentLang];
  const [services, setServices] = useState<any[]>(defaultServices);
  useEffect(() => {
    setServices(getServices());
  }, []);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  
  // UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Prepopulate if CTA sent parameters in SessionStorage
  useEffect(() => {
    const preService = sessionStorage.getItem('pre_selected_service');
    const preMessage = sessionStorage.getItem('pre_selected_message');

    if (preService) {
      setService(preService);
      sessionStorage.removeItem('pre_selected_service');
    }
    if (preMessage) {
      setMessage(preMessage);
      sessionStorage.removeItem('pre_selected_message');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg(currentLang === 'en' ? 'All fields with * are required.' : 'à¦šà¦¿à¦¹à§à¦¨à¦¿à¦¤ à¦˜à¦°à¦—à§à¦²à§‹ à¦ªà§‚à¦°à¦£ à¦•à¦°à¦¾ à¦†à¦¬à¦¶à§à¦¯à¦•à¥¤');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg(currentLang === 'en' ? 'Please enter a valid email address.' : 'à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦¸à¦ à¦¿à¦• à¦‡à¦®à§‡à¦² à¦à¦¡à§à¦°à§‡à¦¸ à¦¦à¦¿à¦¨à¥¤');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: `Service Request: ${service || 'General Inquiry'}`,
      message: message.trim(),
      service: service || 'Not Specified',
      budget: budget || 'Not Specified'
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('contact-api-failed');
    } catch {
      addMessage(payload);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Clear fields
    setName('');
    setEmail('');
    setPhone('');
    setService('');
    setBudget('');
    setMessage('');
  };

  return (
    <section id="contact-section" data-space-page className={`bg-gradient-to-b from-white via-gray-50/50 to-gray-50 dark:from-[#080808] dark:via-[#080808] dark:to-[#0a0a0a] ${isFullPage ? 'min-h-screen' : 'py-20'}`}>
      
      {/* ─── HERO SECTION ─── */}
      <div data-space-hero className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-gray-50 dark:from-[#080808] dark:via-[#080808] dark:to-[#0a0a0a]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.04] dark:bg-orange-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.03] dark:bg-orange-400/[0.04] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left — Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">
                  {currentLang === 'en' ? 'Get In Touch' : 'যোগাযোগ করুন'}
                </span>
              </div>

              <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.2rem] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white">
                {currentLang === 'en' ? (
                  <>Let's Build Something<br /><span className="text-orange-500">Amazing Together</span></>
                ) : (
                  <>চলুন একসাথে কিছু<br /><span className="text-orange-500">অসাধারণ তৈরি করি</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400 leading-relaxed max-w-lg">
                {currentLang === 'en'
                  ? "Have a project in mind? We'd love to hear about it. Reach out and our team will get back to you within 24 hours with a free consultation."
                  : 'আপনার প্রজেক্ট নিয়ে কিছু মাথায় আছে? আমরা শুনতে চাই। যোগাযোগ করুন, আমাদের দল ২৪ ঘণ্টার মধ্যে ফিরে আসবে।'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-neutral-400">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <span>{currentLang === 'en' ? '+880 1711 000000' : '+৮৮০ ১৭১১ ০০০০০০'}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-neutral-400">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <span>hello@nextsolution.co</span>
                </div>
              </div>
            </div>

            {/* Right — Info Cards */}
            <div className="space-y-4">
              {/* Response time card */}
              <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{currentLang === 'en' ? 'Quick Response' : 'দ্রুত উত্তর'}</p>
                    <p className="text-xs text-gray-500 dark:text-neutral-400">{currentLang === 'en' ? 'We reply within 24 hours' : 'আমরা ২৪ ঘণ্টার মধ্যে উত্তর দিই'}</p>
                  </div>
                </div>
              </div>

              {/* Free consultation card */}
              <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-500">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{currentLang === 'en' ? 'Free Consultation' : 'ফ্রি কনসালটেশন'}</p>
                    <p className="text-xs text-gray-500 dark:text-neutral-400">{currentLang === 'en' ? 'No-obligation project review' : 'কোনো বাধ্যবাধকতা ছাড়া পর্যালোচনা'}</p>
                  </div>
                </div>
              </div>

              {/* Secure info card */}
              <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-orange-500/10 text-emerald-600 dark:text-orange-500">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{currentLang === 'en' ? '100% Secure' : '১০০% নিরাপদ'}</p>
                    <p className="text-xs text-gray-500 dark:text-neutral-400">{currentLang === 'en' ? 'Your data is encrypted & safe' : 'আপনার তথ্য এনক্রিপ্ট ও নিরাপদ'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FORM + INFO SECTION ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Form Container (Left Column) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-neutral-700/60 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            {isSuccess ? (
              <div id="contact-success" className="text-center py-12 space-y-6 max-w-md mx-auto my-auto">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-100">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Message Sent Successfully!' : 'à¦¬à¦¾à¦°à§à¦¤à¦¾ à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à§Ÿà§‡à¦›à§‡!'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                    {t.contactSuccessMessage}
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 transition shadow-md"
                >
                  {currentLang === 'en' ? 'Send Another Message' : 'à¦†à¦°à§‡à¦•à¦Ÿà¦¿ à¦¬à¦¾à¦°à§à¦¤à¦¾ à¦ªà¦¾à¦ à¦¾à¦¨'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                      {t.contactNameLabel} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={currentLang === 'en' ? 'e.g. John Doe' : 'à¦¯à§‡à¦®à¦¨: à¦œà¦¨ à¦¡à§‹'}
                      className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-sm text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition dark:focus:border-orange-500 dark:focus:ring-orange-500/20"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                      {t.contactEmailLabel} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={currentLang === 'en' ? 'e.g. john@example.com' : 'à¦¯à§‡à¦®à¦¨: john@example.com'}
                      className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-sm text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition dark:focus:border-orange-500 dark:focus:ring-orange-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                      {t.contactPhoneLabel} *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={currentLang === 'en' ? 'e.g. +880 1700-000000' : 'à¦¯à§‡à¦®à¦¨: +à§®à§®à§¦ à§§à§­à§¦à§¦-à§¦à§¦à§¦à§¦à§¦à§¦'}
                      className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-sm text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition dark:focus:border-orange-500 dark:focus:ring-orange-500/20"
                    />
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-budget" className="block text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                      {t.contactBudgetLabel}
                    </label>
                    <select
                      id="contact-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-sm text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition dark:focus:border-orange-500 dark:focus:ring-orange-500/20"
                    >
                      <option value="">{currentLang === 'en' ? 'Select estimated budget' : 'à¦†à¦¨à§à¦®à¦¾à¦¨à¦¿à¦• à¦¬à¦¾à¦œà§‡à¦Ÿ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨'}</option>
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="Over $25,000">Over $25,000</option>
                    </select>
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-service" className="block text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                    {t.contactServiceLabel}
                  </label>
<select
                      id="contact-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-sm text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition dark:focus:border-orange-500 dark:focus:ring-orange-500/20"
                    >
                      <option value="">{currentLang === 'en' ? 'Select a capability' : 'সার্ভিস নির্বাচন করুন'}</option>
                      {(services || defaultServices).map((srv) => (
                        <option key={srv.id} value={currentLang === 'en' ? srv.titleEn : srv.titleBn}>
                          {currentLang === 'en' ? srv.titleEn : srv.titleBn}
                        </option>
                      ))}
                      <option value="Other / General">{currentLang === 'en' ? 'Other / General Consultation' : 'অন্যান্য / সাধারণ কনসালটেশন'}</option>
                    </select>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 dark:text-neutral-200 uppercase tracking-wider">
                    {t.contactMessageLabel} *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={currentLang === 'en' ? 'Describe your project goals, milestones, and design requirements...' : 'à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿà§‡à¦° à¦²à¦•à§à¦·à§à¦¯ à¦à¦¬à¦‚ à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨à§€à§Ÿà¦¤à¦¾ à¦‰à¦²à§à¦²à§‡à¦– à¦•à¦°à§à¦¨...'}
                    className="w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-sm text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition dark:focus:border-orange-500 dark:focus:ring-orange-500/20 resize-none"
                  />
                </div>

                {/* Error Box */}
                {errorMsg && (
                  <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 text-xs font-bold text-red-600 dark:text-red-400 flex items-center space-x-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 border-t border-gray-200 dark:border-neutral-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-neutral-500">
                    <Shield className="h-4 w-4 text-gray-300 dark:text-neutral-500" />
                    <span>{currentLang === 'en' ? 'Your info is secure and never shared.' : 'à¦†à¦ªà¦¨à¦¾à¦° à¦¤à¦¥à§à¦¯ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦•à¦¾à¦›à§‡ à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦¨à¦¿à¦°à¦¾à¦ªà¦¦à¥¤'}</span>
                  </div>
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition shadow-sm shadow-orange-600/20 hover:shadow-lg hover:shadow-orange-600/30 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? t.btnLoading : t.btnSendMessage}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info (Right Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Headquarters details card */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-neutral-700/60 p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-neutral-700/60 pb-3">
                {t.contactOfficeHeader}
              </h3>
              
              <ul className="space-y-4 text-sm text-gray-600 dark:text-neutral-300">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-orange-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Suite 404, Silicon High-Street, Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-blue-600 dark:text-orange-400 shrink-0" />
                  <a href="tel:+8801711000000" className="hover:text-blue-600 dark:text-orange-400 transition font-mono">+880 1711 000000</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-orange-400 shrink-0" />
                  <a href="mailto:hello@nextsolution.co" className="hover:text-blue-600 dark:text-orange-400 transition font-mono">hello@nextsolution.co</a>
                </li>
                <li className="flex items-start space-x-3 pt-2 border-t border-gray-50 dark:border-neutral-800">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-orange-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="block font-bold text-gray-800 dark:text-neutral-100 text-xs uppercase tracking-wider">{t.footerWorkingHours}</span>
                    <span className="text-xs text-gray-500 dark:text-neutral-400">Mon - Fri: 9:00 AM - 6:00 PM (GMT+6)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick social links or ways to connect */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-neutral-700/60 p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-neutral-700/60 pb-3">
                {t.contactSocialsHeader}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://wa.me/8801711000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100/80 text-xs font-bold text-emerald-700 transition shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="h-4.5 w-4.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.42 1.452 5.378 0 9.755-4.379 9.758-9.76.002-2.58-1.003-5.006-2.83-6.835-1.828-1.829-4.253-2.835-6.834-2.835-5.381 0-9.76 4.379-9.764 9.76-.002 1.96.512 3.878 1.492 5.589l-.982 3.582 3.69-.968zm11.393-5.263c-.314-.157-1.858-.917-2.143-1.02-.285-.104-.493-.157-.7.157-.207.315-.802 1.02-.984 1.229-.182.208-.363.235-.677.079-.314-.158-1.324-.487-2.523-1.557-.932-.832-1.56-1.86-1.742-2.175-.182-.315-.02-.485.137-.642.141-.14.314-.367.47-.55.157-.183.21-.314.314-.525.104-.21.052-.394-.026-.55-.078-.157-.7-1.687-.958-2.31-.252-.603-.508-.522-.7-.522-.182-.001-.391-.001-.6-.001-.21 0-.55.079-.838.394-.287.315-1.097 1.073-1.097 2.617 0 1.543 1.123 3.031 1.279 3.241.157.21 2.21 3.374 5.353 4.73.748.322 1.332.514 1.787.658.751.238 1.436.205 1.978.124.604-.09 1.858-.76 2.117-1.457.26-.697.26-1.294.182-1.42-.078-.125-.285-.207-.6-.364z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                </a>
                <a
                  href="https://m.me/nextsolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-blue-100 dark:border-orange-500/20 bg-blue-50 dark:bg-orange-500/10 hover:bg-blue-100/80 text-xs font-bold text-blue-700 transition shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="h-4.5 w-4.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.11C24 4.974 18.627 0 12 0zm1.282 14.803l-3.072-3.277-5.992 3.277 6.589-7.001 3.123 3.277 5.941-3.277-6.589 7.001z"/>
                    </svg>
                    <span>Messenger</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-blue-500 dark:text-orange-400" />
                </a>
              </div>
            </div>

            {/* Micro FAQ or Consultation assurance */}
            <div className="rounded-2xl border border-blue-100 dark:border-orange-500/20 bg-blue-50/50 dark:bg-orange-500/5 p-6 space-y-2.5">
              <div className="flex items-center space-x-2 text-blue-700">
                <MessageSquare className="h-4.5 w-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider">{currentLang === 'en' ? 'Free Consultation' : 'à¦«à§à¦°à¦¿ à¦•à¦¨à¦¸à¦¾à¦²à¦Ÿà§‡à¦¶à¦¨'}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
                {currentLang === 'en'
                  ? 'All inquiries receive a complimentary initial review and project strategy brief within 1 business day.'
                  : 'à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦¬à¦¾à¦°à§à¦¤à¦¾à¦° à¦œà¦¨à§à¦¯ à¦†à¦®à¦°à¦¾ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦¿à¦¨à¦¿à§Ÿà¦° à¦Ÿà¦¿à¦®à§‡à¦° à¦ªà¦•à§à¦· à¦¥à§‡à¦•à§‡ à§§ à¦•à¦°à§à¦®à¦¦à¦¿à¦¬à¦¸à§‡à¦° à¦®à¦§à§à¦¯à§‡ à¦à¦•à¦Ÿà¦¿ à¦«à§à¦°à¦¿ à¦•à¦¨à¦¸à¦¾à¦²à¦Ÿà§‡à¦¶à¦¨ à¦°à¦¿à¦ªà§‹à¦°à§à¦Ÿ à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à¦¿à¥¤'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
