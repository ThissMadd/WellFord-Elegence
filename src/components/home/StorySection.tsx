import Image from "next/image";
import Link from "next/link";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { GoldRule } from "@/components/ui/Ornament";

/**
 * The background already contains the Penny Loafer (left of centre), so no
 * product image is added — copy sits on the right as in the reference.
 */
export function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="relative isolate overflow-hidden">
      {/* Desktop / tablet: full-bleed cinematic background */}
      <SectionBackdrop
        src="/media/story-bg.webp"
        position="center 55%"
        className="hidden md:block"
        overlayClassName="bg-[linear-gradient(270deg,rgba(8,8,8,0.78)_0%,rgba(8,8,8,0.5)_32%,rgba(8,8,8,0)_55%)]"
      />

      {/* Mobile: cropped around the shoe, copy below it */}
      <div className="relative aspect-[5/4] w-full md:hidden max-[359px]:aspect-square" aria-hidden>
        <div className="absolute inset-0">
          <Image src="/media/story-bg.webp" alt="" fill sizes="100vw" quality={85} className="object-cover object-[30%_62%]" />
        </div>
        <div className="fade-top absolute inset-x-0 top-0 h-1/4" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,#080808_0%,rgba(8,8,8,0.7)_35%,rgba(8,8,8,0)_100%)]" />
      </div>

      <div className="mx-auto flex max-w-[1600px] px-6 pb-20 sm:px-10 md:min-h-[min(50vw,820px)] md:items-center md:py-20 lg:px-14 max-md:-mt-6 max-md:px-5 max-md:pb-14">
        <div className="md:ml-[54%] md:max-w-[36rem] lg:ml-[55%]">
          <p data-reveal className="label text-[0.85rem] tracking-[0.32em] text-ivory lg:text-[0.95rem]">
            The Wellford Story
          </p>
          <GoldRule align="left" className="mt-4 w-24" />
          <h2 id="story-heading" data-reveal className="display text-shadow-soft mt-6 text-[clamp(2rem,9vw,2.4rem)] sm:text-[2.8rem] max-md:mt-4 lg:text-[3.4rem]">
            A quieter kind of luxury
          </h2>
          <p data-reveal className="italic-note text-shadow-soft mt-4 text-[1.15rem] leading-[1.55] lg:text-[1.35rem] max-sm:text-[1.04rem]">
            Considered design. Timeless style.
            <br />A confident finish to every occasion.
          </p>
          <div data-reveal className="mt-9 max-md:mt-7">
            <Link href="/our-story" className="btn-outline">
              Discover Wellford
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
