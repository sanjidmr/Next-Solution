"use client";

import { useEffect, useState } from "react";

/**
 * Name of the window event dispatched after the public content cache has been
 * re-hydrated from Supabase (see providers/ContentSyncProvider.tsx).
 */
export const CONTENT_SYNC_EVENT = "nextsolution:content-synced";

/**
 * Subscribes the calling component to content-sync completion events.
 *
 * Returns a monotonically increasing version number. Whenever the event fires,
 * this hook's local state bumps, which re-renders the calling component — but
 * does NOT re-mount it. Components that read the localStorage-backed getters
 * from @/lib/db at render time therefore pick up the freshly synced data
 * without replaying their entrance animations.
 *
 * Subscribe by calling `useContentSync()` at the top of your component.
 */
export function useContentSync(): number {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const onSync = () => setVersion((v) => v + 1);
    window.addEventListener(CONTENT_SYNC_EVENT, onSync);
    return () => window.removeEventListener(CONTENT_SYNC_EVENT, onSync);
  }, []);

  return version;
}