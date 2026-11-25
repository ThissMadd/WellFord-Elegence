import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/commerce/money";
import clsx from "@/lib/clsx";

type Props = {
  product: Product;
  /** Show the price line (listing pages). Homepage hides it, as in the reference. */
  showPrice?: boolean;
  sizes?: string;
  className?: string;
  headingLevel?: "h3" | "h2";
  /** Narrower card (4-across grids): name set slightly smaller on mid-size screens so it stays on one line. */
  compact?: boolean;
};

/**
 * Product presented on its podium — no card, no border. The transparent
 * render sits directly on the section background.
 */
export function ProductCard({ product, showPrice = false, sizes, className, headingLevel = "h3", compact = false }: Props) {
  const image = product.images.find((i) => i.kind === "cutout") ?? product.images[0];
  const Heading = headingLevel;
  return (
    <Link
      href={`/products/${product.handle}`}
      className={clsx("group relative flex flex-col items-center text-center outline-none", className)}
      aria-label={`${product.title} — view details`}
    >
      <div className="relative w-full">
        {/* Warm pool of light behind the podium */}
        <div
          aria-hidden
          className="absolute inset-x-[8%] bottom-[2%] top-[30%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(212,150,70,0.22),transparent)] opacity-70 blur-2xl transition-opacity duration-700 ease-lux group-hover:opacity-100"
        />
        {/* Contact shadow */}
        <div
          aria-hidden
          className="absolute inset-x-[14%] bottom-[3%] h-[10%] rounded-[50%] bg-black/70 blur-xl transition-transform duration-700 ease-lux group-hover:scale-x-90"
        />
        <div className="relative aspect-[1196/750] w-full transition-transform duration-700 ease-lux will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.035] group-focus-visible:-translate-y-2 group-focus-visible:scale-[1.035]">
          {/*
            All cut-outs share the same width and podium baseline. Taller pieces
            (e.g. boots) keep that scale and simply rise above the frame, so every
            podium in a row lines up and nothing is shrunk or stretched.
          */}
          <div className="absolute inset-x-0 bottom-0" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={90}
              sizes={sizes ?? "(min-width: 1280px) 400px, (min-width: 768px) 31vw, 78vw"}
              className="object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
        {product.badge && (
          <span className="label absolute left-0 top-0 z-10 border border-gold/50 bg-ink-deep/60 px-2.5 py-1.5 text-[0.6rem] tracking-[0.24em] text-gold backdrop-blur-[2px] max-md:px-2 max-md:py-1 max-md:text-[0.52rem] max-md:tracking-[0.18em]">
            {product.badge}
          </span>
        )}
      </div>
      <Heading className={clsx("label mt-5 text-[0.95rem] tracking-[0.24em] text-ivory transition-colors duration-500 group-hover:text-ivory lg:text-[1.05rem] max-md:mt-3 max-md:flex max-md:min-h-[2.6em] max-md:items-start max-md:justify-center max-md:text-[0.8rem] max-md:leading-[1.3] max-md:tracking-[0.18em]", compact && "lg:text-[0.76rem] lg:tracking-[0.13em] xl:text-[0.95rem] xl:tracking-[0.2em] 2xl:text-[1.05rem] 2xl:tracking-[0.24em]")}>
        {product.title}
      </Heading>
      {showPrice && <p className="mt-2 text-[1.02rem] italic text-ivory/70 max-md:mt-1 max-md:text-[0.98rem]">{formatMoney(product.price)}</p>}
      <span className="label link-underline link-underline--rest mt-2.5 text-[0.68rem] tracking-[0.3em] text-gold max-md:mt-1.5 max-md:py-1 max-md:text-[0.64rem] max-md:tracking-[0.24em]">View Details</span>
      {/* Visible focus ring without a card border */}
      <span aria-hidden className="pointer-events-none absolute -inset-3 border border-gold/0 transition-colors group-focus-visible:border-gold/60" />
    </Link>
  );
}
