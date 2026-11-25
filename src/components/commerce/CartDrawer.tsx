"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";
import { useDialog } from "@/lib/use-dialog";
import clsx from "@/lib/clsx";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const { isOpen, closeCart, lines, itemCount } = useCart();
  const pathname = usePathname();
  const panelRef = useDialog<HTMLDivElement>(isOpen, closeCart);

  useEffect(() => {
    closeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div aria-hidden={!isOpen} inert={!isOpen} className={clsx("fixed inset-0 z-[60] transition-[visibility] duration-0", isOpen ? "visible delay-0" : "invisible delay-500")}>
      <div
        onClick={closeCart}
        className={clsx("absolute inset-0 bg-black/65 transition-opacity duration-500 ease-out will-change-[opacity]", isOpen ? "opacity-100" : "opacity-0")}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={clsx(
          "absolute inset-y-0 right-0 flex h-[100dvh] w-full max-w-[460px] flex-col border-l border-gold/20 bg-[#0c0a09] shadow-[-20px_0_50px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform transform-gpu [contain:layout_paint]",
          "bg-[radial-gradient(120%_60%_at_100%_0%,rgba(59,36,24,0.45),transparent_60%)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-gold/15 px-7 py-6 max-md:px-5 max-md:py-4">
          <div>
            <h2 id="cart-title" className="eyebrow">
              Your Bag
            </h2>
            <p className="mt-1 text-sm italic text-ivory/60">
              {itemCount ? `${itemCount} item${itemCount === 1 ? "" : "s"}` : "Nothing selected yet"}
            </p>
          </div>
          <button type="button" onClick={closeCart} className="p-1 text-ivory/80 hover:text-gold max-md:-mr-2.5 max-md:grid max-md:h-11 max-md:w-11 max-md:place-items-center" aria-label="Close bag">
            <X size={24} strokeWidth={1.1} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-7 max-md:px-5">
          {lines.length ? (
            <ul>
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} onNavigate={closeCart} />
              ))}
            </ul>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <p className="text-3xl font-medium">Your bag is empty.</p>
              <span className="gold-rule mt-5" aria-hidden />
              <p className="italic-note mt-5">A considered pair is waiting.</p>
              <Link href="/shop" onClick={closeCart} className="btn-outline mt-8">
                Shop the Collection
              </Link>
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-gold/15 px-7 py-6 max-md:px-5 max-md:pt-5 max-md:pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <CartSummary />
            <Link href="/cart" onClick={closeCart} className="label link-underline mx-auto mt-5 table text-[0.7rem] text-ivory/75 hover:text-ivory">
              View full bag
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
