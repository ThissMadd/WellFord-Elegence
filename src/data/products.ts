import type { Collection, Product } from "@/lib/commerce/types";

/**
 * Local product catalogue.
 *
 * Prices are the confirmed USD prices supplied by WELLFORD.
 *
 * No product CSV was supplied, so:
 *  - Descriptions only state what is visible in the supplied photography;
 *    no materials, construction methods or origin claims are made.
 *  - The size run is provisional (`sizesProvisional: true`) and must be
 *    confirmed before launch.
 *
 * When Shopify is connected, this file is replaced by the Shopify provider
 * in src/lib/commerce.
 */

/** Provisional UK size run. Confirm with the business before launch. */
const PROVISIONAL_SIZES = ["UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5", "UK 9", "UK 9.5", "UK 10", "UK 10.5", "UK 11"];

const CUTOUT = { width: 1196, height: 750, kind: "cutout" as const };
const LIFESTYLE = { width: 1122, height: 1402, kind: "lifestyle" as const };

export const products: Product[] = [
  {
    id: "wf-penny-loafer",
    handle: "the-penny-loafer",
    title: "The Penny Loafer",
    subtitle: "Brown leather penny loafer",
    description: [
      "A rich brown penny loafer with a classic saddle strap, a softly rounded toe and a stacked heel.",
      "Composed enough for the office, easy enough for the weekend — a quiet foundation for a considered wardrobe.",
    ],
    price: { amount: "249.00", currencyCode: "USD" },
    collections: ["loafers", "new-arrivals"],
    images: [
      { src: "/media/penny-loafer.webp", alt: "The Penny Loafer in brown leather, resting on a stone podium", ...CUTOUT },
      { src: "/media/city-hours.webp", alt: "The Penny Loafer worn with navy trousers and a leather briefcase on a city street", ...LIFESTYLE },
      { src: "/media/story-bg.webp", alt: "The Penny Loafer on a polished wooden table in a warmly lit library", width: 1755, height: 896, kind: "scene" },
    ],
    options: [{ name: "Size", values: PROVISIONAL_SIZES }],
    sizesProvisional: true,
    tags: ["loafer", "leather"],
  },
  {
    id: "wf-suede-driver",
    handle: "the-suede-driver",
    title: "The Suede Driver",
    subtitle: "Tan suede driving shoe",
    description: [
      "A tan suede driver with a moccasin-stitched vamp and a studded sole that wraps up the heel.",
      "Made for unhurried days — terraces, long lunches and the drive home.",
    ],
    price: { amount: "229.00", currencyCode: "USD" },
    collections: ["loafers", "new-arrivals"],
    images: [
      { src: "/media/suede-driver.webp", alt: "The Suede Driver in tan suede, resting on a stone podium", ...CUTOUT },
      { src: "/media/the-weekend.webp", alt: "The Suede Driver worn with cream trousers on a sunlit terrace", ...LIFESTYLE },
    ],
    options: [{ name: "Size", values: PROVISIONAL_SIZES }],
    sizesProvisional: true,
    tags: ["driver", "suede"],
  },
  {
    id: "wf-classic-derby",
    handle: "the-classic-derby",
    title: "The Classic Derby",
    subtitle: "Black leather lace-up derby",
    description: [
      "A polished black derby with open lacing, a clean plain toe and a stacked heel.",
      "Sharp enough for the evening, steady enough for every day — the lace-up that finishes a tailored look.",
    ],
    price: { amount: "269.00", currencyCode: "USD" },
    collections: ["lace-ups", "new-arrivals"],
    images: [
      { src: "/media/classic-derby.webp", alt: "The Classic Derby in black leather, resting on a stone podium", ...CUTOUT },
      { src: "/media/after-dark.webp", alt: "The Classic Derby worn with grey tailoring in a leather armchair in a library", ...LIFESTYLE },
    ],
    options: [{ name: "Size", values: PROVISIONAL_SIZES }],
    sizesProvisional: true,
    tags: ["derby", "lace-up", "leather"],
  },
  {
    id: "wf-chelsea-boot",
    handle: "the-chelsea-boot",
    title: "The Chelsea Boot",
    subtitle: "Dark chocolate-brown Chelsea boot",
    shortDescription: "Refined simplicity. Timeless character. A distinguished silhouette for the modern gentleman.",
    description: [
      "A timeless expression of understated elegance, The Chelsea Boot brings together a refined silhouette and classic British-inspired styling.",
      "Its rich chocolate-brown finish, clean lines, elastic side panels, and discreet heel pull tab create a distinguished look that transitions effortlessly from relaxed daytime occasions to more formal evening settings.",
      "Pair it with tailored trousers, dark denim, or a considered seasonal wardrobe.",
      "Quiet style. Lasting presence.",
    ],
    details: [
      "Rich dark chocolate-brown finish",
      "Classic Chelsea boot silhouette",
      "Elastic side panels",
      "Discreet heel pull tab",
      "Rounded toe",
      "Refined stacked-heel appearance",
      "Versatile day-to-evening styling",
    ],
    price: { amount: "289.00", currencyCode: "USD" },
    category: "Boots",
    color: "Dark Chocolate Brown",
    sku: "WLF-CHB-DBR",
    badge: "New Arrival",
    collections: ["new-arrivals"],
    images: [
      {
        src: "/media/chelsea-boot.webp",
        alt: "WELLFORD dark chocolate-brown Chelsea boot displayed on a beige stone podium.",
        width: 1196,
        height: 926,
        kind: "cutout",
      },
    ],
    // Proposed EU size run, supplied by WELLFORD; marked provisional until confirmed.
    options: [{ name: "Size", values: ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"] }],
    sizesProvisional: true,
    tags: ["boot", "chelsea", "men", "classic-british-heritage"],
    seo: {
      title: "The Chelsea Boot – Dark Chocolate Brown | WELLFORD",
      description:
        "Discover The Chelsea Boot by WELLFORD. A refined chocolate-brown silhouette inspired by timeless British style and understated elegance.",
    },
  },
];

export const collections: Collection[] = [
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "The latest additions to the WELLFORD collection.",
  },
  {
    handle: "loafers",
    title: "Loafers",
    description: "Slip-on ease, finished with quiet polish.",
  },
  {
    handle: "lace-ups",
    title: "Lace-Ups",
    description: "Classic lace-ups for tailored days and evening hours.",
  },
];
