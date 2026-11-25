import { commerce } from "@/lib/commerce";
import { homepageFeaturedHandles } from "@/data/content";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionSection } from "@/components/home/CollectionSection";
import { StorySection } from "@/components/home/StorySection";
import { StyleNotesSection } from "@/components/home/StyleNotesSection";
import { StandardSection } from "@/components/home/StandardSection";
import { FAQSection } from "@/components/home/FAQSection";

export default async function HomePage() {
  // The homepage presents its three featured pieces; new products appear in Shop All / New Arrivals.
  const products = await commerce.getProductsByHandles(homepageFeaturedHandles);
  return (
    <>
      <HeroSection />
      <CollectionSection products={products} />
      <StorySection />
      <StyleNotesSection />
      <StandardSection />
      <FAQSection />
    </>
  );
}
