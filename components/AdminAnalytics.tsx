"use client";

import { useEffect, useState } from "react";
import { Eye, Users, TrendingUp, BarChart3 } from "lucide-react";

interface AnalyticsData {
  totalPageViews: number;
  totalUniqueVisitors: number;
  pageViews30Days: number;
  uniqueVisitors30Days: number;
  trackingStartedAt: string | null;
  daily: Array<{ date: string; pageViews: number; uniqueVisitors: number }>;
  topPages: Array<{ path: string; pageViews: number }>;
}

const numberFormat = new Intl.NumberFormat();

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const maxDailyViews = Math.max(0, ...(data?.daily.map((day) => day.pageViews) || []));

  useEffect(() => {
    let active = true;
    fetch("/api/analytics", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Analytics unavailable.");
        return result.data as AnalyticsData;
      })
      .then((result) => {
        if (active) setData(result);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "Analytics unavailable.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="admin-analytics space-y-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Website analytics
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">
            First-party page views. Unique visitors are estimated by browser identifier, not verified people.
          </p>
        </div>
        <BarChart3 className="h-5 w-5 text-gray-500 dark:text-neutral-400" />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Loading analytics">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-20 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800" />
          ))}
        </div>
      ) : error ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </p>
      ) : data ? (
        <>
          <p className="text-xs text-gray-500 dark:text-neutral-400">
            {data.trackingStartedAt
              ? `Tracking since ${new Date(data.trackingStartedAt).toLocaleDateString()}. Earlier history is unavailable.`
              : "No page views have been recorded yet. Analytics will appear after the database migration is applied and tracking is enabled."}
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "All-time page views", value: data.totalPageViews, icon: Eye },
              { label: "All-time visitors", value: data.totalUniqueVisitors, icon: Users },
              { label: "Page views · 30 days", value: data.pageViews30Days, icon: TrendingUp },
              { label: "Visitors · 30 days", value: data.uniqueVisitors30Days, icon: Users },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-lg border border-gray-200 p-3 dark:border-neutral-700">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-neutral-400">
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
                <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {numberFormat.format(value)}
                </p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200">Top pages · 30 days</h4>
              {data.topPages.length ? (
                <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
                  {data.topPages.map((page) => (
                    <li key={page.path} className="flex items-center justify-between gap-3 py-2 text-sm">
                      <span className="truncate text-gray-600 dark:text-neutral-300">{page.path}</span>
                      <span className="shrink-0 font-medium text-gray-900 dark:text-white">{numberFormat.format(page.pageViews)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-3 text-sm text-gray-500 dark:text-neutral-400">No page views recorded yet.</p>
              )}
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200">Daily page views · 30 days</h4>
              <div className="flex h-28 items-end gap-1" aria-label="Daily page views over the last 30 days">
                {data.daily.map((day) => {
                  return (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.pageViews} page views`}
                      className="min-w-0 flex-1 rounded-t bg-orange-500/80"
                      style={{ height: maxDailyViews ? `${(day.pageViews / maxDailyViews) * 100}%` : "0%" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
