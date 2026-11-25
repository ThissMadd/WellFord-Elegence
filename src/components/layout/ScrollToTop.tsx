"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Every new page opens at the very top, instantly.
 *
 * Exceptions:
 *  - Back/forward navigation keeps the browser's restored scroll position.
 *  - Links with a #hash (e.g. /contact#social) scroll to their anchor.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const fromHistory = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
