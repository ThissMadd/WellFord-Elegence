"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { COLLECTION_LINKS } from "@/components/layout/CollectionNav";
import { useDialog } from "@/lib/use-dialog";
import clsx from "@/lib/clsx";
import { ProductGrid } from "./ProductGrid";

const SORTS = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name: A–Z",
} as const;
type SortKey = keyof typeof SORTS;

const price = (p: Product) => (p.price ? Number(p.price.amount) : Number.POSITIVE_INFINITY);

function sortProducts(products: Product[], sort: SortKey) {
  const list = [...products];
  if (sort === "price-asc") list.sort((a, b) => price(a) - price(b));
  if (sort === "price-desc") list.sort((a, b) => (b.price ? Number(b.price.amount) : -1) - (a.price ? Number(a.price.amount) : -1));
  if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
  return list;
}

/**
 * Product listing. On phones, category + sort live in a bottom sheet behind a
 * "Filter & Sort" control; the desktop listing is unchanged.
 */
export function ShopListing({ products, path }: { products: Product[]; path: string }) {
  const id = useId();
  const [sort, setSort] = useState<SortKey>("featured");
  const [open, setOpen] = useState(false);
  const sheetRef = useDialog<HTMLDivElement>(open, () => setOpen(false));
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);
  const count = `${products.length} ${products.length === 1 ? "piece" : "pieces"}`;

  return (
    <>
      <div className="mb-8 flex items-center justify-between border-y border-gold/20 md:mb-14 md:py-1">
        <p className="text-[0.98rem] italic text-ivory/65 md:text-[1.05rem]">{count}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="label group -mr-2 flex min-h-12 items-center gap-2.5 px-2 text-[0.68rem] text-ivory transition-colors duration-500 hover:text-gold md:text-[0.72rem]"
        >
          <SlidersHorizontal size={15} strokeWidth={1.2} className="text-gold" aria-hidden />
          <span className="link-underline">Filter &amp; Sort</span>
          {sort !== "featured" && (
            <>
              <span className="sr-only">, sorted by {SORTS[sort]}</span>
              <span aria-hidden className="ml-1 hidden text-[0.95rem] normal-case italic tracking-normal text-ivory/55 md:inline">
                · {SORTS[sort]}
              </span>
            </>
          )}
        </button>
      </div>

      <ProductGrid products={sorted} />

      {/* Panel: bottom sheet on phones, drawer from the right on tablet/desktop */}
      <div aria-hidden={!open} inert={!open} className={clsx("fixed inset-0 z-[60] transition-[visibility] duration-0", open ? "visible delay-0" : "invisible delay-500")}>
        <div onClick={() => setOpen(false)} className={clsx("absolute inset-0 bg-black/65 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} />
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          className={clsx(
            "absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col border-t border-gold/30 bg-[#0c0a09] bg-[radial-gradient(120%_70%_at_50%_0%,rgba(59,36,24,0.45),transparent_60%)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
            "md:inset-y-0 md:left-auto md:right-0 md:h-[100dvh] md:max-h-none md:w-full md:max-w-[420px] md:border-l md:border-t-0 md:shadow-[-20px_0_50px_rgba(0,0,0,0.55)] md:bg-[radial-gradient(120%_60%_at_100%_0%,rgba(59,36,24,0.45),transparent_60%)]",
            open ? "translate-x-0 translate-y-0" : "max-md:translate-y-full md:translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-5 pt-3 pb-2 md:border-b md:border-gold/15 md:px-7 md:py-6">
            <h2 id={`${id}-title`} className="eyebrow">
              Filter &amp; Sort
            </h2>
            <button type="button" onClick={() => setOpen(false)} className="-mr-2.5 grid h-11 w-11 place-items-center text-ivory/80" aria-label="Close">
              <X size={22} strokeWidth={1.1} />
            </button>
          </div>

          <div className="overflow-y-auto px-5 pb-4 md:flex-1 md:px-7 md:pt-4">
            <fieldset>
              <legend className="label mt-3 text-[0.66rem] text-ivory/55">Category</legend>
              <ul className="mt-2 border-t border-gold/15">
                {COLLECTION_LINKS.map((l) => {
                  const current = l.href === path;
                  return (
                    <li key={l.href} className="border-b border-gold/15">
                      <Link
                        href={l.href}
                        aria-current={current ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={clsx("flex min-h-12 items-center justify-between text-[1.15rem]", current ? "text-gold" : "text-ivory/90")}
                      >
                        {l.label}
                        {current && <Check size={16} strokeWidth={1.3} aria-hidden />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="label text-[0.66rem] text-ivory/55">Sort by</legend>
              <div className="mt-2 border-t border-gold/15">
                {(Object.keys(SORTS) as SortKey[]).map((key) => (
                  <label key={key} className="flex min-h-12 cursor-pointer items-center justify-between border-b border-gold/15 text-[1.15rem] has-[:focus-visible]:text-gold">
                    <span className={sort === key ? "text-gold" : "text-ivory/90"}>{SORTS[key]}</span>
                    <input type="radio" name={`${id}-sort`} value={key} checked={sort === key} onChange={() => setSort(key)} className="sr-only" />
                    <span
                      aria-hidden
                      className={clsx("grid h-4 w-4 place-items-center rounded-full border", sort === key ? "border-gold" : "border-ivory/35")}
                    >
                      {sort === key && <span className="h-2 w-2 rounded-full bg-gold" />}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="border-t border-gold/15 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-7 md:py-6">
            <button type="button" onClick={() => setOpen(false)} className="btn-gold w-full">
              Show {count}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
