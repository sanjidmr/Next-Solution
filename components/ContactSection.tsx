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

interface ContactSectionProps {
  currentLang: 'en' | 'bn';
  isFullPage?: boolean;
}

export default function ContactSection({ currentLang, isFullPage = false }: ContactSectionProps) {
  const t = translations[currentLang];
  const services = getServices();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg(currentLang === 'en' ? 'All fields with * are required.' : 'চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক।');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg(currentLang === 'en' ? 'Please enter a valid email address.' : 'অনুগ্রহ করে সঠিক ইমেল এড্রেস দিন।');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: `Service Request: ${service || 'General Inquiry'}`,
        message: message.trim(),
        service: service || 'Not Specified',
        budget: budget || 'Not Specified'
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setBudget('');
      setMessage('');
    }, 1000);
  };

  return (
    <section id="contact-section" className={`bg-gray-50 py-20 ${isFullPage ? 'min-h-screen py-24' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 px-3 py-1 bg-blue-50 rounded-full inline-block">
            {currentLang === 'en' ? 'Get In Touch' : 'যোগাযোগ করুন'}
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.sectionContactTitle}
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            {t.sectionContactSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Form Container (Left Column) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            {isSuccess ? (
              <div id="contact-success" className="text-center py-12 space-y-6 max-w-md mx-auto my-auto">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-100">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentLang === 'en' ? 'Message Sent Successfully!' : 'বার্তা সফলভাবে পাঠানো হয়েছে!'}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t.contactSuccessMessage}
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 transition shadow-md"
                >
                  {currentLang === 'en' ? 'Send Another Message' : 'আরেকটি বার্তা পাঠান'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {t.contactNameLabel} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={currentLang === 'en' ? 'e.g. John Doe' : 'যেমন: জন ডো'}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {t.contactEmailLabel} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={currentLang === 'en' ? 'e.g. john@example.com' : 'যেমন: john@example.com'}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {t.contactPhoneLabel} *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={currentLang === 'en' ? 'e.g. +880 1700-000000' : 'যেমন: +৮৮০ ১৭০০-০০০০০০'}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition"
                    />
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-budget" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {t.contactBudgetLabel}
                    </label>
                    <select
                      id="contact-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition"
                    >
                      <option value="">{currentLang === 'en' ? 'Select estimated budget' : 'আনুমানিক বাজেট নির্বাচন করুন'}</option>
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="Over $25,000">Over $25,000</option>
                    </select>
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-service" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    {t.contactServiceLabel}
                  </label>
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition"
                  >
                    <option value="">{currentLang === 'en' ? 'Select a capability' : 'সার্ভিস নির্বাচন করুন'}</option>
                    {services.map((srv) => (
                      <option key={srv.id} value={currentLang === 'en' ? srv.titleEn : srv.titleBn}>
                        {currentLang === 'en' ? srv.titleEn : srv.titleBn}
                      </option>
                    ))}
                    <option value="Other / General">{currentLang === 'en' ? 'Other / General Consultation' : 'অন্যান্য / সাধারণ কনসালটেশন'}</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    {t.contactMessageLabel} *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={currentLang === 'en' ? 'Describe your project goals, milestones, and design requirements...' : 'আপনার প্রজেক্টের লক্ষ্য এবং প্রয়োজনীয়তা উল্লেখ করুন...'}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition resize-none"
                  />
                </div>

                {/* Error Box */}
                {errorMsg && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-xs font-bold text-red-600 flex items-center space-x-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Shield className="h-4 w-4 text-gray-300" />
                    <span>{currentLang === 'en' ? 'Your info is secure and never shared.' : 'আপনার তথ্য আমাদের কাছে সম্পূর্ণ নিরাপদ।'}</span>
                  </div>
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition shadow-sm hover:shadow disabled:opacity-50"
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
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
                {t.contactOfficeHeader}
              </h3>
              
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Suite 404, Silicon High-Street, Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-blue-600 shrink-0" />
                  <a href="tel:+8801711000000" className="hover:text-blue-600 transition font-mono">+880 1711 000000</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                  <a href="mailto:hello@nextsolution.co" className="hover:text-blue-600 transition font-mono">hello@nextsolution.co</a>
                </li>
                <li className="flex items-start space-x-3 pt-2 border-t border-gray-50">
                  <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="block font-bold text-gray-800 text-xs uppercase tracking-wider">{t.footerWorkingHours}</span>
                    <span className="text-xs text-gray-500">Mon - Fri: 9:00 AM - 6:00 PM (GMT+6)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick social links or ways to connect */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
                {t.contactSocialsHeader}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://wa.me/8801711000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-emerald-100 bg-emerald-50 hover:bg-emerald-100/80 text-xs font-bold text-emerald-700 transition shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="h-4.5 w-4.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.42 1.452 5.378 0 9.755-4.379 9.758-9.76.002-2.58-1.003-5.006-2.83-6.835-1.828-1.829-4.253-2.835-6.834-2.835-5.381 0-9.76 4.379-9.764 9.76-.002 1.96.512 3.878 1.492 5.589l-.982 3.582 3.69-.968zm11.393-5.263c-.314-.157-1.858-.917-2.143-1.02-.285-.104-.493-.157-.7.157-.207.315-.802 1.02-.984 1.229-.182.208-.363.235-.677.079-.314-.158-1.324-.487-2.523-1.557-.932-.832-1.56-1.86-1.742-2.175-.182-.315-.02-.485.137-.642.141-.14.314-.367.47-.55.157-.183.21-.314.314-.525.104-.21.052-.394-.026-.55-.078-.157-.7-1.687-.958-2.31-.252-.603-.508-.522-.7-.522-.182-.001-.391-.001-.6-.001-.21 0-.55.079-.838.394-.287.315-1.097 1.073-1.097 2.617 0 1.543 1.123 3.031 1.279 3.241.157.21 2.21 3.374 5.353 4.73.748.322 1.332.514 1.787.658.751.238 1.436.205 1.978.124.604-.09 1.858-.76 2.117-1.457.26-.697.26-1.294.182-1.42-.078-.125-.285-.207-.6-.364z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-emerald-500" />
                </a>
                <a
                  href="https://m.me/nextsolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100/80 text-xs font-bold text-blue-700 transition shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="h-4.5 w-4.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.11C24 4.974 18.627 0 12 0zm1.282 14.803l-3.072-3.277-5.992 3.277 6.589-7.001 3.123 3.277 5.941-3.277-6.589 7.001z"/>
                    </svg>
                    <span>Messenger</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-blue-500" />
                </a>
              </div>
            </div>

            {/* Micro FAQ or Consultation assurance */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 space-y-2.5">
              <div className="flex items-center space-x-2 text-blue-700">
                <MessageSquare className="h-4.5 w-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider">{currentLang === 'en' ? 'Free Consultation' : 'ফ্রি কনসালটেশন'}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {currentLang === 'en'
                  ? 'All inquiries receive a complimentary initial review and project strategy brief within 1 business day.'
                  : 'প্রতিটি বার্তার জন্য আমরা আমাদের সিনিয়র টিমের পক্ষ থেকে ১ কর্মদিবসের মধ্যে একটি ফ্রি কনসালটেশন রিপোর্ট প্রদান করি।'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
