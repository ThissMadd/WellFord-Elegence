import type { Metadata } from "next";
import { policies } from "@/data/policies";
import { PolicyPage } from "@/components/layout/PolicyPage";

export const metadata: Metadata = {
  title: policies.privacy.title,
  description: policies.privacy.subtitle,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PolicyPage policy={policies.privacy} image="/media/style-notes-bg.webp" position="center 30%" />;
}
