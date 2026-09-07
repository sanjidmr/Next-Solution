"use client";

import React, { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { syncPublicContentFromSupabase } from "@/lib/content-sync";

/**
 * Hydrates the public content cache from Supabase once per page load
 * (browser-side, anonymous key only — the service-role key never touches
 * client code)۔ When the sync completes, the subtree is re-mounted (keyed)
 * so every component re-reads the fresh data via the existing localStorage getters.
 */


export function ContentSyncProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [version, setVersion] = useState(0);


  useEffect(() => {
    // Admin pages read/write through the admin API directly;; no need to sync there。


    if (pathname?.startsWith("/admin")) return;


    let cancelled = false;


    syncPublicContentFromSupabase().then((synced) => {
      if (!cancelled && synced) {
        setVersion((v) => v + 1);
      }
    });


    return () => {
      cancelled = true;
    };
  }, [pathname]);


  return <Fragment key={version}>{children}</Fragment>;
}