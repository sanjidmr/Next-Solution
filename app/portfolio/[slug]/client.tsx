"use client";
/**
 * PortfolioDetails — dynamic service-specific case-study page for
 * /portfolio/[slug]. Renders the correct field sections for the selected
 * service based on the project's `category` and structured `projectData`.
 */
import React from "react";
import Link from "next/link";
import {
  Globe,
  Eye,
  ExternalLink,
  PlayCircle,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Target,
  TrendingUp,
  Lightbulb,
  Cpu,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { PortfolioItem } from "@/types";
import { getPortfolioFields } from "@/data/portfolioFields";

const externalCTA: Record<string, { label: string; icon: any }> = {
  "Web Development": { label: "Visit Website", icon: Globe },
  "Video Editing": { label: "Watch Video", icon: PlayCircle },
  "Digital Marketing": { label: "View Project", icon: ExternalLink },
  "Graphic Design": { label: "View Case Study", icon: Eye },
  "UI/UX Design": { label: "View Prototype", icon: Eye },
  SEO: { label: "View Website", icon: Globe },
  "AI Services": { label: "View Demo", icon: Cpu },
  "Mobile App": { label: "View App", icon: ExternalLink },
};

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
      {children}
    </span>
  );
}

function ListBlock({ label, items }: { label: string; items: any[] }) {
  if (!items || items.length === 0) return null;
  if (items.length === 1 && typeof items[0] === "object") return null;
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#151515] p-5">
      <MetaLabel>{label}</MetaLabel>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[11px] font-bold px-2.5 py-1"
          >
            <ChevronRight className="h-3 w-3" />
            {typeof it === "string" ? it : String(it)}
          </span>
        ))}
      </div>
    </div>
  );
}

function TextBlock({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#151515] p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-500 mt-0.5">
          <Layers className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <MetaLabel>{label}</MetaLabel>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioDetails({ item }: { item: PortfolioItem }) {
  const category = item.category || "Web Development";
  const fields = getPortfolioFields(category)?.fields || [];
  const meta = item.projectData || {};
  const cta = externalCTA[category] || externalCTA["Web Development"];
  const CtaIcon = cta.icon;
  const gallery: string[] = [];
  try {
    if (item.galleryJson) {
      const parsed = JSON.parse(item.galleryJson);
      if (Array.isArray(parsed)) gallery.push(...parsed);
    }
    if (Array.isArray(item.thumbnailImage)) gallery.push(...(item.thumbnailImage as any));
    else if (item.thumbnailImage) gallery.unshift(item.thumbnailImage);
  } catch {
    /* ignore */
  }

  // Web Development: direct external link only.
  const isWebDev = category === "Web Development";
  const externalHref = isWebDev
    ? item.liveUrl
    : item.liveUrl || (meta as any).websiteUrl || (meta as any).demoUrl || (meta as any).projectUrl;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0908] text-gray-900 dark:text-white">
      {/* Back bar */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 pb-2">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 dark:text-neutral-500 hover:text-orange-500 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Portfolio
        </Link>
      </div>

      {/* Title */}
      <header className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="rounded-md bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
            {category}
          </span>
          {item.projectType && (
            <span className="rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
              {item.projectType}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          {item.titleEn}
        </h1>
        {item.client && (
          <p className="mt-3 text-sm text-gray-500 dark:text-neutral-400 font-semibold">
            Client · {item.client}
            {item.duration ? ` · ${item.duration}` : ""}
          </p>
        )}
        {item.descriptionEn && (
          <p className="mt-4 text-sm sm:text-base text-gray-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
            {item.descriptionEn}
          </p>
        )}

        {externalHref && (
          <a
            href={externalHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 text-sm font-bold transition shadow-sm shadow-orange-500/25"
          >
            <CtaIcon className="h-4 w-4" />
            {cta.label}
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        )}
      </header>

      {/* Hero image */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
          <img
            src={item.image || ""}
            alt={item.titleEn}
            className="w-full h-auto object-cover max-h-[520px]"
          />
        </div>
      </section>

      {/* Service-specific details */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((f) => {
            const val = meta[f.key];
            if (!val) return null;
            if (f.type === "list") {
              return (
                <ListBlock
                  key={f.key}
                  label={f.labelEn}
                  items={Array.isArray(val) ? val : String(val).split(",")}
                />
              );
            }
            if (f.key === "websiteUrl" || f.key === "projectUrl" || f.key === "demoUrl" || f.key === "videoUrl" || f.key === "prototypeUrl" || f.key === "appStoreUrl" || f.key === "playStoreUrl") {
              return (
                <a
                  key={f.key}
                  href={String(val)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#151515] p-5 flex items-center justify-between group hover:border-orange-400 dark:hover:border-orange-500/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-500">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                    <div>
                      <MetaLabel>{f.labelEn}</MetaLabel>
                      <p className="text-sm font-bold text-orange-500 mt-0.5 group-hover:underline">
                        Open link
                      </p>
                    </div>
                  </div>
                </a>
              );
            }
            return <TextBlock key={f.key} label={f.labelEn} value={String(val)} />;
          })}
        </div>

        {/* Common blocks */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="mt-5">
            <ListBlock label="Technologies Used" items={item.technologies} />
          </div>
        )}
        {gallery.length > 1 && (
          <div className="mt-6">
            <MetaLabel>Project Gallery</MetaLabel>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.slice(0, 6).map((g, i) => (
                <img
                  key={i}
                  src={g}
                  alt={`${item.titleEn} gallery ${i + 1}`}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 object-cover w-full h-40"
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}