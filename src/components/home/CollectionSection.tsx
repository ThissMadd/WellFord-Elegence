import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { GoldRule } from "@/components/ui/Ornament";
import { SnapCarousel } from "@/components/ui/SnapCarousel";

export function CollectionSection({ products }: { products: Product[] }) {
  return (
    <section id="collection" aria-labelledby="collection-heading" className="relative isolate overflow-hidden pt-20 pb-20 md:pt-24 md:pb-24 max-md:pt-12 max-md:pb-14">
      <SectionBackdrop
        src="/media/collection-bg.webp"
        position="center 40%"
        mobilePosition="66% 55%"
        overlayClassName="bg-[radial-gradient(ellipse_at_50%_30%,rgba(8,8,8,0.55),rgba(8,8,8,0.15)_60%)]"
      />

      <header className="mx-auto max-w-6xl px-6 text-center max-md:px-5">
        <h2
          id="collection-heading"
          data-reveal
          className="display text-shadow-soft text-[clamp(1.32rem,6.4vw,1.75rem)] uppercase tracking-[0.24em] max-sm:tracking-[0.17em] sm:text-[2.3rem] lg:text-[2.75rem] lg:tracking-[0.26em]"
        >
          The Wellford Collection
        </h2>
        <p data-reveal className="italic-note text-shadow-soft mt-3 text-[1.1rem] lg:text-[1.35rem] max-sm:text-[1.02rem]">
          Timeless footwear, considered in every detail.
        </p>
        <GoldRule className="mt-5 w-36 lg:w-44" />
      </header>

      {/* Desktop/tablet: row. Mobile: swipeable carousel. */}
      {/* Desktop/tablet: row of three. Phones: one product at a time with a glimpse of the next. */}
      <div data-reveal-group className="mx-auto mt-12 max-w-[1380px] md:mt-20 md:px-8 lg:px-14 max-md:mt-8">
        <SnapCarousel
          label="The Wellford Collection"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto pt-2 pb-2 max-md:gap-5 before:w-[19%] before:shrink-0 before:content-[''] after:w-[19%] after:shrink-0 after:content-[''] md:before:hidden md:after:hidden md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pt-0 md:pb-4 lg:gap-14"
          dotsClassName="md:hidden max-md:mt-3"
          focusEffect
        >
          {products.map((p) => (
            <li key={p.id} data-reveal-child className="w-[62%] shrink-0 snap-center snap-always md:w-auto">
              {/* Phones: the centred product is full size; neighbours shrink and dim as they leave the centre. */}
              <div className="max-md:origin-center max-md:will-change-[scale,opacity,translate] max-md:[scale:calc(1-var(--p,0)*0.22)] max-md:[translate:calc(var(--s,0)*-4%)_0] max-md:[opacity:calc(1-var(--p,0)*0.5)]">
                <ProductCard product={p} sizes="(min-width: 1280px) 400px, (min-width: 768px) 31vw, 62vw" />
              </div>
            </li>
          ))}
        </SnapCarousel>
      </div>

      <div data-reveal className="mt-12 text-center md:mt-16 max-md:mt-7">
        <Link href="/shop" className="btn-outline px-10">
          Shop the Collection
        </Link>
      </div>
    </section>
  );
}
