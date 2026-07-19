"use client";
import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, Settings, RefreshCw, Plus, Trash2, Edit3, 
  ArrowUp, ArrowDown, Check, Eye, HelpCircle, Save, BookOpen, 
  Clock, AlertTriangle, Undo, History, EyeOff, Globe, Layers
} from 'lucide-react';
import { 
  getLegalPolicies, saveLegalPolicy, getLegalRevisions, 
  getCookieCategories, saveCookieCategory, deleteCookieCategory,
  getCookieSettings, saveCookieSettings 
} from '@/lib/db';
import { LegalPolicy, LegalSection, CookieCategory, CookieSettings, LegalRevision } from '@/types';

interface AdminLegalCMSProps {
  currentLang: 'en' | 'bn';
  triggerNotice: (msg: string) => void;
}

export default function AdminLegalCMS({ currentLang, triggerNotice }: AdminLegalCMSProps) {
  // Tabs: 'policies' | 'cookies' | 'banner' | 'history'
  const [activeSubTab, setActiveSubTab] = useState<'policies' | 'cookies' | 'banner' | 'history'>('policies');

  // Policy-specific states
  const [policies, setPolicies] = useState<LegalPolicy[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<LegalPolicy | null>(null);
  const [isEditingPolicy, setIsEditingPolicy] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Policy Form states
  const [policyVersion, setPolicyVersion] = useState('');
  const [policyEffectiveDate, setPolicyEffectiveDate] = useState('');
  const [policyStatus, setPolicyStatus] = useState<'draft' | 'published'>('published');
  
  // Policy SEO
  const [metaTitleEn, setMetaTitleEn] = useState('');
  const [metaTitleBn, setMetaTitleBn] = useState('');
  const [metaDescEn, setMetaDescEn] = useState('');
  const [metaDescBn, setMetaDescBn] = useState('');

  // Sections of currently edited policy
  const [sections, setSections] = useState<LegalSection[]>([]);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionTitleEn, setSectionTitleEn] = useState('');
  const [sectionTitleBn, setSectionTitleBn] = useState('');
  const [sectionContentEn, setSectionContentEn] = useState('');
  const [sectionContentBn, setSectionContentBn] = useState('');

  // Cookie Category states
  const [cookieCategories, setCookieCategories] = useState<CookieCategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<CookieCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState<Partial<CookieCategory>>({
    name: '', descriptionEn: '', descriptionBn: '', isEssential: false, enabledByDefault: false
  });

  // Cookie Banner Settings states
  const [bannerSettings, setBannerSettings] = useState<CookieSettings | null>(null);

  // Revisions historical state
  const [revisions, setRevisions] = useState<LegalRevision[]>([]);
  const [selectedRevision, setSelectedRevision] = useState<LegalRevision | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setPolicies(getLegalPolicies());
    setCookieCategories(getCookieCategories());
    setBannerSettings(getCookieSettings());
    setRevisions(getLegalRevisions());
  };

  const handleEditPolicyTrigger = (policy: LegalPolicy) => {
    setSelectedPolicy(policy);
    setPolicyVersion(policy.version);
    setPolicyEffectiveDate(policy.effectiveDate);
    setPolicyStatus(policy.status);
    setMetaTitleEn(policy.metaTitleEn || '');
    setMetaTitleBn(policy.metaTitleBn || '');
    setMetaDescEn(policy.metaDescriptionEn || '');
    setMetaDescBn(policy.metaDescriptionBn || '');
    setSections([...policy.sections]);
    setIsEditingPolicy(true);
    setIsPreviewing(false);
    setEditingSectionId(null);
  };

  // Section CRUD operations
  const handleAddSection = () => {
    const newSection: LegalSection = {
      id: `sec-${Date.now()}`,
      titleEn: 'New Section Title',
      titleBn: 'নতুন অনুচ্ছেদ শিরোনাম',
      contentEn: 'Enter English content here...',
      contentBn: 'এখানে বাংলা কন্টেন্ট লিখুন...'
    };
    setSections([...sections, newSection]);
    setEditingSectionId(newSection.id);
    setSectionTitleEn(newSection.titleEn);
    setSectionTitleBn(newSection.titleBn);
    setSectionContentEn(newSection.contentEn);
    setSectionContentBn(newSection.contentBn);
  };

  const handleSaveSectionEdits = () => {
    if (!editingSectionId) return;
    const updated = sections.map(sec => {
      if (sec.id === editingSectionId) {
        return {
          ...sec,
          titleEn: sectionTitleEn,
          titleBn: sectionTitleBn,
          contentEn: sectionContentEn,
          contentBn: sectionContentBn
        };
      }
      return sec;
    });
    setSections(updated);
    setEditingSectionId(null);
    triggerNotice(currentLang === 'en' ? 'Section content staged.' : 'অনুচ্ছেদের তথ্য স্টেজেড হয়েছে।');
  };

  const handleDeleteSection = (id: string) => {
    if (confirm(currentLang === 'en' ? 'Delete this section from the policy?' : 'আপনি কি সত্যি এই অনুচ্ছেদটি মুছে ফেলতে চান?')) {
      setSections(sections.filter(sec => sec.id !== id));
      if (editingSectionId === id) setEditingSectionId(null);
      triggerNotice(currentLang === 'en' ? 'Section staged for deletion.' : 'অনুচ্ছেদটি ডিলিটের জন্য মার্ক করা হয়েছে।');
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= sections.length) return;
    
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setSections(updated);
  };

  const handleSavePolicyToDatabase = () => {
    if (!selectedPolicy) return;
    
    const updatedPolicy: LegalPolicy = {
      ...selectedPolicy,
      version: policyVersion,
      effectiveDate: policyEffectiveDate,
      lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: policyStatus,
      metaTitleEn,
      metaTitleBn,
      metaDescriptionEn: metaDescEn,
      metaDescriptionBn: metaDescBn,
      sections: sections
    };

    saveLegalPolicy(updatedPolicy);
    setIsEditingPolicy(false);
    setSelectedPolicy(null);
    loadAllData();
    triggerNotice(
      currentLang === 'en' 
        ? `Successfully updated ${updatedPolicy.titleEn} (Revision saved to Log)` 
        : `সফলভাবে ${updatedPolicy.titleBn} আপডেট করা হয়েছে (নতুন খসড়া ইতিহাসে যোগ হয়েছে)`
    );
  };

  // Cookie Categories CRUD
  const handleSaveCookieCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingCategory ? editingCategory.id : `cookie-${Date.now()}`;
    const completed: CookieCategory = {
      id,
      name: categoryForm.name || 'Custom Tracker',
      descriptionEn: categoryForm.descriptionEn || '',
      descriptionBn: categoryForm.descriptionBn || '',
      isEssential: categoryForm.isEssential || false,
      enabledByDefault: categoryForm.isEssential ? true : (categoryForm.enabledByDefault || false)
    };

    saveCookieCategory(completed);
    setEditingCategory(null);
    setCategoryForm({ name: '', descriptionEn: '', descriptionBn: '', isEssential: false, enabledByDefault: false });
    loadAllData();
    triggerNotice(currentLang === 'en' ? 'Cookie Category saved.' : 'কুকি ক্যাটাগরি সংরক্ষণ করা হয়েছে।');
  };

  const handleEditCategoryTrigger = (cat: CookieCategory) => {
    setEditingCategory(cat);
    setCategoryForm(cat);
  };

  const handleDeleteCategory = (id: string, isEssential: boolean) => {
    if (isEssential) {
      alert(currentLang === 'en' ? 'Essential cookies cannot be deleted.' : 'আবশ্যক কুকি মুছে ফেলা সম্ভব নয়।');
      return;
    }
    if (confirm(currentLang === 'en' ? 'Delete this cookie category?' : 'আপনি কি সত্যিই এই কুকি ক্যাটাগরি মুছে ফেলতে চান?')) {
      deleteCookieCategory(id);
      loadAllData();
      triggerNotice(currentLang === 'en' ? 'Cookie category deleted.' : 'কুকি ক্যাটাগরি মুছে ফেলা হয়েছে।');
    }
  };

  // Banner settings Save
  const handleSaveBannerSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerSettings) return;
    saveCookieSettings(bannerSettings);
    loadAllData();
    triggerNotice(currentLang === 'en' ? 'Cookie Consent Banner settings updated.' : 'কুকি ব্যানার কনফিগারেশন আপডেট করা হয়েছে।');
  };

  const getPolicyNameById = (id: string) => {
    const found = policies.find(p => p.id === id);
    if (!found) return id;
    return currentLang === 'en' ? found.titleEn : found.titleBn;
  };

  return (
    <div id="admin-legal-cms-module" className="space-y-6">
      
      {/* CMS Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>{currentLang === 'en' ? 'Legal Compliance & Consent CMS' : 'আইনি সম্মতি ও কুকি ব্যবস্থাপনা প্যানেল'}</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {currentLang === 'en' ? 'Manage legal pages, cookie consent banners, policies, and revision histories.' : 'আইনি পাতা, কন্টেন্ট অনুচ্ছেদ, কুকি ক্যাটাগরি এবং নীতিমালার সংস্করণ পরিচালনা করুন।'}
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        {!isEditingPolicy && (
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 text-xs">
            {[
              { id: 'policies', label: currentLang === 'en' ? 'Legal Docs' : 'আইনি খসড়া', icon: FileText },
              { id: 'cookies', label: currentLang === 'en' ? 'Cookie Categories' : 'কুকি ক্যাটাগরি', icon: Layers },
              { id: 'banner', label: currentLang === 'en' ? 'Consent Banner' : 'সম্মতি ব্যানার', icon: Settings },
              { id: 'history', label: currentLang === 'en' ? 'Revision Logs' : 'ইতিহাস লগ', icon: History }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  setSelectedRevision(null);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                  activeSubTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RENDER VIEW 1: POLICY DOCUMENTS EDITING INTERFACE */}
      {isEditingPolicy && selectedPolicy && (
        <div className="space-y-6 bg-[#FAFAFA]/50 rounded-2xl p-6 border border-gray-100">
          
          {/* Editor Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {currentLang === 'en' ? 'Active Editor Panel' : 'সম্পাদনা প্যানেল'}
              </span>
              <h4 className="text-lg font-bold text-gray-900 mt-1">
                {currentLang === 'en' ? `Editing: ${selectedPolicy.titleEn}` : `সম্পাদনা: ${selectedPolicy.titleBn}`}
              </h4>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsPreviewing(!isPreviewing)}
                className="flex items-center space-x-1.5 bg-white border border-gray-200 text-gray-600 font-semibold py-2 px-3 rounded-lg text-xs hover:bg-gray-50 transition"
              >
                {isPreviewing ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{isPreviewing ? (currentLang === 'en' ? 'Edit Mode' : 'এডিট মোড') : (currentLang === 'en' ? 'Preview' : 'প্রিভিউ')}</span>
              </button>

              <button
                type="button"
                onClick={() => { setIsEditingPolicy(false); setSelectedPolicy(null); }}
                className="bg-white border border-gray-200 text-gray-600 font-semibold py-2 px-3 rounded-lg text-xs hover:bg-gray-50 transition"
              >
                {currentLang === 'en' ? 'Cancel' : 'বাতিল'}
              </button>
            </div>
          </div>

          {isPreviewing ? (
            /* PREVIEW INTERFACE FOR ADMNS */
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs text-gray-400 font-bold tracking-wider uppercase">Document Preview Sandbox</span>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
                  {currentLang === 'en' ? selectedPolicy.titleEn : selectedPolicy.titleBn}
                </h1>
                <div className="flex items-center space-x-4 text-xs text-gray-400 mt-2">
                  <span>Version: {policyVersion}</span>
                  <span>Effective Date: {policyEffectiveDate}</span>
                  <span>Status: <strong className="uppercase font-extrabold text-blue-600">{policyStatus}</strong></span>
                </div>
              </div>

              <div className="space-y-6">
                {sections.map(sec => (
                  <div key={sec.id} className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-1">
                      {currentLang === 'en' ? sec.titleEn : sec.titleBn}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">
                      {currentLang === 'en' ? sec.contentEn : sec.contentBn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* EDIT FORM INTERFACE */
            <div className="space-y-6">
              
              {/* Part A: Basic Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-100">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Document Version</label>
                  <input
                    type="text"
                    required
                    value={policyVersion}
                    onChange={(e) => setPolicyVersion(e.target.value)}
                    placeholder="e.g., v1.0"
                    className="w-full text-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Effective Date</label>
                  <input
                    type="text"
                    required
                    value={policyEffectiveDate}
                    onChange={(e) => setPolicyEffectiveDate(e.target.value)}
                    placeholder="e.g., October 1, 2026"
                    className="w-full text-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Publishing Status</label>
                  <select
                    value={policyStatus}
                    onChange={(e) => setPolicyStatus(e.target.value as any)}
                    className="w-full text-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500 transition"
                  >
                    <option value="published">Published (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Part B: SEO Configuration Settings */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-4">
                <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>SEO Search Engine Optimization Meta Tags</span>
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-500 block">SEO Meta Title (English)</label>
                      <input
                        type="text"
                        value={metaTitleEn}
                        onChange={(e) => setMetaTitleEn(e.target.value)}
                        placeholder="Privacy Policy - Next Solution Digital Agency"
                        className="w-full rounded border border-gray-200 px-2.5 py-2 text-gray-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-500 block">SEO Meta Description (English)</label>
                      <textarea
                        value={metaDescEn}
                        onChange={(e) => setMetaDescEn(e.target.value)}
                        rows={2}
                        placeholder="Read the privacy agreements and details on cookie data handling..."
                        className="w-full rounded border border-gray-200 px-2.5 py-2 text-gray-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-500 block">SEO Meta Title (Bengali)</label>
                      <input
                        type="text"
                        value={metaTitleBn}
                        onChange={(e) => setMetaTitleBn(e.target.value)}
                        placeholder="গোপনীয়তা নীতি - নেক্সট সলিউশন"
                        className="w-full rounded border border-gray-200 px-2.5 py-2 text-gray-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-500 block">SEO Meta Description (Bengali)</label>
                      <textarea
                        value={metaDescBn}
                        onChange={(e) => setMetaDescBn(e.target.value)}
                        rows={2}
                        placeholder="নেক্সট সলিউশনের নিরাপত্তা এবং তথ্য ব্যবহারের আইনি দিক নির্দেশনা সমূহ..."
                        className="w-full rounded border border-gray-200 px-2.5 py-2 text-gray-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part C: Section Editor Panel */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-blue-500" />
                    <span>Manage Document Content Sections ({sections.length})</span>
                  </span>
                  
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="flex items-center space-x-1.5 bg-blue-50 text-blue-600 font-bold py-1.5 px-3 rounded-lg text-xs hover:bg-blue-100 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add New Section</span>
                  </button>
                </div>

                {/* Inline Section Editor (Visible when editingSectionId is set) */}
                {editingSectionId && (
                  <div className="p-4 bg-blue-50/20 border border-blue-100 rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-50 pb-2">
                      <span className="text-xs font-bold text-blue-600">Editing Section Clause</span>
                      <button
                        type="button"
                        onClick={() => setEditingSectionId(null)}
                        className="text-gray-400 hover:text-gray-600 text-xs font-bold"
                      >
                        Close Editor
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* English Section inputs */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-gray-600">Section Title (English)</label>
                          <input
                            type="text"
                            value={sectionTitleEn}
                            onChange={(e) => setSectionTitleEn(e.target.value)}
                            className="w-full rounded border border-gray-200 bg-white px-2.5 py-2"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-gray-600">Section Content (English)</label>
                          <textarea
                            value={sectionContentEn}
                            onChange={(e) => setSectionContentEn(e.target.value)}
                            rows={6}
                            className="w-full rounded border border-gray-200 bg-white px-2.5 py-2 font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      {/* Bengali Section inputs */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="font-semibold text-gray-600">Section Title (Bengali)</label>
                          <input
                            type="text"
                            value={sectionTitleBn}
                            onChange={(e) => setSectionTitleBn(e.target.value)}
                            className="w-full rounded border border-gray-200 bg-white px-2.5 py-2"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-gray-600">Section Content (Bengali)</label>
                          <textarea
                            value={sectionContentBn}
                            onChange={(e) => setSectionContentBn(e.target.value)}
                            rows={6}
                            className="w-full rounded border border-gray-200 bg-white px-2.5 py-2 font-sans text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-blue-50">
                      <button
                        type="button"
                        onClick={handleSaveSectionEdits}
                        className="bg-blue-600 text-white font-bold py-1.5 px-3 rounded text-xs hover:bg-blue-700 transition"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Section Cards List */}
                <div className="space-y-2">
                  {sections.map((sec, idx) => {
                    const isCurrentlyEdited = editingSectionId === sec.id;
                    return (
                      <div 
                        key={sec.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-4 text-xs transition ${
                          isCurrentlyEdited 
                            ? 'border-blue-500 bg-blue-50/10' 
                            : 'border-gray-100 bg-gray-50/30'
                        }`}
                      >
                        <div className="space-y-1 flex-grow">
                          <span className="text-[10px] text-gray-400 font-mono">Section {idx + 1}</span>
                          <h5 className="font-bold text-gray-900">{sec.titleEn}</h5>
                          <p className="text-[10px] text-gray-400 line-clamp-1">{sec.contentEn}</p>
                        </div>

                        {/* Drag and Reorder controls / actions */}
                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSection(idx, 'up')}
                            className="p-1 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded disabled:opacity-30"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === sections.length - 1}
                            onClick={() => moveSection(idx, 'down')}
                            className="p-1 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded disabled:opacity-30"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingSectionId(sec.id);
                              setSectionTitleEn(sec.titleEn);
                              setSectionTitleBn(sec.titleBn);
                              setSectionContentEn(sec.contentEn);
                              setSectionContentBn(sec.contentBn);
                            }}
                            className="p-1.5 bg-white border border-gray-200 text-gray-500 hover:text-blue-600 rounded shadow-xs"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(sec.id)}
                            className="p-1.5 bg-red-50 text-red-500 hover:text-red-700 rounded border border-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Publish Action bottom panel */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <span className="text-[10px] text-gray-400 font-medium">
                  Saving will write directly to localStorage and trigger automated version history logging.
                </span>
                <button
                  type="button"
                  id="btn-admin-save-policy"
                  onClick={handleSavePolicyToDatabase}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition text-xs shadow-sm"
                >
                  Save Policy changes
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* RENDER VIEW 2: LIST OF ALL LEGAL DOCUMENTS */}
      {activeSubTab === 'policies' && !isEditingPolicy && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {policies.map(policy => (
              <div 
                key={policy.id} 
                className="rounded-2xl border border-gray-100 p-5 shadow-sm bg-white hover:border-blue-500 transition-colors duration-200 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      policy.status === 'published' ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'
                    }`}>
                      {policy.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">v{policy.version}</span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {currentLang === 'en' ? policy.titleEn : policy.titleBn}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-normal line-clamp-2">
                    {currentLang === 'en' ? policy.metaDescriptionEn : policy.metaDescriptionBn}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 mt-4 flex items-center justify-between">
                  <span className="text-[9px] text-gray-400">Updated: {policy.lastUpdated}</span>
                  <button
                    onClick={() => handleEditPolicyTrigger(policy)}
                    className="text-xs text-blue-600 hover:underline font-bold flex items-center space-x-1"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit Document</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER VIEW 3: COOKIE CATEGORIES CONFIGURATION */}
      {activeSubTab === 'cookies' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-5 bg-[#FAFAFA]/50 rounded-2xl p-5 border border-gray-100 space-y-4 text-xs">
            <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block">
              {editingCategory ? 'Edit Category' : 'Create Cookie Category'}
            </span>
            
            <form onSubmit={handleSaveCookieCategory} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-600">Cookie Type / Identifier</label>
                <input
                  type="text" required
                  value={categoryForm.name || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Analytics Cookies"
                  className="w-full rounded border border-gray-200 bg-white px-2.5 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-600">English Description</label>
                <textarea
                  required rows={3}
                  value={categoryForm.descriptionEn || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, descriptionEn: e.target.value })}
                  placeholder="These cookies collect informational data about traffic sources..."
                  className="w-full rounded border border-gray-200 bg-white px-2.5 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-600">Bengali Description</label>
                <textarea
                  required rows={3}
                  value={categoryForm.descriptionBn || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, descriptionBn: e.target.value })}
                  placeholder="এই কুকিগুলো সাইটের ভিজিটর ট্রাফিক সংক্রান্ত তথ্য সংগ্রহে সাহায্য করে..."
                  className="w-full rounded border border-gray-200 bg-white px-2.5 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoryForm.isEssential || false}
                    onChange={(e) => setCategoryForm({ ...categoryForm, isEssential: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span className="font-semibold text-gray-600">Is Essential</span>
                </label>

                <label className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={categoryForm.isEssential}
                    checked={categoryForm.isEssential ? true : (categoryForm.enabledByDefault || false)}
                    onChange={(e) => setCategoryForm({ ...categoryForm, enabledByDefault: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0 disabled:opacity-50"
                  />
                  <span className="font-semibold text-gray-600">Active by Default</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                {editingCategory && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(null);
                      setCategoryForm({ name: '', descriptionEn: '', descriptionBn: '', isEssential: false, enabledByDefault: false });
                    }}
                    className="bg-white border border-gray-200 text-gray-600 py-1.5 px-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>

          {/* List Side */}
          <div className="lg:col-span-7 space-y-3">
            {cookieCategories.map(cat => (
              <div 
                key={cat.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex items-start justify-between gap-4 text-xs hover:border-gray-200 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-gray-900">{cat.name}</h4>
                    {cat.isEssential ? (
                      <span className="text-[8px] bg-blue-50 text-blue-600 font-bold px-1 rounded uppercase">Required</span>
                    ) : (
                      <span className="text-[8px] bg-gray-50 text-gray-400 font-bold px-1 rounded uppercase">Optional</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                    {currentLang === 'en' ? cat.descriptionEn : cat.descriptionBn}
                  </p>
                </div>

                <div className="flex space-x-1.5 shrink-0">
                  <button
                    onClick={() => handleEditCategoryTrigger(cat)}
                    className="p-1 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded text-gray-500 hover:text-blue-600 transition"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    disabled={cat.isEssential}
                    onClick={() => handleDeleteCategory(cat.id, cat.isEssential)}
                    className="p-1 bg-red-50 hover:bg-red-100 border border-red-100 rounded text-red-500 disabled:opacity-30 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* RENDER VIEW 4: CONSENT BANNER PHRASES & TEXT EDITOR */}
      {activeSubTab === 'banner' && bannerSettings && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-6">
          <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block">
            Banner Text Customization Panel
          </span>

          <form onSubmit={handleSaveBannerSettings} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* English Phrases */}
              <div className="space-y-4">
                <span className="font-bold text-gray-700 block border-b border-gray-50 pb-1">English Translation Settings</span>
                
                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-500">Banner Title (English)</label>
                  <input
                    type="text" required
                    value={bannerSettings.bannerTitleEn}
                    onChange={(e) => setBannerSettings({ ...bannerSettings, bannerTitleEn: e.target.value })}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-gray-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-500">Banner Body Description (English)</label>
                  <textarea
                    required rows={4}
                    value={bannerSettings.bannerTextEn}
                    onChange={(e) => setBannerSettings({ ...bannerSettings, bannerTextEn: e.target.value })}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-gray-800"
                  />
                </div>
              </div>

              {/* Bengali Phrases */}
              <div className="space-y-4">
                <span className="font-bold text-gray-700 block border-b border-gray-50 pb-1">Bengali Translation Settings</span>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-500">Banner Title (Bengali)</label>
                  <input
                    type="text" required
                    value={bannerSettings.bannerTitleBn}
                    onChange={(e) => setBannerSettings({ ...bannerSettings, bannerTitleBn: e.target.value })}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-gray-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-500">Banner Body Description (Bengali)</label>
                  <textarea
                    required rows={4}
                    value={bannerSettings.bannerTextBn}
                    onChange={(e) => setBannerSettings({ ...bannerSettings, bannerTextBn: e.target.value })}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-gray-800"
                  />
                </div>
              </div>

            </div>

            <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">
                These settings configure the client-side Floating Cookie Consent Banner instantly.
              </span>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition"
              >
                Save Banner Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RENDER VIEW 5: REVISION & VERSION HISTORY LOGS */}
      {activeSubTab === 'history' && (
        <div className="space-y-6">
          {selectedRevision ? (
            /* Deep-dive into specific historic revision */
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-gray-400">Historical Revision Review</span>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {getPolicyNameById(selectedRevision.policyId)} (Version {selectedRevision.version})
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    Revised on: <strong>{selectedRevision.updatedAt}</strong> by <strong>{selectedRevision.updatedBy}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRevision(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-1.5 px-3 rounded text-[11px] font-bold"
                >
                  Back to List
                </button>
              </div>

              {/* Revision Change summary notice */}
              <div className="p-3 bg-amber-50 text-amber-800 rounded-lg flex items-start space-x-2 font-sans border border-amber-200/50">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <p className="font-bold">Log Details</p>
                  <p className="text-gray-600 mt-1">{selectedRevision.changeSummary}</p>
                </div>
              </div>

              {/* Revision Sections read-only display */}
              <div className="space-y-4 pt-3">
                <span className="font-bold text-gray-700 block border-b border-gray-50 pb-1 uppercase text-[10px]">Document Content Clause Snapshots</span>
                {selectedRevision.sections.map((sec, idx) => (
                  <div key={sec.id} className="p-3 bg-gray-50 rounded-xl space-y-1">
                    <span className="text-[10px] text-gray-400 font-mono">Snapshot Clause {idx + 1}</span>
                    <h5 className="font-bold text-gray-800">{sec.titleEn}</h5>
                    <p className="text-gray-500 leading-relaxed text-[11px] whitespace-pre-wrap">{sec.contentEn}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Revisions index table log */
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-extrabold text-[10px] uppercase tracking-wider">
                      <th className="p-4">Document</th>
                      <th className="p-4">Version</th>
                      <th className="p-4">Revision Date</th>
                      <th className="p-4">Reviewed By</th>
                      <th className="p-4">Change Summary</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
                    {revisions.map(rev => (
                      <tr key={rev.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-bold text-gray-900">
                          {getPolicyNameById(rev.policyId)}
                        </td>
                        <td className="p-4 font-mono">
                          {rev.version}
                        </td>
                        <td className="p-4 font-mono text-[11px]">
                          {rev.updatedAt}
                        </td>
                        <td className="p-4">
                          {rev.updatedBy}
                        </td>
                        <td className="p-4 text-gray-400 max-w-xs truncate" title={rev.changeSummary}>
                          {rev.changeSummary}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedRevision(rev)}
                            className="text-blue-600 hover:underline font-bold flex items-center justify-end space-x-1 ml-auto"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View snapshot</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
