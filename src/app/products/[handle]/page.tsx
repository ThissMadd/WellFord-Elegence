import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { commerce } from "@/lib/commerce";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductPurchase } from "@/components/commerce/ProductPurchase";
import { ProductCard } from "@/components/commerce/ProductCard";
import { GoldRule } from "@/components/ui/Ornament";

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await commerce.getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const product = await commerce.getProduct(handle);
  if (!product) return {};
  const cover = product.images[0];
  const description = product.seo?.description ?? product.description[0];
  return {
    // A product-level SEO title is used verbatim (no " — WELLFORD" suffix added).
    title: product.seo ? { absolute: product.seo.title } : product.title,
    description,
    alternates: { canonical: `/products/${handle}` },
    openGraph: {
      title: product.seo?.title ?? `${product.title} — ${brand.name}`,
      description,
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = await commerce.getProduct(handle);
  if (!product) notFound();
  const related = await commerce.getRelatedProducts(product, 2);
  const collection = product.collections.includes("lace-ups")
    ? { label: "Lace-Ups", href: "/collections/lace-ups" }
    : product.collections.includes("loafers")
      ? { label: "Loafers", href: "/collections/loafers" }
      : { label: "New Arrivals", href: "/new-arrivals" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description.join(" "),
    image: product.images.map((i) => new URL(i.src, brand.siteUrl).toString()),
    brand: { "@type": "Brand", name: brand.name },
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.color ? { color: product.color } : {}),
    ...(product.category ? { category: product.category } : {}),
    ...(product.price
      ? { offers: { "@type": "Offer", price: product.price.amount, priceCurrency: product.price.currencyCode } }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 max-md:pt-24 max-md:pb-14">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_30%_35%,rgba(59,36,24,0.55),transparent_70%)]" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-14 max-md:px-5">
          <nav aria-label="Breadcrumb" className="mb-8 max-md:mb-4">
            <ol className="label flex flex-wrap items-center gap-3 text-[0.66rem] text-ivory/55">
              <li>
                <Link href="/shop" className="link-underline hover:text-ivory">
                  Shop
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={collection.href} className="link-underline hover:text-ivory">
                  {collection.label}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ivory/85">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 max-md:gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
            <ProductGallery images={product.images} title={product.title} />

            <div className="lg:pt-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {product.badge && (
                  <span className="label border border-gold/50 px-2.5 py-1.5 text-[0.6rem] tracking-[0.24em] text-gold">{product.badge}</span>
                )}
                <p className="eyebrow text-[0.8rem]">{product.subtitle}</p>
              </div>
              <h1 className="display mt-4 text-[clamp(2.15rem,10vw,2.8rem)] sm:text-[3.4rem] lg:text-[3.8rem] max-md:mt-3">{product.title}</h1>
              <GoldRule align="left" className="mt-6 w-20" animate={false} />
              {product.shortDescription && (
                <p className="italic-note mt-6 text-[1.25rem] leading-[1.55] max-md:mt-5 max-sm:text-[1.1rem]">{product.shortDescription}</p>
              )}
              <div className="mt-7 space-y-4 text-[1.18rem] leading-[1.7] text-ivory/85 max-md:mt-5 max-sm:text-[1.06rem]">
                {product.description.map((p, i) => (
                  <p key={i} className={i === 0 ? "" : "italic text-ivory/70"}>
                    {p}
                  </p>
                ))}
              </div>
              {product.details && product.details.length > 0 && (
                <div className="mt-9 max-md:mt-7">
                  <h2 className="label text-[0.72rem] text-gold">Design details</h2>
                  <ul className="mt-4 space-y-2.5 text-[1.08rem] text-ivory/80 max-sm:text-[1.02rem]">
                    {product.details.map((d) => (
                      <li key={d} className="relative pl-6 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-gold">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-10 border-t border-gold/20 pt-10 max-md:mt-8 max-md:pt-8">
                <ProductPurchase product={product} />
              </div>
              <ul className="mt-12 space-y-3 border-t border-gold/20 pt-8 max-md:mt-10 max-md:space-y-0 max-md:pt-4">
                {[
                  { label: "Size guide", href: "/size-guide" },
                  { label: "Shipping & returns", href: "/shipping-returns" },
                  { label: "Questions? Contact client care", href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="label link-underline text-[0.7rem] text-ivory/70 hover:text-ivory max-md:my-1.5 max-md:py-2">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {product.sku && <p className="mt-6 text-[0.9rem] italic text-ivory/45">Ref. {product.sku}</p>}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="relative bg-[radial-gradient(ellipse_70%_60%_at_50%_60%,rgba(59,36,24,0.4),transparent_70%)] px-6 pt-10 pb-28 sm:px-10 max-md:px-5 max-md:pb-16">
          <div className="mx-auto max-w-[1100px] text-center">
            <p data-reveal className="eyebrow">
              Complete the Wardrobe
            </p>
            <h2 id="related-heading" data-reveal className="display mt-4 text-[clamp(2rem,9vw,2.4rem)] sm:text-[2.4rem] lg:text-[3rem]">
              You may also consider
            </h2>
            <GoldRule className="mt-5 w-24" />
            <ul data-reveal-group className="mt-14 grid grid-cols-2 gap-16 sm:gap-12 max-md:mt-10 max-md:gap-x-4 max-md:gap-y-10">
              {related.map((p) => (
                <li key={p.id} data-reveal-child>
                  <ProductCard product={p} showPrice sizes="(min-width: 768px) 45vw, 46vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
