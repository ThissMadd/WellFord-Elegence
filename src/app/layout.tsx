import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { brand } from "@/config/brand";
import { CartProvider } from "@/lib/cart/cart-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} — ${brand.tagline.join(" ")}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline.join(" ")}`,
    description: brand.description,
    images: [{ url: "/media/og-image.jpg", width: 1200, height: 630, alt: "A brown leather penny loafer in a warmly lit library" }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline.join(" ")}`,
    description: brand.description,
    images: ["/media/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  /* Lets fixed bars respect the iPhone home indicator via env(safe-area-inset-*). */
  viewportFit: "cover",
};

/*
 * Marks the document as motion-capable before first paint so hero text can
 * start hidden for its entrance. If the animation hasn't started within a
 * few seconds (script failure), the class is removed and text shows.
 */
const motionBootstrap = `(function(){var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){if(!window.__wfHeroStarted)d.classList.remove('js-motion')},3500)})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // data-scroll-behavior: Next.js disables smooth scrolling during page
  // navigation, so new pages land at the top instead of gliding mid-page.
  return (
    <html lang="en-GB" className={cormorant.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only z-[70] bg-ink-deep px-4 py-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <ScrollAnimations />
        <ScrollToTop />
      </body>
    </html>
  );
}
