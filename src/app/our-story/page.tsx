import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";
import { standard, styleNotes } from "@/data/content";
import { PageHero } from "@/components/layout/PageHero";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { GoldRule, OrnamentDivider } from "@/components/ui/Ornament";

export const metadata: Metadata = {
  title: "Our Story",
  description: "A quieter kind of luxury. Considered design, timeless style, and a confident finish to every occasion.",
  alternates: { canonical: "/our-story" },
};

/*
 * Only brand language supplied in the brief is used here. No founding dates,
 * craftsmanship claims or origin stories are invented.
 */
export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="The Wellford Story"
        title="A quieter kind of luxury"
        subtitle="Considered design. Timeless style. A confident finish to every occasion."
        image="/media/story-bg.webp"
        position="center 60%"
        size="lg"
      />

      <section className="px-6 py-24 text-center md:py-32 max-md:px-5 max-md:py-14">
        <div className="mx-auto max-w-3xl">
          <p data-reveal className="display text-[clamp(1.9rem,8.4vw,2.2rem)] leading-tight sm:text-[2.8rem] lg:text-[3.3rem]">
            {brand.tagline[0]} {brand.tagline[1]}
          </p>
          <OrnamentDivider className="mt-8" />
          <p data-reveal className="italic-note mt-8 text-[1.25rem] leading-relaxed lg:text-[1.45rem] max-md:mt-6 max-sm:text-[1.08rem]">
            {brand.name} makes timeless footwear for the modern gentleman — classic forms that complement a considered
            wardrobe, carried with quiet confidence from morning plans to evening hours.
          </p>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="relative isolate overflow-hidden py-24 md:py-32 max-md:py-14">
        <SectionBackdrop src="/media/standard-bg.webp" position="center 40%" mobilePosition="90% 45%" overlayClassName="max-md:bg-black/45" />
        <div className="mx-auto max-w-[1180px] px-6 text-center max-md:px-5">
          <p data-reveal className="eyebrow">
            {standard.eyebrow}
          </p>
          <h2 id="principles-heading" data-reveal className="display mt-4 text-[clamp(2rem,9vw,2.5rem)] sm:text-[2.5rem] lg:text-[3.6rem]">
            {standard.heading}
          </h2>
          <ol data-reveal-group className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8 max-md:mt-10 max-md:gap-10">
            {standard.pillars.map((p) => (
              <li key={p.number} data-reveal-child>
                <span aria-hidden className="block text-[2rem] italic text-gold">
                  {p.number}
                </span>
                <h3 className="label mt-3 text-[1rem] tracking-[0.24em]">{p.title}</h3>
                <p className="italic-note mt-4 text-[1.08rem] leading-[1.5]">
                  {p.text[0]} {p.text[1]}
                </p>
                <span aria-hidden className="gold-rule mx-auto mt-6 w-12" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="looks-heading" className="px-6 py-24 md:py-32 max-md:px-0 max-md:py-14">
        <div className="mx-auto max-w-[1320px]">
          <header className="text-center max-md:px-5">
            <p data-reveal className="eyebrow">
              {styleNotes.eyebrow}
            </p>
            <h2 id="looks-heading" data-reveal className="display mt-4 text-[clamp(2rem,9vw,2.5rem)] sm:text-[2.5rem] lg:text-[3.6rem]">
              {styleNotes.heading}
            </h2>
            <p data-reveal className="italic-note mt-3 text-[1.15rem] lg:text-[1.3rem]">
              {styleNotes.subtitle}
            </p>
          </header>
          <ul data-reveal-group className="no-scrollbar mt-14 grid gap-12 sm:grid-cols-3 sm:gap-5 max-md:mt-8 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:px-[11%]">
            {styleNotes.looks.map((look) => (
              <li key={look.caption} data-reveal-child className="max-md:w-[78%] max-md:shrink-0 max-md:snap-center">
                <Link href={look.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={look.src}
                      alt={look.alt}
                      fill
                      sizes="(min-width: 768px) 32vw, 78vw"
                      className="object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.045]"
                    />
                  </div>
                  <p className="mt-5 text-center">
                    <span className="label link-underline text-[0.88rem] transition-colors duration-700 group-hover:text-gold">{look.caption}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-16 text-center max-md:mt-10">
            <Link href="/shop" className="btn-outline">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-10 text-center">
        <GoldRule className="w-24" />
      </section>
    </>
  );
}
