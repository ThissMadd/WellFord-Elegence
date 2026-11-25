import type { Metadata } from "next";
import { policies } from "@/data/policies";
import { PolicyPage } from "@/components/layout/PolicyPage";

export const metadata: Metadata = {
  title: policies.shipping.title,
  description: policies.shipping.subtitle,
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingPage() {
  return <PolicyPage policy={policies.shipping} image="/media/collection-bg.webp" position="center 45%" />;
}
