import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

/**
 * Product listing grid.
 *
 * At most 4 per row on desktop, 2 on tablet and phones. Every card keeps the
 * same width whatever the count, and any row that isn't full (one product,
 * two products, or the last row of a larger collection) is centred.
 */
export function ProductGrid({ products, emptyText = "New pieces are on their way." }: { products: Product[]; emptyText?: string }) {
  if (!products.length) {
    return <p className="italic-note py-24 text-center text-xl">{emptyText}</p>;
  }
  return (
    <ul data-reveal-group className="flex flex-wrap justify-center gap-x-10 gap-y-20 lg:gap-x-8 max-md:gap-x-4 max-md:gap-y-12">
      {products.map((p) => (
        <li
          key={p.id}
          data-reveal-child
          // Widths subtract the gaps so exactly 2 (phones/tablet) or 4 (desktop) fit per row.
          className="w-[calc((100%-1rem)/2)] md:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-6rem)/4)]"
        >
          <ProductCard
            product={p}
            showPrice
            headingLevel="h2"
            compact
            sizes="(min-width: 1024px) 310px, (min-width: 768px) 45vw, 46vw"
          />
        </li>
      ))}
    </ul>
  );
}
