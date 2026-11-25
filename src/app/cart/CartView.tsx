"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { CartLineItem } from "@/components/commerce/CartLineItem";
import { CartSummary } from "@/components/commerce/CartSummary";

export function CartView() {
  const { lines } = useCart();

  if (!lines.length) {
    return (
      <div className="py-16 text-center max-md:py-8">
        <p className="text-[2.2rem] font-medium">Your bag is empty.</p>
        <p className="italic-note mt-4 text-lg">A considered pair is waiting.</p>
        <Link href="/shop" className="btn-outline mt-10">
          Shop the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-14 max-md:gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
      <ul className="border-t border-gold/15">
        {lines.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
      </ul>
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="border border-gold/25 bg-black/30 p-8 max-md:p-6">
          <h2 className="eyebrow text-[0.85rem]">Summary</h2>
          <div className="mt-6">
            <CartSummary />
          </div>
        </div>
        <Link href="/shop" className="label link-underline mx-auto mt-6 table text-[0.7rem] text-ivory/70 hover:text-ivory">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
