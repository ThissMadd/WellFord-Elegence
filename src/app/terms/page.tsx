import type { Metadata } from "next";
import { policies } from "@/data/policies";
import { PolicyPage } from "@/components/layout/PolicyPage";

export const metadata: Metadata = {
  title: policies.terms.title,
  description: policies.terms.subtitle,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <PolicyPage policy={policies.terms} image="/media/style-notes-bg.webp" position="center 30%" />;
}
