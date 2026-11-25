import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import { PageHero } from "@/components/layout/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { PendingNotice } from "@/components/ui/PendingNotice";

export const metadata: Metadata = {
  title: "FAQ",
  description: "A few details to make choosing your pair easier.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Need a hand?" title="Good to know." subtitle="A few details to make choosing your pair easier." image="/media/faq-bg.webp" position="left 45%" mobilePosition="70% 40%" />
      <section className="px-6 pt-16 pb-28 sm:px-10 max-md:px-5 max-md:pt-10 max-md:pb-16">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqItems} size="lg" />
          <PendingNotice title="Can’t find your answer?" className="mt-20 max-md:mt-12">
            Our client care team will be glad to help with anything not covered here.
          </PendingNotice>
        </div>
      </section>
    </>
  );
}
