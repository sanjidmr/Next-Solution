"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (
      !pathname ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api") ||
      lastTrackedPath.current === pathname
    ) {
      return;
    }

    lastTrackedPath.current = pathname;
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch((error: unknown) => {
      console.error("Could not record page view.", error);
    });
  }, [pathname]);

  return null;
}
