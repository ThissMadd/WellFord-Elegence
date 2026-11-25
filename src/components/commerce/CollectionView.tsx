import type { Product } from "@/lib/commerce/types";
import { PageHero } from "@/components/layout/PageHero";
import { CollectionNav } from "@/components/layout/CollectionNav";
import { ShopListing } from "./ShopListing";

type Props = {
  path: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  position?: string;
  products: Product[];
};

export function CollectionView({ path, eyebrow, title, subtitle, image, position, products }: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} image={image} position={position} />
      <section
        aria-label={`${title} — products`}
        className="relative bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(59,36,24,0.45),transparent_70%)] px-6 pt-14 pb-28 sm:px-10 lg:px-14 max-md:px-5 max-md:pt-6 max-md:pb-16"
      >
        <div className="mx-auto max-w-[1320px]">
          <CollectionNav current={path} />
          <ShopListing products={products} path={path} />
        </div>
      </section>
    </>
  );
}
