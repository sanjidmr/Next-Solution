"use client";
/**
 * Premium Dashboard Overview — Next Solution MYM
 * Modern SaaS management dashboard. All figures derive from real database
 * state. Realtime events forward upserts/deletes to the parent so counts and
 * lists stay live without full page reloads.
 */
import { useMemo, useState } from "react";
import {
  Mail,
  Users,
  BookOpen,
  Settings,
  FolderKanban,
  TrendingUp,
  Inbox,
  Clock3,
  PhoneCall,
  CheckCircle2,
  FileText,
  Sparkles,
  Loader2,
  XCircle,
} from "lucide-react";

type LeadStatus = "unread" | "read" | "replied" | "contacted" | "in_progress" | "converted" | "closed";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  status: LeadStatus;
  createdAt?: string;
}

interface DashProps {
  messages: Lead[];
  subscribers: any[];
  blogs: any[];
  services: any[];
  portfolios: any[];
  theme?: "light" | "dark";
}

const statusMeta: Record<LeadStatus, { label: string; cls: string; icon: any }> = {
  unread: {
    label: "New",
    cls: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 border-orange-200/60 dark:border-orange-500/20",
    icon: Inbox,
  },
  read: {
    label: "Contacted",
    cls: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20",
    icon: PhoneCall,
  },
  replied: {
    label: "Converted",
    cls: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20",
    icon: CheckCircle2,
  },
  contacted: {
    label: "Contacted",
    cls: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20",
    icon: PhoneCall,
  },
  in_progress: {
    label: "In Progress",
    cls: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400 border-violet-200/60 dark:border-violet-500/20",
    icon: Loader2,
  },
  converted: {
    label: "Converted",
    cls: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20",
    icon: CheckCircle2,
  },
  closed: {
    label: "Closed",
    cls: "bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-neutral-400 border-gray-200/60 dark:border-neutral-700",
    icon: XCircle,
  },
};

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: any;
  tone: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-neutral-700/70 bg-white dark:bg-[#151515] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="block text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">
          {label}
        </span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <span className="text-2xl font-black text-gray-900 dark:text-white block mt-3 font-mono tracking-tight">
        {value}
      </span>
      <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-semibold flex items-center gap-1 mt-1">
        {sub}
      </span>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 240;
  const h = 72;
  const max = Math.max(...data, 1);
  const min = 0;
  const pts = data
    .map((v, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF5A00" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF5A00" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark-fill)" />
      <polyline
        points={pts}
        fill="none"
        stroke="#FF5A00"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardOverview({
  messages,
  subscribers,
  blogs,
  services,
  portfolios,
}: DashProps) {
  const [range, setRange] = useState<"7" | "30">("7");

  const publishedBlogs = blogs.filter((b) => b.status === "published").length;
  const draftBlogs = blogs.filter((b) => b.status === "draft").length;
  const publishedServices = services.filter(
    (s) => s.status === "published",
  ).length;
  const publishedPortfolios = portfolios.filter(
    (p) => p.status === "published",
  ).length;

  const newLeads = messages.filter((m) => m.status === "unread").length;
  const contactedLeads = messages.filter(
    (m) => m.status === "read" || m.status === "contacted",
  ).length;
  const inProgressLeads = messages.filter(
    (m) => m.status === "in_progress",
  ).length;
  const convertedLeads = messages.filter(
    (m) => m.status === "replied" || m.status === "converted",
  ).length;
  const closedLeads = messages.filter((m) => m.status === "closed").length;

  // Leads over time — group by day from anonymized buckets (real counts).
  const leadSeries = useMemo(() => {
    const days = Number(range);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: days }, (_, index) => {
      const start = new Date(today);
      start.setDate(today.getDate() - days + index + 1);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      return messages.filter((message) => {
        if (!message.createdAt) return false;
        const createdAt = new Date(message.createdAt).getTime();
        return createdAt >= start.getTime() && createdAt < end.getTime();
      }).length;
    });
  }, [messages, range]);

  const byService = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of portfolios) {
      const key = p.category || p.projectType || "Other";
      map.set(key, (map.get(key) || 0) + 1);
    }
    const total = Array.from(map.values()).reduce((a, b) => a + b, 0) || 1;
    return Array.from(map.entries())
      .map(([name, count]) => ({
        name,
        count,
        pct: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [portfolios]);

  const conversionRate =
    messages.length > 0
      ? ((convertedLeads / messages.length) * 100).toFixed(1)
      : "—";

  const recentLeads = [...messages]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 5);

  const channelColors = [
    "bg-orange-500",
    "bg-black dark:bg-orange-400",
    "bg-neutral-400 dark:bg-neutral-500",
    "bg-amber-400",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-black text-gray-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-neutral-500 font-medium">
              Website and lead data at a glance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 uppercase tracking-widest"
          >
            Database records
          </span>
        </div>
      </div>

      {/* KPI Stat Cards — all real DB data */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard
          label="Inbound Leads"
          value={messages.length}
          sub={`${newLeads} new waiting`}
          icon={Mail}
          tone="bg-orange-50 dark:bg-orange-500/10 text-orange-500"
        />
        <StatCard
          label="Portfolio Projects"
          value={portfolios.length}
          sub={`${publishedPortfolios} published`}
          icon={FolderKanban}
          tone="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-white"
        />
        <StatCard
          label="Core Services"
          value={services.length}
          sub={`${publishedServices} live`}
          icon={Settings}
          tone="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-white"
        />
        <StatCard
          label="Newsletter Subscribers"
          value={subscribers.length}
          sub="Database total"
          icon={Users}
          tone="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-white"
        />
      </div>

      {/* Secondary lead pipeline row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: "New Leads",
            val: newLeads,
            icon: Inbox,
            cls: "border-orange-200/70 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/[0.06] text-orange-600 dark:text-orange-400",
          },
          {
            label: "Contacted",
            val: contactedLeads,
            icon: PhoneCall,
            cls: "border-blue-200/70 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/[0.06] text-blue-600 dark:text-blue-400",
          },
          {
            label: "In Progress",
            val: inProgressLeads,
            icon: Clock3,
            cls: "border-violet-200/70 dark:border-violet-500/20 bg-violet-50/50 dark:bg-violet-500/[0.06] text-violet-600 dark:text-violet-400",
          },
          {
            label: "Converted",
            val: convertedLeads,
            icon: CheckCircle2,
            cls: "border-emerald-200/70 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Closed",
            val: closedLeads,
            icon: XCircle,
            cls: "border-gray-200/70 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-800/60 text-gray-600 dark:text-neutral-400",
          },
          {
            label: "Conversion",
            val: messages.length ? `${conversionRate}%` : "—",
            icon: TrendingUp,
            cls: "border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 text-gray-700 dark:text-white",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-3.5 bg-white dark:bg-[#151515] shadow-sm flex items-center gap-3`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.cls}`}>
              <s.icon className="h-4 w-4" />
            </span>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wide">
                {s.label}
              </span>
              <span className="text-lg font-black text-gray-900 dark:text-white font-mono">
                {s.val}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead volume */}
        <div className="lg:col-span-8 rounded-2xl border border-gray-200 dark:border-neutral-700/70 bg-white dark:bg-[#151515] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wide">
                Lead Volume
              </h4>
              <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-0.5">
                Inbound lead activity trend
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-gray-100 dark:border-neutral-800 p-0.5 bg-gray-50 dark:bg-neutral-900">
              {(["7", "30"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition ${
                    range === r
                      ? "bg-white dark:bg-[#1f1f1f] text-orange-500 shadow-sm border border-gray-100 dark:border-neutral-700"
                      : "text-gray-400 dark:text-neutral-500 hover:text-gray-600"
                  }`}
                >
                  {r}D
                </button>
              ))}
            </div>
          </div>
          {leadSeries.some((count) => count > 0) ? (
            <div className="rounded-xl bg-gray-50/60 dark:bg-neutral-950/40 border border-gray-100 dark:border-neutral-800 p-3">
              <Sparkline data={leadSeries} />
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-neutral-700 dark:text-neutral-400">
              No contact submissions recorded in this period.
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-gray-400 dark:text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Leads received (last {range} period)
          </div>
        </div>

        {/* Portfolio by service */}
        <div className="lg:col-span-4 rounded-2xl border border-gray-200 dark:border-neutral-700/70 bg-white dark:bg-[#151515] p-5 shadow-sm">
          <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wide">
            Portfolio by Service
          </h4>
          <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-0.5 mb-4">
            Distribution across capabilities
          </p>
          <div className="space-y-3">
            {byService.length === 0 && (
              <p className="text-[11px] text-gray-400 dark:text-neutral-500">
                No portfolio projects yet.
              </p>
            )}
            {byService.slice(0, 5).map((s, i) => (
              <div key={s.name} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-600 dark:text-neutral-300">
                  <span className="truncate pr-2">{s.name}</span>
                  <span className="font-mono">{s.count}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${channelColors[i % channelColors.length]}`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-700/70 bg-white dark:bg-[#151515] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-500" />
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wide">
              Recent Leads
            </h4>
          </div>
          <span className="text-[10px] font-medium text-gray-500 dark:text-neutral-400">
            Latest
          </span>
        </div>

        {recentLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 text-gray-300 dark:text-neutral-600">
              <Inbox className="h-6 w-6" />
            </span>
            <p className="text-xs font-bold text-gray-500 dark:text-neutral-400 mt-3">
              No inbound leads yet
            </p>
            <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
              Contact form submissions are listed here after they are saved.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-neutral-800/60">
            {recentLeads.map((m) => {
              const meta = statusMeta[m.status] || statusMeta.unread;
              return (
                <div
                  key={m.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 py-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-500 font-black text-xs">
                    {m.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {m.name}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-neutral-500 truncate">
                      {m.email}
                      {m.service ? ` · ${m.service}` : ""}
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${meta.cls}`}
                    >
                      <meta.icon className="h-3 w-3" />
                      {meta.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Content totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Published services",
            val: publishedServices,
            sub: `${services.length} total`,
            icon: Settings,
          },
          {
            label: "Published Blogs",
            val: publishedBlogs,
            sub: `${blogs.length} total`,
            icon: BookOpen,
          },
          {
            label: "Draft Blogs",
            val: draftBlogs,
            sub: "Not visible on the public site",
            icon: Clock3,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-200 dark:border-neutral-700/70 bg-white dark:bg-[#151515] p-4 shadow-sm flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-500 dark:text-orange-400">
              <s.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                {s.label}
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-neutral-200">
                {s.val}
                <span className="ml-2 text-xs font-normal text-gray-500 dark:text-neutral-400">
                  {s.sub}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
