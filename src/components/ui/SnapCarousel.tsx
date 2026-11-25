"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "@/lib/clsx";

type Props = {
  /** `<li>` slides. */
  children: ReactNode;
  label: string;
  /** Classes for the `<ul>` track (layout per breakpoint is up to the caller). */
  className?: string;
  /** Classes for the dots row (e.g. `md:hidden` when the track is a grid on desktop). */
  dotsClassName?: string;
  /** Extra data attributes for the track (e.g. reveal hooks). */
  trackProps?: Record<string, string>;
  /** Slide shown in the centre on load (when the track scrolls). */
  initialIndex?: number;
  /**
   * Writes `--p` on every slide: 0 when centred, rising to 1 one slide away
   * (`--s` is the same value signed: negative on the left, positive on the right).
   * Slides use it to scale/dim themselves as they are swiped (coverflow).
   */
  focusEffect?: boolean;
};

/**
 * Native scroll-snap carousel for touch screens: momentum swiping comes from
 * the browser (smooth on iOS Safari), plus discreet gold pagination.
 */
export function SnapCarousel({ children, label, className, dotsClassName, trackProps, initialIndex = 0, focusEffect = false }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(initialIndex);
  const count = Children.count(children);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const scrolls = el.scrollWidth > el.clientWidth + 1;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
      if (focusEffect) {
        // Linked directly to the finger's position, so it is always smooth.
        const signed = scrolls ? Math.max(-1, Math.min(1, (c.offsetLeft + c.offsetWidth / 2 - center) / c.offsetWidth)) : 0;
        c.style.setProperty("--p", Math.abs(signed).toFixed(3)); // distance from centre
        c.style.setProperty("--s", signed.toFixed(3)); // same, with side (-1 left, +1 right)
      }
    });
    setActive(best);
  }, [focusEffect]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    // Start with the chosen slide centred (instantly, no visible jump).
    const start = el.children[initialIndex] as HTMLElement | undefined;
    if (start && initialIndex > 0 && el.scrollWidth > el.clientWidth + 1) {
      el.scrollLeft = start.offsetLeft - (el.clientWidth - start.offsetWidth) / 2;
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const goTo = (i: number) => {
    const el = track.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <ul
        ref={track}
        aria-label={label}
        {...trackProps}
        className={clsx("relative overscroll-x-contain [-webkit-overflow-scrolling:touch]", className)}
      >
        {children}
      </ul>
      {count > 1 && (
        <div className={clsx("mt-5 flex items-center justify-center", dotsClassName)} role="group" aria-label={`${label} — slides`}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1} of ${count}`}
              aria-current={i === active ? "true" : undefined}
              className="group grid h-11 w-9 place-items-center"
            >
              <span
                aria-hidden
                className={clsx(
                  "block h-px transition-all duration-500 ease-lux",
                  i === active ? "w-7 bg-gold" : "w-3.5 bg-ivory/35 group-hover:bg-ivory/60",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
