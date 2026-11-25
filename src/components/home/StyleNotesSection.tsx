import Image from "next/image";
import Link from "next/link";
import { styleNotes } from "@/data/content";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SnapCarousel } from "@/components/ui/SnapCarousel";

export function StyleNotesSection() {
  return (
    <section aria-labelledby="style-heading" className="relative isolate overflow-hidden pt-16 pb-20 md:pt-20 md:pb-24 max-md:pt-12 max-md:pb-14">
      <SectionBackdrop src="/media/style-notes-bg.webp" position="center 30%" mobilePosition="14% 35%" />

      <header className="mx-auto max-w-4xl px-6 text-center max-md:px-5">
        <p data-reveal className="eyebrow">
          {styleNotes.eyebrow}
        </p>
        <h2 id="style-heading" data-reveal className="display text-shadow-soft mt-4 text-[clamp(2rem,9vw,2.5rem)] sm:text-[3.1rem] max-md:mt-3 lg:text-[3.9rem]">
          {styleNotes.heading}
        </h2>
        <p data-reveal className="italic-note mt-3 text-[1.1rem] lg:text-[1.35rem] max-sm:text-[1.02rem]">
          {styleNotes.subtitle}
        </p>
      </header>

      {/* Desktop: three across. Phones: swipeable 4:5 frames. */}
      <div data-reveal-group className="mx-auto mt-12 max-w-[1440px] md:mt-16 max-md:mt-8">
      <SnapCarousel
        label="Wellford style notes"
        className="no-scrollbar max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:px-[11%] md:grid md:grid-cols-3 md:gap-4 md:px-6 lg:gap-6 lg:px-10"
        dotsClassName="md:hidden max-md:mt-2"
      >
        {styleNotes.looks.map((look) => (
          <li key={look.caption} data-reveal-child className="max-md:w-[78%] max-md:shrink-0 max-md:snap-center max-md:snap-always">
            <Link href={look.href} className="group block outline-none" aria-label={`${look.caption} — shop the look`}>
              <figure>
                <div className="relative aspect-[6/5] overflow-hidden bg-walnut/30 ring-1 ring-gold/0 transition-[box-shadow] duration-700 group-focus-visible:ring-gold/70 sm:aspect-[8/7] max-md:aspect-[4/5]">
                  <Image
                    src={look.src}
                    alt={look.alt}
                    fill
                    quality={85}
                    sizes="(min-width: 1440px) 460px, (min-width: 768px) 32vw, 78vw"
                    className="object-cover object-bottom transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.045]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <figcaption className="mt-5 text-center max-md:mt-4">
                  <span className="label link-underline text-[0.9rem] tracking-[0.3em] text-ivory transition-colors duration-700 group-hover:text-gold">
                    {look.caption}
                  </span>
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </SnapCarousel>
      </div>

      <div data-reveal className="mt-12 text-center md:mt-14 max-md:mt-6">
        <Link href={styleNotes.cta.href} className="label link-underline link-underline--full text-[0.9rem] tracking-[0.3em] text-ivory hover:text-gold">
          {styleNotes.cta.label}
        </Link>
      </div>
    </section>
  );
}
