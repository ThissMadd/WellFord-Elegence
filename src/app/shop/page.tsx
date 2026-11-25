import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { CollectionView } from "@/components/commerce/CollectionView";

export const metadata: Metadata = {
  title: "Shop All",
  description: "The complete WELLFORD collection — timeless footwear, considered in every detail.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await commerce.getProducts();
  return (
    <CollectionView
      path="/shop"
      eyebrow="Shop All"
      title="The Wellford Collection"
      subtitle="Timeless footwear, considered in every detail."
      image="/media/collection-bg.webp"
      position="center 45%"
      products={products}
    />
  );
}
