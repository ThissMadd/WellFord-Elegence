export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Loafers", href: "/collections/loafers" },
  { label: "Lace-Ups", href: "/collections/lace-ups" },
  { label: "Our Story", href: "/our-story" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Loafers", href: "/collections/loafers" },
      { label: "Lace-Ups", href: "/collections/lace-ups" },
      { label: "Our Story", href: "/our-story" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Track Your Order", href: "/track-order" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

/** Client care links (footer column + mobile menu). */
export const clientCareNav: NavLink[] = footerNav.find((c) => c.title === "Client Care")?.links ?? [];
