"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/commerce/money";
import { useCart } from "@/lib/cart/cart-context";
import clsx from "@/lib/clsx";
import { QuantityStepper } from "./QuantityStepper";

export function ProductPurchase({ product }: { product: Product }) {
  const id = useId();
  const { addItem, maxQuantity } = useCart();
  const sizes = product.options.find((o) => o.name === "Size")?.values ?? [];
  // Size system comes from the data ("UK 9", "EU 42"…), so any store format works.
  const sizeSystem = sizes[0]?.match(/^(UK|EU|US)\b/)?.[1] ?? null;
  const sizeLabel = (s: string) => s.replace(/^(UK|EU|US)\s*/, "");
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showBar, setShowBar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const addRef = useRef<HTMLButtonElement>(null);
  const sizesRef = useRef<HTMLFieldSetElement>(null);

  // Phones: show a sticky add-to-bag bar once the main button scrolls away.
  useEffect(() => {
    const btn = addRef.current;
    if (!btn || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(btn);
    setMounted(true);
    document.body.classList.add("has-sticky-bar");
    return () => {
      io.disconnect();
      document.body.classList.remove("has-sticky-bar");
    };
  }, []);

  const onAdd = (fromBar = false) => {
    if (!size) {
      setError("Please select a size.");
      if (fromBar) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        sizesRef.current?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      }
      document.getElementById(`${id}-size-${0}`)?.focus({ preventScroll: fromBar });
      return;
    }
    setError(null);
    addItem(product, size, quantity);
  };

  return (
    <div>
      <p className="text-[1.5rem] italic text-ivory/85">{formatMoney(product.price)}</p>
      {product.color && (
        <p className="mt-3 text-[1.05rem] text-ivory/80">
          <span className="label mr-3 text-[0.68rem] text-ivory/55">Colour</span>
          {product.color}
        </p>
      )}

      <fieldset ref={sizesRef} className="mt-10 max-md:mt-8" aria-describedby={error ? `${id}-err` : undefined}>
        <div className="flex items-baseline justify-between">
          <legend className="label text-[0.75rem] text-ivory/80">
            Size {size && <span className="ml-2 normal-case tracking-normal text-gold">— {size}</span>}
          </legend>
          <Link href="/size-guide" className="label link-underline link-underline--rest text-[0.66rem] text-ivory/65 hover:text-ivory">
            Size guide
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {sizes.map((s, i) => {
            const checked = size === s;
            return (
              <label
                key={s}
                className={clsx(
                  "relative grid h-12 cursor-pointer place-items-center border text-[0.98rem] transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                  checked ? "border-gold bg-gold/12 text-ivory" : "border-ivory/20 text-ivory/80 hover:border-ivory/50",
                )}
              >
                <input
                  id={`${id}-size-${i}`}
                  type="radio"
                  name={`${id}-size`}
                  value={s}
                  checked={checked}
                  onChange={() => {
                    setSize(s);
                    setError(null);
                  }}
                  className="sr-only"
                />
                {sizeLabel(s)}
              </label>
            );
          })}
        </div>
        <p className="mt-3 text-sm italic text-ivory/55">
          {sizeSystem ? `${sizeSystem} sizing.` : ""}
          {product.sizesProvisional && " The size run is provisional and will be confirmed before release."}
        </p>
        {error && (
          <p id={`${id}-err`} role="alert" className="mt-2 text-[1rem] italic text-red-200/90">
            {error}
          </p>
        )}
      </fieldset>

      <div className="mt-10">
        <span className="label block text-[0.75rem] text-ivory/80" id={`${id}-qty`}>
          Quantity
        </span>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row max-sm:items-start">
          <QuantityStepper value={quantity} onChange={setQuantity} max={maxQuantity} label="Quantity" />
          <button ref={addRef} type="button" onClick={() => onAdd()} className="btn-gold h-12 flex-1 max-sm:w-full max-sm:flex-none">
            Add to Bag
          </button>
        </div>
      </div>

      {/* Sticky add-to-bag bar (phones only). Portalled to <body> so no
          section stacking context (isolate) can sit above it. */}
      {mounted && createPortal(
      <div
        aria-hidden={!showBar}
        inert={!showBar}
        className={clsx(
          "fixed inset-x-0 bottom-0 z-30 border-t border-gold/25 bg-ink-deep/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[1.05rem] font-medium leading-tight">{product.title}</p>
            <p className="mt-0.5 truncate text-[0.92rem] italic text-ivory/65">
              {formatMoney(product.price)}
              {size ? ` · ${size}` : " · Select a size"}
            </p>
          </div>
          <button type="button" onClick={() => onAdd(true)} className="btn-gold shrink-0 px-6">
            Add to Bag
          </button>
        </div>
      </div>,
        document.body,
      )}
    </div>
  );
}
