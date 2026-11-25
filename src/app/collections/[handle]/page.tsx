import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce, type CollectionHandle } from "@/lib/commerce";
import { CollectionView } from "@/components/commerce/CollectionView";

/** Listing collections reachable at /collections/[handle]. */
const VISUALS: Partial<Record<CollectionHandle, { eyebrow: string; image: string; position: string }>> = {
  loafers: { eyebrow: "The Collection", image: "/media/story-bg.webp", position: "center 60%" },
  "lace-ups": { eyebrow: "The Collection", image: "/media/standard-bg.webp", position: "center 40%" },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(VISUALS).map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const collection = await commerce.getCollection(handle);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${handle}` },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[handle]">) {
  const { handle } = await params;
  const visual = VISUALS[handle as CollectionHandle];
  const collection = await commerce.getCollection(handle);
  if (!collection || !visual) notFound();
  const products = await commerce.getCollectionProducts(collection.handle);

  return (
    <CollectionView
      path={`/collections/${handle}`}
      eyebrow={visual.eyebrow}
      title={collection.title}
      subtitle={collection.description}
      image={visual.image}
      position={visual.position}
      products={products}
    />
  );
}
