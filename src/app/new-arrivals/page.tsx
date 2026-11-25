import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { CollectionView } from "@/components/commerce/CollectionView";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest additions to the WELLFORD collection.",
  alternates: { canonical: "/new-arrivals" },
};

export default async function NewArrivalsPage() {
  const collection = await commerce.getCollection("new-arrivals");
  if (!collection) notFound();
  const products = await commerce.getCollectionProducts("new-arrivals");
  return (
    <CollectionView
      path="/new-arrivals"
      eyebrow="Just In"
      title={collection.title}
      subtitle={collection.description}
      image="/media/style-notes-bg.webp"
      position="center 35%"
      products={products}
    />
  );
}
