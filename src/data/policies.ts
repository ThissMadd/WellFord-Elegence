/**
 * Policy pages. Every `body` is `null` until the business supplies the
 * confirmed, legally reviewed text — nothing here is invented.
 *
 * To publish, replace `null` with an array of sections:
 *   [{ heading: "Delivery", paragraphs: ["…", "…"] }, …]
 */
export type PolicySection = { heading: string; paragraphs: string[] };

export type Policy = {
  title: string;
  eyebrow: string;
  subtitle: string;
  /** Topics the final policy is expected to cover (shown while pending). */
  covers: string[];
  body: PolicySection[] | null;
  lastUpdated: string | null;
};

export const policies = {
  shipping: {
    title: "Shipping & Returns",
    eyebrow: "Client Care",
    subtitle: "Delivery, exchanges and returns.",
    covers: ["Delivery destinations", "Delivery times and charges", "Exchanges", "Returns and refunds"],
    body: null,
    lastUpdated: null,
  },
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Legal",
    subtitle: "How WELLFORD handles your personal information.",
    covers: ["Information we collect", "How it is used", "Cookies", "Your rights", "How to contact us"],
    body: null,
    lastUpdated: null,
  },
  terms: {
    title: "Terms of Service",
    eyebrow: "Legal",
    subtitle: "The terms that apply when using this website.",
    covers: ["Use of the website", "Orders and pricing", "Delivery and returns", "Liability", "Governing law"],
    body: null,
    lastUpdated: null,
  },
} satisfies Record<string, Policy>;
