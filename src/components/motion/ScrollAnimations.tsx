"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page-wide GSAP controller, driven by data attributes so sections can stay
 * server components:
 *
 *  data-hero-item            hero entrance, in DOM order
 *  data-reveal               fade + rise when scrolled into view
 *  data-reveal-group         container whose [data-reveal-child] items stagger in
 *  data-parallax             gentle vertical drift of a background layer
 *
 * Everything is skipped under prefers-reduced-motion.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px)",
        /* Parallax only where it is cheap and expected: wide screens with a mouse. */
        parallax: "(min-width: 768px) and (pointer: fine)",
      },
      (ctx) => {
        const { motion, desktop, parallax } = ctx.conditions as { motion: boolean; reduce: boolean; desktop: boolean; parallax: boolean };
        // Phones: shorter, quicker reveals.
        const rise = desktop ? 30 : 16;
        const dur = desktop ? 1.3 : 0.95;
        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");

        if (!motion) {
          gsap.set(heroItems, { opacity: 1, clearProps: "transform" });
          return;
        }

        // Hero entrance: slow, layered, no bounce.
        if (heroItems.length) {
          gsap.fromTo(
            heroItems,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out",
              stagger: 0.22,
              delay: 0.25,
              onStart: () => {
                (window as Window & { __wfHeroStarted?: boolean }).__wfHeroStarted = true;
              },
            },
          );
          heroItems
            .filter((el) => el.dataset.heroItem === "rule")
            .forEach((el) =>
              gsap.fromTo(
                el,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 1.6, ease: "power2.inOut", delay: 0.7 },
              ),
            );
        }

        // Single reveals.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: rise,
            duration: dur,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // Staggered groups.
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const children = group.querySelectorAll<HTMLElement>("[data-reveal-child]");
          if (!children.length) return;
          gsap.from(children, {
            opacity: 0,
            y: desktop ? 40 : 18,
            duration: desktop ? 1.4 : 1,
            ease: "power3.out",
            stagger: desktop ? 0.2 : 0.12,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        // Gold rules draw in from the centre.
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        // Gentle background parallax (desktop only; never more than a few %).
        if (parallax) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
            const section = layer.closest("section, [data-parallax-scope]") ?? layer.parentElement;
            gsap.fromTo(
              layer,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: "none",
                scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
              },
            );
          });
        }
      },
    );

    // Recalculate once images/fonts have settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    root.classList.add("js-motion-ready");
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
