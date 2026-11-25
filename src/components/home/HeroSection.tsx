import { preload } from "react-dom";
import { brand } from "@/config/brand";
import { HeroVideo } from "./HeroVideo";

export function HeroSection() {
  preload("/media/hero-poster.webp", { as: "image", fetchPriority: "high" });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex h-[100svh] min-h-[600px] max-h-[1100px] items-end overflow-hidden md:items-center"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink-deep">
        <HeroVideo />
        {/* Left-hand gradient for legibility (desktop) */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(8,8,8,0.88)_0%,rgba(8,8,8,0.62)_28%,rgba(8,8,8,0.18)_55%,rgba(8,8,8,0)_72%)] md:block" />
        {/* Bottom-up gradient for legibility (mobile) */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,0.95)_0%,rgba(8,8,8,0.7)_35%,rgba(8,8,8,0)_65%)] md:hidden" />
        {/* Top vignette under the header */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
        {/* Bottom fade into the collection */}
        <div className="fade-bottom absolute inset-x-0 bottom-0 h-[18%]" />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 sm:px-8 md:pb-0 lg:px-14">
        <div className="max-w-[40rem] md:-mt-[8vh]">
          <h1 id="hero-heading" className="display text-shadow-soft text-[2.9rem] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.1rem]">
            <span data-hero-item className="block">
              {brand.tagline[0]}
            </span>
            <span data-hero-item className="block">
              {brand.tagline[1]}
            </span>
          </h1>
          <span data-hero-item="rule" aria-hidden className="gold-rule gold-rule--left mt-7 w-24 lg:mt-8" />
          <p data-hero-item className="italic-note text-shadow-soft mt-6 text-[1.25rem] leading-[1.45] lg:text-[1.5rem]">
            {brand.promise[0]}
            <br />
            {brand.promise[1]}
          </p>
          <div data-hero-item className="mt-9 lg:mt-10">
            <a href="#collection" className="btn-outline">
              Explore the Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
