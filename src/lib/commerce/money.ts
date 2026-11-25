import { brand } from "@/config/brand";
import type { CartLine, Money } from "./types";

export const PRICE_PENDING = "Price to be confirmed";

export function formatMoney(money: Money | null): string {
  if (!money) return PRICE_PENDING;
  return new Intl.NumberFormat(brand.locale, {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

/** Line subtotal, or null if the price is not confirmed. */
export function lineTotal(line: CartLine): Money | null {
  if (!line.price) return null;
  return {
    amount: (Number(line.price.amount) * line.quantity).toFixed(2),
    currencyCode: line.price.currencyCode,
  };
}

/** Cart total, or null if any line has an unconfirmed price. */
export function cartTotal(lines: CartLine[]): Money | null {
  if (lines.length === 0) return { amount: "0.00", currencyCode: brand.currencyCode };
  let sum = 0;
  for (const line of lines) {
    if (!line.price) return null;
    sum += Number(line.price.amount) * line.quantity;
  }
  return { amount: sum.toFixed(2), currencyCode: lines[0].price!.currencyCode };
}
