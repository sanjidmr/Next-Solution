"use client";

import React, { Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import { syncPublicContentFromSupabase } from "@/lib/content-sync";
import { CONTENT_SYNC_EVENT } from "@/hooks/useContentSync";

/**
 * Hydrates the public content cache from Supabase once per page load
 * (browser-side, anonymous key only — the service-role key never touches
 * client code). When the sync completes, a lightweight `CONTENT_SYNC_EVENT`
 * is dispatched instead of re-mounting the whole subtree. Components that
 * read the localStorage-backed getters subscribe via `useContentSync()` and
 * simply re-render (NOT re-mount), so page-enter animations play exactly once.
 */


export function ContentSyncProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Admin pages read/write through the admin API directly;; no need to sync there。


    if (pathname?.startsWith("/admin")) return;


    let cancelled = false;


    syncPublicContentFromSupabase().then((synced) => {
      if (!cancelled && synced && typeof window !== "undefined") {
        // Never re-key the subtree: re-keying would reset every component and
        // replay every mount animation (the "double animation" bug). Instead we
        // dispatch an event that subscribed components use to re-render and
        // re-read the fresh localStorage cache.
        window.dispatchEvent(new Event(CONTENT_SYNC_EVENT));
      }
    });


    return () => {
      cancelled = true;
    };
  }, [pathname]);


  return <Fragment>{children}</Fragment>;
}