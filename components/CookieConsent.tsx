"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X, Check, Settings, Info, AlertCircle, Save } from 'lucide-react';
import { getCookieCategories, getCookieSettings, saveCookieSettings } from '@/lib/db';
import { CookieCategory } from '@/types';
import { getLocalItem, setLocalItem } from '@/lib/utils';

interface CookieConsentProps {
  currentLang: 'en' | 'bn';
  onOpenPrivacyPolicy: () => void;
}

export default function CookieConsent({ currentLang, onOpenPrivacyPolicy }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<CookieCategory[]>([]);
  const [bannerSettings, setBannerSettings] = useState<any>(null);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Check if consent has already been saved in localStorage
    const savedConsent = getLocalItem('next_solution_cookie_consents');
    const categoriesData = getCookieCategories();
    const settingsData = getCookieSettings();
    setCategories(categoriesData);
    setBannerSettings(settingsData);

    // Initialize preference state with saved values, or default state
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
      } catch (e) {
        // Fallback
        const defaultPrefs: Record<string, boolean> = {};
        categoriesData.forEach(cat => {
          defaultPrefs[cat.id] = cat.enabledByDefault || cat.isEssential;
        });
        setPreferences(defaultPrefs);
      }
    } else {
      // Show banner if no stored preferences found
      setTimeout(() => {
        setShowBanner(true);
      }, 1500);

      const defaultPrefs: Record<string, boolean> = {};
      categoriesData.forEach(cat => {
        defaultPrefs[cat.id] = cat.enabledByDefault || cat.isEssential;
      });
      setPreferences(defaultPrefs);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: Record<string, boolean> = {};
    categories.forEach(cat => {
      allAccepted[cat.id] = true;
    });
    setPreferences(allAccepted);
    setLocalItem('next_solution_cookie_consents', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleRejectAllNonEssential = () => {
    const essentialOnly: Record<string, boolean> = {};
    categories.forEach(cat => {
      essentialOnly[cat.id] = cat.isEssential;
    });
    setPreferences(essentialOnly);
    setLocalItem('next_solution_cookie_consents', JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  const handleToggleCategory = (catId: string, isEssential: boolean) => {
    if (isEssential) return;
    setPreferences(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleSavePreferences = () => {
    setLocalItem('next_solution_cookie_consents', JSON.stringify(preferences));
    setShowModal(false);
    setShowBanner(false);
  };

  if (!bannerSettings) return null;

  const t = {
    acceptAll: currentLang === 'en' ? 'Accept All' : 'সব গ্রহণ করুন',
    rejectNonEssential: currentLang === 'en' ? 'Reject Non-Essential' : 'অপ্রয়োজনীয় বাতিল করুন',
    customize: currentLang === 'en' ? 'Customize Preferences' : 'পছন্দ কাস্টমাইজ করুন',
    learnMore: currentLang === 'en' ? 'Learn More' : 'আরও জানুন',
    title: currentLang === 'en' ? bannerSettings.bannerTitleEn : bannerSettings.bannerTitleBn,
    text: currentLang === 'en' ? bannerSettings.bannerTextEn : bannerSettings.bannerTextBn,
    modalTitleEn: 'Cookie Preference Center',
    modalTitleBn: 'কুকি ব্যবস্থাপনা প্যানেল',
    modalSubtitleEn: 'Manage your privacy settings for Next Solution web services.',
    modalSubtitleBn: 'নেক্সট সলিউশন ওয়েব সেবার জন্য আপনার গোপনীয়তা সেটিংস পরিচালনা করুন।',
    saveSelection: currentLang === 'en' ? 'Save Choices' : 'পছন্দ সংরক্ষণ করুন',
    essentialOnly: currentLang === 'en' ? 'Essential Only' : 'শুধুমাত্র আবশ্যক',
    requiredLabel: currentLang === 'en' ? 'Required' : 'প্রয়োজনীয়',
    activeLabel: currentLang === 'en' ? 'Active' : 'সক্রিয়',
    inactiveLabel: currentLang === 'en' ? 'Inactive' : 'নিষ্ক্রিয়'
  };

  return (
    <>
      {/* Cookie Consent Floating Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            id="cookie-consent-banner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-40"
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900 font-sans tracking-tight">
                    {t.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {t.text}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-sans">
                <button
                  id="btn-cookie-accept-all"
                  onClick={handleAcceptAll}
                  className="flex-1 min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition text-center hover:scale-[1.01]"
                >
                  {t.acceptAll}
                </button>
                <button
                  id="btn-cookie-reject-all"
                  onClick={handleRejectAllNonEssential}
                  className="flex-1 min-w-[120px] bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg transition border border-gray-100 text-center"
                >
                  {t.rejectNonEssential}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-gray-50 text-xs font-sans">
                <button
                  id="btn-cookie-customize"
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 hover:underline font-bold flex items-center space-x-1"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>{t.customize}</span>
                </button>
                <button
                  id="btn-cookie-learn-more"
                  onClick={onOpenPrivacyPolicy}
                  className="text-gray-400 hover:text-gray-600 underline"
                >
                  {t.learnMore}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              id="cookie-preferences-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative bg-white border border-gray-100 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h3 className="text-base font-bold text-gray-900 font-sans tracking-tight">
                      {currentLang === 'en' ? t.modalTitleEn : t.modalTitleBn}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {currentLang === 'en' ? t.modalSubtitleEn : t.modalSubtitleBn}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 hover:bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* List of categories */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {categories.map(cat => {
                  const isChecked = preferences[cat.id] ?? false;
                  return (
                    <div
                      key={cat.id}
                      className={`p-4 rounded-2xl border transition-colors ${
                        cat.isEssential 
                          ? 'border-gray-100 bg-gray-50/50' 
                          : isChecked 
                          ? 'border-blue-100 bg-blue-50/10' 
                          : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-grow">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-gray-900 font-sans">{cat.name}</span>
                            {cat.isEssential ? (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {t.requiredLabel}
                              </span>
                            ) : (
                              <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                isChecked 
                                  ? 'text-green-600 bg-green-50' 
                                  : 'text-gray-400 bg-gray-50'
                              }`}>
                                {isChecked ? t.activeLabel : t.inactiveLabel}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                            {currentLang === 'en' ? cat.descriptionEn : cat.descriptionBn}
                          </p>
                        </div>

                        {/* Custom switch slider */}
                        <div className="shrink-0 pt-0.5">
                          <button
                            id={`switch-cookie-${cat.id}`}
                            disabled={cat.isEssential}
                            onClick={() => handleToggleCategory(cat.id, cat.isEssential)}
                            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              cat.isEssential 
                                ? 'bg-blue-300 opacity-60 cursor-not-allowed' 
                                : isChecked 
                                ? 'bg-blue-600' 
                                : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                isChecked || cat.isEssential ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
                <button
                  id="btn-modal-save"
                  onClick={handleSavePreferences}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl transition text-xs flex items-center justify-center space-x-2 shadow-sm hover:scale-[1.01]"
                >
                  <Save className="h-4 w-4" />
                  <span>{t.saveSelection}</span>
                </button>
                <button
                  id="btn-modal-essential-only"
                  onClick={() => {
                    handleRejectAllNonEssential();
                    setShowModal(false);
                  }}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-600 font-semibold py-2.5 px-4 rounded-xl transition text-xs border border-gray-200 text-center"
                >
                  {t.essentialOnly}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
