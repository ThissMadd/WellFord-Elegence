/**
 * Brand-level configuration.
 *
 * Values set to `null` are business details that have not been confirmed yet.
 * The UI is written to handle them honestly (no invented contact details,
 * accounts or policies). Fill them in here when they are confirmed.
 */
export const brand = {
  name: "WELLFORD",
  tagline: ["Quiet style.", "Lasting presence."],
  promise: ["Timeless footwear for the", "modern gentleman."],
  description: "Timeless luxury footwear for the modern gentleman.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  copyrightYear: 2026,

  /** Official Instagram profile URL. Not confirmed yet. */
  instagramUrl: null as string | null,
  /** Customer care e-mail address. Not confirmed yet. */
  contactEmail: null as string | null,

  /** Store currency. Prices live on each product (src/data/products.ts). */
  currencyCode: "USD",
  /** Locale used for number/currency formatting ($249.00). */
  locale: "en-US",
} as const;

export type Brand = typeof brand;
