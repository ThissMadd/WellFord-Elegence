import type { Metadata } from "next";
import { GoldRule } from "@/components/ui/Ornament";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Your Bag",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden px-6 pt-36 pb-28 sm:px-10 lg:px-14 max-md:min-h-[60svh] max-md:px-5 max-md:pt-28 max-md:pb-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(59,36,24,0.5),transparent_70%)]" />
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-14 text-center max-md:mb-8">
          <p className="eyebrow">Your Selection</p>
          <h1 className="display mt-4 text-[clamp(2.15rem,10vw,2.8rem)] sm:text-[2.8rem] lg:text-[3.8rem] max-md:mt-3">Your Bag</h1>
          <GoldRule className="mt-5 w-20" animate={false} />
        </header>
        <CartView />
      </div>
    </section>
  );
}
