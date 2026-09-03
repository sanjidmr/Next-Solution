"use client";
/**
 * AdminPortfolioManager — dynamic, service-specific portfolio CRUD.
 * Selecting a service reveals only the relevant fields for that service via the
 * PORTFOLIO_SERVICE_FIELDS configuration. Generic case-study fields (image,
 * description, client, duration, status, featured, links) remain available for
 * every service. All data is persisted to portfolio_items.project_data JSONB.
 */
import React, { useState, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Upload,
  Loader2,
  Eye,
  Globe,
  FolderPlus,
  LayoutGrid,
  CheckCircle2,
  X,
  ExternalLink,
  Search,
} from "lucide-react";
import { adminDB } from "@/lib/admin-fetch";
import { PortfolioItem, PortfolioServiceField } from "@/types";
import { getPortfolioFields } from "@/data/portfolioFields";

const SERVICES = [
  "Web Development",
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Digital Marketing",
  "SEO",
  "AI Services",
  "Mobile App",
];

const inputCls =
  "w-full rounded-lg border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-3 py-2 text-xs text-gray-800 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition";
const labelCls =
  "block text-[11px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5";

const emptyForm: Partial<PortfolioItem> = {
  titleEn: "",
  category: "Web Development",
  projectType: "",
  descriptionEn: "",
  client: "",
  duration: "",
  image: "",
  technologies: [],
  slug: "",
  status: "published",
  featured: false,
  galleryJson: "[]",
  featuresEn: [],
  liveUrl: "",
  projectData: {},
};

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: PortfolioServiceField;
  value: any;
  onChange: (v: any) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        placeholder={field.placeholder || ""}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    );
  }
  if (field.type === "list") {
    return (
      <input
        placeholder="Comma separated, e.g. Next.js, Supabase, Tailwind"
        value={Array.isArray(value) ? value.join(", ") : ""}
        onChange={(e) =>
          onChange(
            e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
          )
        }
        className={inputCls}
      />
    );
  }
  return (
    <input
      type={field.type === "url" ? "url" : "text"}
      placeholder={field.placeholder || ""}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  );
}

