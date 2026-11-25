"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/commerce/types";
import { formatMoney, lineTotal } from "@/lib/commerce/money";
import { useCart } from "@/lib/cart/cart-context";
import { QuantityStepper } from "./QuantityStepper";

export function CartLineItem({ line, onNavigate }: { line: CartLine; onNavigate?: () => void }) {
  const { setQuantity, removeItem, maxQuantity } = useCart();
  return (
    <li className="flex gap-5 border-b border-gold/15 py-6 max-md:gap-4 max-md:py-5">
      <Link
        href={`/products/${line.handle}`}
        onClick={onNavigate}
        className="relative block aspect-[1196/750] w-28 shrink-0 max-[359px]:w-24 bg-[radial-gradient(ellipse_at_center,rgba(59,36,24,0.55),transparent_70%)] sm:w-32"
      >
        <Image src={line.image.src} alt={line.image.alt} fill sizes="128px" loading="eager" className="object-contain" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3 max-sm:flex-col max-sm:gap-1">
          <div>
            <Link href={`/products/${line.handle}`} onClick={onNavigate} className="text-lg font-medium leading-tight hover:text-gold">
              {line.title}
            </Link>
            <p className="label mt-1 text-[0.68rem] text-ivory/60">Size {line.size.replace(/^UK\s*/, "UK ")}</p>
          </div>
          <p className="shrink-0 text-right text-sm italic text-ivory/75 max-sm:text-left max-sm:text-[0.98rem]">{formatMoney(lineTotal(line))}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 max-md:pt-3">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            max={maxQuantity}
            onChange={(q) => setQuantity(line.id, q)}
            label={`Quantity for ${line.title}, size ${line.size}`}
          />
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            className="label link-underline text-[0.66rem] text-ivory/60 hover:text-ivory max-md:py-3"
            aria-label={`Remove ${line.title}, size ${line.size}`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
