import Link from "next/link";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { GoldRule } from "@/components/ui/Ornament";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[85svh] items-center justify-center overflow-hidden px-6 pt-28 text-center">
      <SectionBackdrop src="/media/standard-bg.webp" position="center 40%" fadeTop={false} overlayClassName="bg-black/35" />
      <div>
        <p className="eyebrow">Page not found</p>
        <h1 className="display mt-5 text-[2.8rem] sm:text-[3.6rem]">This way leads nowhere.</h1>
        <GoldRule className="mt-6 w-20" animate={false} />
        <p className="italic-note mt-6 text-[1.2rem]">The page you were looking for has moved or no longer exists.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-outline">
            Return Home
          </Link>
          <Link href="/shop" className="btn-outline">
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
