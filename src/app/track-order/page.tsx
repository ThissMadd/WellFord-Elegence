import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { GoldRule } from "@/components/ui/Ornament";
import { TrackOrderForm } from "./TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Follow your WELLFORD order with your order number and email address.",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Care"
        title="Track Your Order"
        subtitle="Enter your order number and email address to follow your pair."
        image="/media/letter-footer-bg.webp"
        position="50% 35%"
        mobilePosition="50% 30%"
      />
      <section className="px-6 pt-16 pb-28 sm:px-10 lg:px-14 max-md:px-5 max-md:pt-10 max-md:pb-16">
        <div className="mx-auto grid max-w-[1080px] gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-24 max-md:gap-12">
          <aside className="space-y-12 max-md:order-2 max-md:space-y-9">
            <div>
              <h2 className="eyebrow text-[0.85rem]">Your order number</h2>
              <GoldRule align="left" className="mt-4 w-16" animate={false} />
              <p className="italic-note mt-5 text-[1.12rem] leading-relaxed max-sm:text-[1.04rem]">
                Your order number appears in your order confirmation email. Enter it with or without the “#”.
              </p>
            </div>
            <div>
              <h2 className="eyebrow text-[0.85rem]">Need a hand?</h2>
              <GoldRule align="left" className="mt-4 w-16" animate={false} />
              <p className="italic-note mt-5 text-[1.12rem] leading-relaxed max-sm:text-[1.04rem]">
                For delivery questions, exchanges or returns, our client care team will be glad to help.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  { label: "Shipping & Returns", href: "/shipping-returns" },
                  { label: "Contact client care", href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="label link-underline text-[0.7rem] text-gold max-md:inline-block max-md:py-2">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <TrackOrderForm />
        </div>
      </section>
    </>
  );
}
