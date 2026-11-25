import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { commerce } from "@/lib/commerce";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await commerce.getProducts();
  const paths = [
    "/",
    "/shop",
    "/new-arrivals",
    "/collections/loafers",
    "/collections/lace-ups",
    ...products.map((p) => `/products/${p.handle}`),
    "/our-story",
    "/faq",
    "/size-guide",
    "/shipping-returns",
    "/track-order",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return paths.map((p) => ({ url: new URL(p, brand.siteUrl).toString() }));
}
