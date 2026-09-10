"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import PageTransitionOverlay, {
  PageTransitionMeta,
} from "@/components/motion/PageTransitionOverlay";

const ENTER_MS = 500;
const HOLD_MS = 2000;
const EXIT_MS = 350;

const TRANSITION_PAGES: Record<string, PageTransitionMeta> = {
  "/": { path: "/", title: "Home", subtitle: "Digital agency studio", page: "01" },
  "/about": { path: "/about", title: "About", subtitle: "The studio & the team", page: "02" },
  "/services": { path: "/services", title: "Services", subtitle: "Capabilities & solutions", page: "03" },
  "/portfolio": { path: "/portfolio", title: "Portfolio", subtitle: "Selected work & case studies", page: "04" },
  "/contact": { path: "/contact", title: "Contact", subtitle: "Start a project", page: "05" },
  "/legal/privacy-policy": { path: "/legal/privacy-policy", title: "Privacy", subtitle: "Legal & compliance", page: "06" },
  "/legal/terms": { path: "/legal/terms", title: "Terms", subtitle: "Legal & compliance", page: "07" },
  "/legal/cookies": { path: "/legal/cookies", title: "Cookies", subtitle: "Legal & compliance", page: "08" },
};

export function getTransitionMeta(path: string): PageTransitionMeta | null {
  return TRANSITION_PAGES[path] ?? null;
}

type Phase = "idle" | "in" | "hold" | "out";

interface PageTransitionContextValue {
  navigate: (path: string) => void;
}

const PageTransitionContext = React.createContext<PageTransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [meta, setMeta] = useState<PageTransitionMeta | null>(null);
  const [visit, setVisit] = useState(0);
  const busyRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const navigate = useCallback(
    (path: string) => {
      const target = getTransitionMeta(path);
      if (!target) {
        router.push(path);
        return;
      }
      if (busyRef.current) return;
      if (path === pathname || path === window.location.pathname) return;

      busyRef.current = true;
      setMeta(target);
      setVisit((v) => v + 1);
      setPhase("in");

      timersRef.current.push(
        setTimeout(() => setPhase("hold"), ENTER_MS),
      );
      timersRef.current.push(
        setTimeout(() => {
          setPhase("out");
          router.push(path);
        }, ENTER_MS + HOLD_MS),
      );
      timersRef.current.push(
        setTimeout(() => {
          setPhase("idle");
          setMeta(null);
          busyRef.current = false;
        }, ENTER_MS + HOLD_MS + EXIT_MS),
      );
    },
    [pathname, router],
  );

  // Global capture-phase interceptor: any same-origin <a> pointing at one of
  // the editorial routes gets its default navigation suppressed and the
  // transition started BEFORE the route switch. Component onClick handlers
  // (drawer close, quick-links) still run; navigate() is guarded re-entrantly.
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("#")) return;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) return;
      if (anchor.hasAttribute("download") || anchor.getAttribute("target") === "_blank") return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (!getTransitionMeta(url.pathname)) return;
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      navigate(url.pathname);
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [navigate]);

  const value = React.useMemo(() => ({ navigate }), [navigate]);

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      {phase !== "idle" && meta && (
        <PageTransitionOverlay key={visit} meta={meta} phase={phase} />
      )}
    </PageTransitionContext.Provider>
  );
}