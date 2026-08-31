"use client";
/**
 * Admin "Pricing Management" panel — full CRUD for the dynamic pricing engine
 * (project pricing, monthly plans, agency packages) plus inbound quote request
 * review. Uses the generic /api/admin/* backend (staff-gated server-side).
 */
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Copy,
  Loader2,
  Check,
  X,
  Save,
  Inbox,
  RefreshCw,
  DollarSign,
  CalendarRange,
  Layers,
  BadgeCheck,
  Star,
  PackageSearch,
  MessageSquareQuote,
} from "lucide-react";
import { adminDB } from "@/lib/admin-fetch";
import {
  ProjectPricing,
  MonthlyPricing,
  AgencyPackage,
  PricingQuoteRequest,
} from "@/types";
import { initialProjectPricing, initialMonthlyPricing, initialAgencyPackages } from "@/data/pricingInitialData";

interface AdminPricingManagerProps {
  currentLang: "en" | "bn";
}

const SERVICES = [
  "Web Development",
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Digital Marketing",
  "AI Services",
  "SEO",
];

const en = (enText: string, currentLang: string) => (currentLang === "en" ? enText : enText);

const inputCls =
  "w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-xs text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30";

const labelCls = "block text-[10px] font-bold text-gray-500 dark:text-neutral-400 mb-1";

const cardCls = "rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-sm bg-white dark:bg-[#141414]";

type TabId = "project" | "monthly" | "agency" | "quotes";

