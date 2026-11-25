"use client";

import { formatMoney } from "@/lib/commerce/money";
import { useCart } from "@/lib/cart/cart-context";

/**
 * Totals + checkout. Checkout is intentionally disabled until a real
 * checkout (e.g. Shopify) is connected — no payment or order is simulated.
 */
export function CartSummary() {
  const { total, lines } = useCart();
  const pricesPending = total === null;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label text-ivory/80">Total</span>
        <span className="text-xl">{formatMoney(total)}</span>
      </div>
      {pricesPending && (
        <p className="mt-2 text-sm italic text-ivory/55">Prices will be shown once they are confirmed.</p>
      )}
      <button type="button" disabled className="btn-gold mt-6 w-full" aria-describedby="checkout-note">
        Checkout
      </button>
      <p id="checkout-note" className="mt-3 text-center text-sm italic text-ivory/55">
        {lines.length ? "Online checkout is not yet open. Your selection is saved on this device." : "Your bag is empty."}
      </p>
    </div>
  );
}