export default function AdminPortfolioManager({
  onNotice,
}: {
  onNotice?: (msg: string) => void;
}) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<Partial<PortfolioItem>>(emptyForm);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const data = await adminDB.getAllPortfolio();
    setItems(data || []);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const notice = (m: string) => (onNotice ? onNotice(m) : undefined);

  const config = useMemo(
    () => getPortfolioFields(form.category || "Web Development"),
    [form.category],
  );

  const setMeta = (key: string, val: any) => {
    setForm({
      ...form,
      projectData: { ...(form.projectData || {}), [key]: val },
    });
  };

  const uploadFile = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "projects");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Upload failed");
    return json.data.url;
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setForm({ ...form, image: url });
      notice("Featured image uploaded.");
    } catch (err: any) {
      notice(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const buildSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editing ? editing.id : `portfolio-${Date.now()}`;
    const slug = form.slug || buildSlug(form.titleEn || "") || `project-${Date.now()}`;
    const gallery: string[] = [];
    try {
      gallery.push(...(JSON.parse(form.galleryJson || "[]") || []));
    } catch {
      /* ignore */
    }

    const item: PortfolioItem = {
      id,
      titleEn: form.titleEn || "Untitled Project",
      titleBn: form.titleBn || form.titleEn || "শিরোনামহীন প্রজেক্ট",
      category: form.category || "Web Development",
      projectType: form.projectType || (form.category === "Web Development" ? "Website" : form.category),
      descriptionEn: form.descriptionEn || "",
      descriptionBn: form.descriptionBn || "",
      client: form.client || "",
      duration: form.duration || "",
      budget: form.budget || "",
      challengeEn: "",
      challengeBn: "",
      solutionEn: "",
      solutionBn: "",
      resultEn: "",
      resultBn: "",
      technologies: Array.isArray(form.technologies) ? form.technologies : [],
      image:
        form.image ||
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      featured: !!form.featured,
      rating: 5,
      slug,
      status: form.status || "published",
      sortOrder: Number(form.sortOrder) || 0,
      galleryJson: JSON.stringify(gallery),
      featuresEn: Array.isArray(form.featuresEn) ? form.featuresEn : [],
      featuresBn: [],
      liveUrl: form.liveUrl || "",
      githubUrl: "",
      projectData: form.projectData || {},
      seoTitleEn: "",
      seoTitleBn: "",
      seoDescEn: form.descriptionEn?.slice(0, 155) || "",
      seoDescBn: "",
    };

    try {
      await adminDB.savePortfolio(item);
      await load();
      setFormOpen(false);
      setEditing(null);
      setForm(emptyForm);
      notice("Portfolio project saved.");
    } catch (err: any) {
      notice(err?.message || "Failed to save portfolio project. If you filled service-specific fields, make sure the `project_data` DB migration has been applied.");
    }
  };

  const startEdit = (item: PortfolioItem) => {
    setEditing(item);
    setForm({
      ...emptyForm,
      ...item,
      projectData: item.projectData || {},
    });
    setFormOpen(true);
  };

  const handleDelete = async (item: PortfolioItem) => {
    if (!window.confirm("Delete this portfolio project?")) return;
    await adminDB.deletePortfolio(item.id);
    await load();
    notice("Portfolio project deleted.");
  };

  const camelToTitle = (k: string) =>
    k
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());

  const filtered = items.filter((i) => {
    const matchesSearch =
      !search ||
      (i.titleEn + " " + i.client + " " + (i.category || "")).toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || i.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500">
            <LayoutGrid className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-black text-gray-900 dark:text-white tracking-tight">
              Manage Portfolio
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-neutral-500">
              Service-specific dynamic portfolio projects
            </p>
          </div>
        </div>
        {!formOpen && (
          <button
            onClick={() => {
              setEditing(null);
              setForm(emptyForm);
              setFormOpen(true);
            }}
            className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-orange-500/20"
          >
            <Plus className="h-3.5 w-3.5" />
            New Case Study
          </button>
        )}
      </div>

      {/* List filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {["All", ...SERVICES].map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition border ${
                activeFilter === s
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-400 hover:border-orange-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-8 rounded-lg border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-3 py-2 text-xs text-gray-800 dark:text-neutral-100 placeholder:text-gray-400 w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Form (create / edit) */}
      {formOpen ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-3">
            <h4 className="text-sm font-black text-gray-900 dark:text-white">
              {editing ? `Edit: ${editing.titleEn}` : "Create New Case Study"}
            </h4>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                setEditing(null);
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Service selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Service</label>
              <select
                value={form.category || "Web Development"}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputCls}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-white dark:bg-neutral-900">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Project Title (English) *</label>
              <input
                required
                value={form.titleEn || ""}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                placeholder="e.g. Next Solution Agency Website"
                className={inputCls}
              />
            </div>
          </div>

          {/* Dynamic fields for selected service */}
          {config && config.fields.length > 0 && (
            <div className="rounded-xl border border-dashed border-orange-300/60 dark:border-orange-500/30 bg-orange-50/30 dark:bg-orange-500/[0.04] p-4 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                {form.category} — Project Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {config.fields.map((f) => (
                  <div
                    key={f.key}
                    className={f.type === "textarea" ? "sm:col-span-2" : ""}
                  >
                    <label className={labelCls}>{f.labelEn}</label>
                    <FieldInput
                      field={f}
                      value={form.projectData?.[f.key]}
                      onChange={(v) => setMeta(f.key, v)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Project Image</label>
              <div className="flex items-center gap-3">
                {form.image ? (
                  <div className="relative h-16 w-24 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
                    <img
                      src={form.image}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-16 w-24 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-neutral-600 text-gray-400 hover:text-orange-500 hover:border-orange-400 transition">
                    {uploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelCls}>Client / Brand</label>
              <input
                value={form.client || ""}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                placeholder="Client or brand name"
                className={inputCls}
              />
            </div>
          </div>

          {/* Generic fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Short Description</label>
              <textarea
                rows={2}
                value={form.descriptionEn || ""}
                onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                placeholder="One or two sentences summarising the project."
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Duration</label>
              <input
                value={form.duration || ""}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g. 3 Months"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Technologies (chips)</label>
              <input
                value={Array.isArray(form.technologies) ? form.technologies.join(", ") : ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Next.js, Supabase, Tailwind CSS"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Live URL (Web Dev opens direct)</label>
              <input
                type="url"
                value={form.liveUrl || ""}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                placeholder="https://..."
                className={inputCls}
              />
            </div>
          </div>

          {/* Status / featured / publish */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              Featured project
            </label>
            <select
              value={form.status || "published"}
              onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              className="rounded-lg border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormOpen(false);
                  setEditing(null);
                }}
                className="rounded-lg border border-gray-200 dark:border-neutral-700 px-4 py-2 text-xs font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-xs font-bold transition shadow-sm shadow-orange-500/20"
              >
                {editing ? "Save Changes" : "Create Project"}
              </button>
            </div>
          </div>
        </form>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-gray-100 dark:border-neutral-800 overflow-hidden">
              <div className="h-32 bg-gray-100 dark:bg-neutral-800" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-2/3 rounded bg-gray-100 dark:bg-neutral-800" />
                <div className="h-2.5 w-full rounded bg-gray-100 dark:bg-neutral-800" />
                <div className="h-2.5 w-1/2 rounded bg-gray-100 dark:bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center rounded-2xl border border-dashed border-gray-200 dark:border-neutral-700">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 text-gray-300 dark:text-neutral-600">
            <FolderPlus className="h-6 w-6" />
          </span>
          <p className="text-sm font-bold text-gray-600 dark:text-neutral-300 mt-3">
            No portfolio projects found
          </p>
          <p className="text-[11px] text-gray-400 dark:text-neutral-500 mt-1">
            Create your first service-specific case study.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const pFields = getPortfolioFields(p.category || "");
            const meta = p.projectData || {};
            const previewKey = pFields?.fields.find((f) => f.type !== "url")?.key;
            const preview = previewKey ? meta[previewKey] : "";
            return (
              <div
                key={p.id}
                className="group rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden transition hover:shadow-lg hover:shadow-black/[0.05] dark:hover:shadow-black/30 hover:-translate-y-0.5 duration-200"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={p.image || ""}
                    alt={p.titleEn}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 rounded-md bg-black/70 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="absolute top-2 right-2 rounded-md bg-orange-500 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm font-black text-gray-900 dark:text-white truncate">
                    {p.titleEn}
                  </p>
                  {p.client && (
                    <p className="text-[10px] text-gray-400 dark:text-neutral-500 font-semibold">
                      {p.client}
                    </p>
                  )}
                  {preview && typeof preview !== "object" && (
                    <p className="text-[11px] text-gray-500 dark:text-neutral-400 line-clamp-2">
                      {String(preview)}
                    </p>
                  )}
                  {Array.isArray(p.technologies) && p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.technologies.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] font-bold px-1.5 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-neutral-800">
                    <button
                      onClick={() => startEdit(p)}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </button>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition"
                      >
                        <ExternalLink className="h-3 w-3" /> Live
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(p)}
                      className="ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}