export default function AdminPricingManager({ currentLang }: AdminPricingManagerProps) {
  const [tab, setTab] = useState<TabId>("project");
  const [project, setProject] = useState<ProjectPricing[]>([]);
  const [monthly, setMonthly] = useState<MonthlyPricing[]>([]);
  const [agency, setAgency] = useState<AgencyPackage[]>([]);
  const [quotes, setQuotes] = useState<PricingQuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [p, m, a, q] = await Promise.all([
        adminDB.getAll<ProjectPricing>("project-pricing"),
        adminDB.getAll<MonthlyPricing>("monthly-pricing"),
        adminDB.getAll<AgencyPackage>("agency-packages"),
        adminDB.getAll<PricingQuoteRequest>("pricing-quotes"),
      ]);
      setProject(p);
      setMonthly(m);
      setAgency(a);
      setQuotes(q);
    } catch (err: any) {
      setError(err.message || "Failed to load pricing data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const loadDefaults = async () => {
    if (!confirm(`Load the default starter pricing content? This adds any missing default rows.`)) return;
    setBusy(true);
    try {
      await adminDB.save("project-pricing", initialProjectPricing);
      await adminDB.save("monthly-pricing", initialMonthlyPricing);
      await adminDB.save("agency-packages", initialAgencyPackages);
      await reload();
    } catch (err: any) {
      setError(err.message || "Failed to load defaults.");
    } finally {
      setBusy(false);
    }
  };

  const tabs: { id: TabId; label: string; icon: any; count: number }[] = [
    { id: "project", label: "Project Pricing", icon: DollarSign, count: project.length },
    { id: "monthly", label: "Monthly Plans", icon: CalendarRange, count: monthly.length },
    { id: "agency", label: "Agency Packages", icon: PackageSearch, count: agency.length },
    { id: "quotes", label: "Quote Requests", icon: MessageSquareQuote, count: quotes.filter((q) => q.status === "pending").length },
  ];

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-neutral-700/80 pb-3 w-full">
          {tabs.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3.5 py-2 rounded-lg font-bold transition flex items-center space-x-1.5 ${
                  active
                    ? "bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20"
                    : "text-gray-500 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800/70"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${t.id === "quotes" && t.count > 0 ? "bg-amber-100 text-amber-800 dark:text-amber-300" : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300"}`}>
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={`text-[10px] ${loading ? "text-gray-400 dark:text-neutral-500" : "text-emerald-600 dark:text-emerald-400"}`}>
          {loading && !error ? (en("Syncing with database...", currentLang)) : error ? (
            <span className="text-red-600 dark:text-red-400 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />{error}</span>
          ) : (
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live — changes publish to the /pricing page instantly</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={loadDefaults}
            disabled={busy || loading}
            className="flex items-center space-x-1.5 rounded-md border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 font-bold transition hover:bg-orange-100 dark:hover:bg-orange-500/20 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            <span>Load Default Content</span>
          </button>
          <button
            onClick={reload}
            disabled={loading}
            className="flex items-center space-x-1.5 rounded-md bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 px-3 py-1.5 font-bold text-gray-600 dark:text-neutral-300 transition disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {loading && !error ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-5 bg-white dark:bg-[#141414] space-y-3">
              <div className="h-3 w-40 rounded bg-gray-100 dark:bg-neutral-800 animate-pulse" />
              <div className="h-3 w-64 rounded bg-gray-100 dark:bg-neutral-800 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {tab === "project" && <ProjectTab items={project} setItems={setProject} currentLang={currentLang} />}
          {tab === "monthly" && <MonthlyTab items={monthly} setItems={setMonthly} currentLang={currentLang} />}
          {tab === "agency" && <AgencyTab items={agency} setItems={setAgency} currentLang={currentLang} />}
          {tab === "quotes" && <QuotesTab items={quotes} setItems={setQuotes} currentLang={currentLang} />}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ shared */

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center space-x-2 ${label ? "cursor-pointer" : "cursor-pointer"}`}
      title={label}
    >
      <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${checked ? "bg-orange-500" : "bg-gray-200 dark:bg-neutral-700"}`}>
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
      {label && <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-400">{label}</span>}
    </button>
  );
}

function FeaturesInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <textarea
      rows={4}
      required
      value={value.join("\n")}
      onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
      className={`${inputCls} font-mono`}
      placeholder="One feature per line…"
    />
  );
}

const enumList = (vals: string[]) =>
  vals.map((v) => <option key={v} value={v}>{v}</option>);

/* ------------------------------------------------------------------ project */

function ProjectTab({ items, setItems, currentLang }: { items: ProjectPricing[]; setItems: (v: ProjectPricing[]) => void; currentLang: string }) {
  const [editing, setEditing] = useState<ProjectPricing | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<ProjectPricing>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ service: SERVICES[0], currency: "USD", billingType: "one-time", enabled: true, recommended: false, price: 0, sortOrder: items.length + 1 });
    setCreating(true);
  };

  const startEdit = (item: ProjectPricing) => {
    setEditing(item);
    setForm({ ...item });
    setCreating(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: ProjectPricing = {
        id: editing?.id || crypto.randomUUID(),
        service: form.service as string,
        projectType: (form.projectType || "").trim(),
        price: Number(form.price) || 0,
        currency: form.currency || "USD",
        billingType: form.billingType || "one-time",
        delivery: (form.delivery || "").trim(),
        revisions: (form.revisions || "").trim(),
        support: (form.support || "").trim(),
        features: form.features || [],
        recommended: !!form.recommended,
        enabled: form.enabled !== false,
        sortOrder: Number(form.sortOrder) || 0,
      };
      await adminDB.save("project-pricing", payload);
      const list = editing ? items.map((i) => (i.id === editing.id ? payload : i)) : [...items, payload];
      list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setItems(list);
      setCreating(false);
      setEditing(null);
    } catch (err: any) {
      alert(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (item: ProjectPricing, key: "enabled" | "recommended") => {
    const col = key === "enabled" ? "enabled" : "recommended";
    const next = key === "enabled" ? item.enabled !== false : !!item.recommended;
    try {
      await adminDB.update("project-pricing", item.id, { [col]: !next });
      setItems(items.map((i) => (i.id === item.id ? { ...i, [key]: !next } : i)));
    } catch (err: any) {
      alert(err.message || "Update failed");
    }
  };

  const move = async (item: ProjectPricing, dir: -1 | 1) => {
    const sorted = [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const idx = sorted.findIndex((i) => i.id === item.id);
    const target = idx + dir;
    if (target < 0 || target >= sorted.length) return;
    const a = sorted[idx];
    const b = sorted[target];
    const oa = a.sortOrder || 0;
    const ob = b.sortOrder || 0;
    try {
      await adminDB.update("project-pricing", a.id, { sort_order: ob });
      await adminDB.update("project-pricing", b.id, { sort_order: oa });
      setItems(sorted.map((i, k) => (i.id === a.id ? { ...i, sortOrder: ob } : i.id === b.id ? { ...i, sortOrder: oa } : i)));
    } catch (err: any) {
      alert(err.message || "Reorder failed");
    }
  };

  const remove = async (item: ProjectPricing) => {
    if (!confirm(`Delete "${item.projectType}"? It will be hidden from the live pricing page.`)) return;
    try {
      await adminDB.remove("project-pricing", item.id);
      setItems(items.filter((i) => i.id !== item.id));
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  const sorted = [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-700 dark:text-neutral-200">Manage Project-Based Pricing Cards</h4>
        {!creating && (
          <button onClick={openCreate} className="flex items-center space-x-1 rounded-md bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition">
            <Plus className="h-3.5 w-3.5" /> Add Card
          </button>
        )}
      </div>

      {creating && (
        <form onSubmit={save} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-neutral-700">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-2">
            <span className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">
              {editing ? "Edit Project Pricing Card" : "New Project Pricing Card"}
            </span>
            <button type="button" onClick={() => { setCreating(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-neutral-200"><X className="h-4 w-4" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Service *</label>
              <select value={form.service || SERVICES[0]} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputCls}>
                {enumList(SERVICES)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Project Type *</label>
              <input type="text" required value={form.projectType || ""} onChange={(e) => setForm({ ...form, projectType: e.target.value })} placeholder="e.g. Landing Page Website" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className={labelCls}>Price (USD) *</label>
              <input type="number" min={0} required value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Currency</label>
              <input value={form.currency || "USD"} onChange={(e) => setForm({ ...form, currency: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Billing Type</label>
              <select value={form.billingType || "one-time"} onChange={(e) => setForm({ ...form, billingType: e.target.value })} className={inputCls}>
                {enumList(["one-time", "monthly", "yearly"])}
              </select>
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input type="number" value={form.sortOrder || 0} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Delivery *</label>
              <input type="text" required value={form.delivery || ""} onChange={(e) => setForm({ ...form, delivery: e.target.value })} placeholder="e.g. 5-7 business days" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Revisions</label>
              <input value={form.revisions || ""} onChange={(e) => setForm({ ...form, revisions: e.target.value })} placeholder="e.g. 3 revision rounds" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Support</label>
              <input value={form.support || ""} onChange={(e) => setForm({ ...form, support: e.target.value })} placeholder="e.g. 30 days support" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Features (one per line) *</label>
            <FeaturesInput value={form.features || []} onChange={(features) => setForm({ ...form, features })} />
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Switch checked={form.enabled !== false} onChange={(v) => setForm({ ...form, enabled: v })} label="Published (visible on site)" />
            <Switch checked={!!form.recommended} onChange={(v) => setForm({ ...form, recommended: v })} label="Best Seller badge" />
          </div>

          <button type="submit" disabled={saving} className="flex items-center space-x-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 font-bold transition">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            <span>{editing ? "Save Changes" : "Create Card"}</span>
          </button>
        </form>
      )}

      <div className="space-y-3">
        {sorted.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 p-10 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
              <Inbox className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-gray-500 dark:text-neutral-400 font-bold">No project pricing cards yet.</p>
            <p className="text-gray-400 dark:text-neutral-500 mt-1">Click "Add Card" or load the default starter content.</p>
          </div>
        )}
        {sorted.map((item) => (
          <div key={item.id} className={cardCls}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500"><Layers className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-neutral-100">{item.projectType}</p>
                  <p className="text-[10px] text-gray-400 dark:text-neutral-500">{item.service} — {en("Starting at", currentLang)} ${item.price}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {item.recommended && <span className="rounded bg-amber-100 dark:bg-amber-500/15 px-2 py-0.5 text-[9px] font-black uppercase text-amber-700 dark:text-amber-300">Bestseller</span>}
                <span className={`rounded px-2 py-0.5 text-[9px] font-black uppercase ${item.enabled !== false ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400"}`}>
                  {item.enabled !== false ? "Published" : "Hidden"}
                </span>
                <button onClick={() => move(item, -1)} disabled={sorted[0]?.id === item.id} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300 disabled:opacity-30" title="Move up"><ArrowUp className="h-3.5 w-3.5" /></button>
                <button onClick={() => move(item, 1)} disabled={sorted[sorted.length - 1]?.id === item.id} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300 disabled:opacity-30" title="Move down"><ArrowDown className="h-3.5 w-3.5" /></button>
                <button onClick={() => toggle(item, "enabled")} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300" title="Publish / unpublish">
                  {item.enabled !== false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => toggle(item, "recommended")} className={item.recommended ? "rounded bg-amber-50 dark:bg-amber-500/15 p-1.5 text-amber-600 dark:text-amber-400" : "rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300"} title="Best seller badge">
                  <Star className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => startEdit(item)} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(item)} className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 p-1.5 text-red-600 dark:text-red-400" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- monthly */

function MonthlyTab({ items, setItems, currentLang }: { items: MonthlyPricing[]; setItems: (v: MonthlyPricing[]) => void; currentLang: string }) {
  const [editing, setEditing] = useState<MonthlyPricing | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<MonthlyPricing>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ service: SERVICES[0], currency: "USD", billingType: "monthly", enabled: true, recommended: false, price: 0, sortOrder: items.length + 1 });
    setCreating(true);
  };
  const startEdit = (item: MonthlyPricing) => { setEditing(item); setForm({ ...item }); setCreating(true); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: MonthlyPricing = {
        id: editing?.id || crypto.randomUUID(),
        planName: (form.planName || "").trim(),
        service: form.service as string,
        description: (form.description || "").trim(),
        price: Number(form.price) || 0,
        currency: form.currency || "USD",
        billingType: form.billingType || "monthly",
        delivery: (form.delivery || "").trim(),
        features: form.features || [],
        recommended: !!form.recommended,
        enabled: form.enabled !== false,
        sortOrder: Number(form.sortOrder) || 0,
      };
      await adminDB.save("monthly-pricing", payload);
      const list = editing ? items.map((i) => (i.id === editing.id ? payload : i)) : [...items, payload];
      list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setItems(list);
      setCreating(false);
      setEditing(null);
    } catch (err: any) {
      alert(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (item: MonthlyPricing, key: "enabled" | "recommended") => {
    const col = key === "enabled" ? "enabled" : "recommended";
    const next = key === "enabled" ? item.enabled !== false : !!item.recommended;
    try {
      await adminDB.update("monthly-pricing", item.id, { [col]: !next });
      setItems(items.map((i) => (i.id === item.id ? { ...i, [key]: !next } : i)));
    } catch (err: any) {
      alert(err.message || "Update failed");
    }
  };

  const move = async (item: MonthlyPricing, dir: -1 | 1) => {
    const sorted = [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const idx = sorted.findIndex((i) => i.id === item.id);
    const target = idx + dir;
    if (target < 0 || target >= sorted.length) return;
    const a = sorted[idx], b = sorted[target];
    const oa = a.sortOrder || 0, ob = b.sortOrder || 0;
    try {
      await adminDB.update("monthly-pricing", a.id, { sort_order: ob });
      await adminDB.update("monthly-pricing", b.id, { sort_order: oa });
      setItems(sorted.map((i, k) => (i.id === a.id ? { ...i, sortOrder: ob } : i.id === b.id ? { ...i, sortOrder: oa } : i)));
    } catch (err: any) { alert(err.message || "Reorder failed"); }
  };

  const remove = async (item: MonthlyPricing) => {
    if (!confirm(`Delete "${item.planName}"?`)) return;
    try {
      await adminDB.remove("monthly-pricing", item.id);
      setItems(items.filter((i) => i.id !== item.id));
    } catch (err: any) { alert(err.message || "Delete failed"); }
  };

  const sorted = [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-700 dark:text-neutral-200">Manage Monthly Subscription Plans</h4>
        {!creating && (
          <button onClick={openCreate} className="flex items-center space-x-1 rounded-md bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition">
            <Plus className="h-3.5 w-3.5" /> Add Plan
          </button>
        )}
      </div>

      {creating && (
        <form onSubmit={save} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-neutral-700">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-2">
            <span className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">
              {editing ? "Edit Monthly Plan" : "New Monthly Plan"}
            </span>
            <button type="button" onClick={() => { setCreating(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-neutral-200"><X className="h-4 w-4" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Plan Name *</label>
              <input type="text" required value={form.planName || ""} onChange={(e) => setForm({ ...form, planName: e.target.value })} placeholder="e.g. Growth Marketing" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Service *</label>
              <select value={form.service || SERVICES[0]} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputCls}>{enumList(SERVICES)}</select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={2} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} placeholder="Short summary shown under the plan title" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className={labelCls}>Price (USD) *</label>
              <input type="number" min={0} required value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Currency</label>
              <input value={form.currency || "USD"} onChange={(e) => setForm({ ...form, currency: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Billing Type</label>
              <select value={form.billingType || "monthly"} onChange={(e) => setForm({ ...form, billingType: e.target.value })} className={inputCls}>{enumList(["monthly", "yearly"])}</select>
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input type="number" value={form.sortOrder || 0} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Features (one per line) *</label>
            <FeaturesInput value={form.features || []} onChange={(features) => setForm({ ...form, features })} />
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Switch checked={form.enabled !== false} onChange={(v) => setForm({ ...form, enabled: v })} label="Published (visible on site)" />
            <Switch checked={!!form.recommended} onChange={(v) => setForm({ ...form, recommended: v })} label="Most Popular badge" />
          </div>

          <button type="submit" disabled={saving} className="flex items-center space-x-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 font-bold transition">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            <span>{editing ? "Save Changes" : "Create Plan"}</span>
          </button>
        </form>
      )}

      <div className="space-y-3">
        {sorted.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 p-10 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10"><Inbox className="h-4 w-4 text-orange-500" /></div>
            <p className="text-gray-500 dark:text-neutral-400 font-bold">No monthly plans yet.</p>
            <p className="text-gray-400 dark:text-neutral-500 mt-1">Click "Add Plan" or load the default starter content.</p>
          </div>
        )}
        {sorted.map((item) => (
          <div key={item.id} className={cardCls}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500"><CalendarRange className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-neutral-100">{item.planName}</p>
                  <p className="text-[10px] text-gray-400 dark:text-neutral-500">{item.service} — ${item.price}/mo</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {item.recommended && <span className="rounded bg-amber-100 dark:bg-amber-500/15 px-2 py-0.5 text-[9px] font-black uppercase text-amber-700 dark:text-amber-300">Popular</span>}
                <span className={`rounded px-2 py-0.5 text-[9px] font-black uppercase ${item.enabled !== false ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400"}`}>
                  {item.enabled !== false ? "Published" : "Hidden"}
                </span>
                <button onClick={() => move(item, -1)} disabled={sorted[0]?.id === item.id} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                <button onClick={() => move(item, 1)} disabled={sorted[sorted.length - 1]?.id === item.id} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                <button onClick={() => toggle(item, "enabled")} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300" title="Publish / unpublish">
                  {item.enabled !== false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => toggle(item, "recommended")} className={item.recommended ? "rounded bg-amber-50 dark:bg-amber-500/15 p-1.5 text-amber-600 dark:text-amber-400" : "rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300"}><Star className="h-3.5 w-3.5" /></button>
                <button onClick={() => startEdit(item)} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(item)} className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 p-1.5 text-red-600 dark:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- agency */

function AgencyTab({ items, setItems, currentLang }: { items: AgencyPackage[]; setItems: (v: AgencyPackage[]) => void; currentLang: string }) {
  const [editing, setEditing] = useState<AgencyPackage | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<AgencyPackage>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ billingType: "one-time", enabled: true, mostPopular: false, originalPrice: 0, price: 0, includedServices: [], features: [], sortOrder: items.length + 1 });
    setCreating(true);
  };
  const startEdit = (item: AgencyPackage) => { setEditing(item); setForm({ ...item }); setCreating(true); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: AgencyPackage = {
        id: editing?.id || crypto.randomUUID(),
        name: (form.name || "").trim(),
        tagline: (form.tagline || "").trim(),
        originalPrice: Number(form.originalPrice) || 0,
        price: Number(form.price) || 0,
        discount: form.discount !== undefined ? Number(form.discount) : undefined,
        billingType: form.billingType || "one-time",
        delivery: (form.delivery || "").trim(),
        support: (form.support || "").trim(),
        features: form.features || [],
        includedServices: form.includedServices || [],
        mostPopular: !!form.mostPopular,
        enabled: form.enabled !== false,
        sortOrder: Number(form.sortOrder) || 0,
      };
      await adminDB.save("agency-packages", payload);
      const list = editing ? items.map((i) => (i.id === editing.id ? payload : i)) : [...items, payload];
      list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setItems(list);
      setCreating(false);
      setEditing(null);
    } catch (err: any) {
      alert(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (item: AgencyPackage, key: "enabled" | "mostPopular") => {
    const col = key === "enabled" ? "enabled" : "most_popular";
    const next = key === "enabled" ? item.enabled !== false : !!item.mostPopular;
    try {
      await adminDB.update("agency-packages", item.id, { [col]: !next });
      setItems(items.map((i) => (i.id === item.id ? { ...i, [key]: !next } : i)));
    } catch (err: any) { alert(err.message || "Update failed"); }
  };

  const duplicate = async (item: AgencyPackage) => {
    const copy: AgencyPackage = { ...item, id: crypto.randomUUID(), name: `${item.name} (Copy)`, sortOrder: (item.sortOrder || 0) + 1, mostPopular: false };
    try {
      await adminDB.save("agency-packages", copy);
      setItems([...items, copy].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)));
    } catch (err: any) { alert(err.message || "Duplicate failed"); }
  };

  const move = async (item: AgencyPackage, dir: -1 | 1) => {
    const sorted = [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const idx = sorted.findIndex((i) => i.id === item.id);
    const target = idx + dir;
    if (target < 0 || target >= sorted.length) return;
    const a = sorted[idx], b = sorted[target];
    const oa = a.sortOrder || 0, ob = b.sortOrder || 0;
    try {
      await adminDB.update("agency-packages", a.id, { sort_order: ob });
      await adminDB.update("agency-packages", b.id, { sort_order: oa });
      setItems(sorted.map((i, k) => (i.id === a.id ? { ...i, sortOrder: ob } : i.id === b.id ? { ...i, sortOrder: oa } : i)));
    } catch (err: any) { alert(err.message || "Reorder failed"); }
  };

  const remove = async (item: AgencyPackage) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await adminDB.remove("agency-packages", item.id);
      setItems(items.filter((i) => i.id !== item.id));
    } catch (err: any) { alert(err.message || "Delete failed"); }
  };

  const sorted = [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-700 dark:text-neutral-200">Manage Agency Packages</h4>
        {!creating && (
          <button onClick={openCreate} className="flex items-center space-x-1 rounded-md bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition">
            <Plus className="h-3.5 w-3.5" /> Add Package
          </button>
        )}
      </div>

      {creating && (
        <form onSubmit={save} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-neutral-700">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-2">
            <span className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">
              {editing ? "Edit Agency Package" : "New Agency Package"}
            </span>
            <button type="button" onClick={() => { setCreating(false); setEditing(null); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-neutral-200"><X className="h-4 w-4" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Package Name *</label>
              <input type="text" required value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Growth Engine" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tagline</label>
              <input value={form.tagline || ""} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="Short one-liner" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className={labelCls}>Original Price</label>
              <input type="number" min={0} value={form.originalPrice ?? 0} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) || 0 })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Sale Price *</label>
              <input type="number" min={0} required value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Discount (%)</label>
              <input type="number" min={0} max={99} value={form.discount ?? ""} onChange={(e) => setForm({ ...form, discount: e.target.value === "" ? undefined : Number(e.target.value) })} className={inputCls} placeholder="auto if blank" />
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input type="number" value={form.sortOrder || 0} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Billing Type</label>
              <select value={form.billingType || "one-time"} onChange={(e) => setForm({ ...form, billingType: e.target.value })} className={inputCls}>{enumList(["one-time", "monthly", "yearly"])}</select>
            </div>
            <div>
              <label className={labelCls}>Delivery</label>
              <input value={form.delivery || ""} onChange={(e) => setForm({ ...form, delivery: e.target.value })} placeholder="e.g. 6-8 weeks delivery" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Support</label>
              <input value={form.support || ""} onChange={(e) => setForm({ ...form, support: e.target.value })} placeholder="e.g. 180 days support" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Services Included</label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => {
                const on = (form.includedServices || []).includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, includedServices: on ? (form.includedServices || []).filter((x) => x !== s) : [...(form.includedServices || []), s] })}
                    className={`rounded-md px-2.5 py-1.5 text-[10px] font-bold transition ${on ? "bg-orange-500 text-white" : "bg-gray-50 dark:bg-neutral-800 text-gray-500 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700"}`}
                  >
                    <Check className="inline h-3 w-3 mr-0.5" />{s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className={labelCls}>Features (one per line) *</label>
            <FeaturesInput value={form.features || []} onChange={(features) => setForm({ ...form, features })} />
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Switch checked={form.enabled !== false} onChange={(v) => setForm({ ...form, enabled: v })} label="Published (visible on site)" />
            <Switch checked={!!form.mostPopular} onChange={(v) => setForm({ ...form, mostPopular: v })} label="Most Popular ribbon" />
          </div>

          <button type="submit" disabled={saving} className="flex items-center space-x-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 font-bold transition">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            <span>{editing ? "Save Changes" : "Create Package"}</span>
          </button>
        </form>
      )}

      <div className="space-y-3">
        {sorted.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 p-10 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10"><PackageSearch className="h-4 w-4 text-orange-500" /></div>
            <p className="text-gray-500 dark:text-neutral-400 font-bold">No agency packages yet.</p>
            <p className="text-gray-400 dark:text-neutral-500 mt-1">Click "Add Package" or load the default starter content.</p>
          </div>
        )}
        {sorted.map((item) => (
          <div key={item.id} className={cardCls}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500"><BadgeCheck className="h-4 w-4" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-neutral-100">{item.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-neutral-500">${item.price}{item.originalPrice > item.price ? ` (was $${item.originalPrice})` : ""} — {en("one-time bundle", currentLang)} · {(item.includedServices || []).length} services included</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {item.mostPopular && <span className="rounded bg-amber-100 dark:bg-amber-500/15 px-2 py-0.5 text-[9px] font-black uppercase text-amber-700 dark:text-amber-300">Popular</span>}
                <span className={`rounded px-2 py-0.5 text-[9px] font-black uppercase ${item.enabled !== false ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-neutral-400"}`}>
                  {item.enabled !== false ? "Published" : "Hidden"}
                </span>
                <button onClick={() => move(item, -1)} disabled={sorted[0]?.id === item.id} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                <button onClick={() => move(item, 1)} disabled={sorted[sorted.length - 1]?.id === item.id} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                <button onClick={() => toggle(item, "enabled")} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300" title="Publish / unpublish">
                  {item.enabled !== false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => toggle(item, "mostPopular")} className={item.mostPopular ? "rounded bg-amber-50 dark:bg-amber-500/15 p-1.5 text-amber-600 dark:text-amber-400" : "rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300"}><Star className="h-3.5 w-3.5" /></button>
                <button onClick={() => duplicate(item)} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300" title="Duplicate"><Copy className="h-3.5 w-3.5" /></button>
                <button onClick={() => startEdit(item)} className="rounded bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 p-1.5 text-gray-500 dark:text-neutral-300"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(item)} className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 p-1.5 text-red-600 dark:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- quotes */

function QuotesTab({ items, setItems, currentLang }: { items: PricingQuoteRequest[]; setItems: (v: PricingQuoteRequest[]) => void; currentLang: string }) {
  const updateStatus = async (q: PricingQuoteRequest, status: PricingQuoteRequest["status"]) => {
    try {
      await adminDB.update("pricing-quotes", q.id, { status });
      setItems(items.map((i) => (i.id === q.id ? { ...i, status } : i)));
    } catch (err: any) { alert(err.message || "Update failed"); }
  };

  const remove = async (q: PricingQuoteRequest) => {
    if (!confirm(`Delete quote from ${q.name}?`)) return;
    try {
      await adminDB.remove("pricing-quotes", q.id);
      setItems(items.filter((i) => i.id !== q.id));
    } catch (err: any) { alert(err.message || "Delete failed"); }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-gray-700 dark:text-neutral-200">Inbound Pricing & Business Quote Requests</h4>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 p-10 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10"><Inbox className="h-4 w-4 text-orange-500" /></div>
          <p className="text-gray-500 dark:text-neutral-400 font-bold">No quote requests yet.</p>
          <p className="text-gray-400 dark:text-neutral-500 mt-1">Inquiries submitted from the public pricing page will appear here.</p>
        </div>
      ) : (
        items.map((quote) => (
          <div key={quote.id} className={cardCls}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 pb-2.5">
              <div>
                <span className="text-sm font-bold text-gray-900 dark:text-white block">{quote.name}</span>
                <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-mono block mt-0.5">
                  {quote.company} • {quote.industry || "—"} • {new Date(quote.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase ${
                  quote.status === "pending" ? "bg-amber-100 text-amber-800 dark:text-amber-300" :
                  quote.status === "reviewed" ? "bg-blue-100 text-blue-800 dark:bg-orange-500/15 dark:text-orange-300" :
                  "bg-emerald-100 text-emerald-800"
                }`}>{quote.status}</span>
                <select
                  value={quote.status}
                  onChange={(e) => updateStatus(quote, e.target.value as any)}
                  className="text-[10px] bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-neutral-700 rounded px-2 py-1 font-bold text-gray-700 dark:text-neutral-200"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                </select>
                <button onClick={() => remove(quote)} className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 p-1 border border-red-100 dark:border-red-500/20 transition"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] pt-3">
              <div className="space-y-0.5">
                <span className="text-gray-400 dark:text-neutral-500 font-bold block">EMAIL</span>
                <a href={`mailto:${quote.email}`} className="text-blue-600 dark:text-orange-400 hover:underline font-semibold block break-all">{quote.email}</a>
              </div>
              <div className="space-y-0.5">
                <span className="text-gray-400 dark:text-neutral-500 font-bold block">PHONE</span>
                <span className="text-gray-800 dark:text-neutral-100 font-mono font-semibold block">{quote.phone || "—"}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-gray-400 dark:text-neutral-500 font-bold block">SERVICE</span>
                <span className="text-gray-800 dark:text-neutral-100 font-bold block">{quote.service || "—"}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-gray-400 dark:text-neutral-500 font-bold block">BUDGET & TIMELINE</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold block">{quote.budget || "—"} ({quote.timeline || "—"})</span>
              </div>
            </div>

            {quote.description && (
              <div className="mt-3 bg-gray-50/50 dark:bg-neutral-800/40 rounded-lg p-3 text-gray-700 dark:text-neutral-200 leading-relaxed font-sans text-xs border border-gray-100 dark:border-neutral-800">
                <span className="font-extrabold text-blue-600 dark:text-orange-400 text-[10px] block mb-1">PROJECT DETAILS</span>
                {quote.description}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}