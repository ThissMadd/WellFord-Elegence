import { faqItems } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { GoldRule } from "@/components/ui/Ornament";

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative isolate overflow-hidden py-20 md:py-28 max-md:py-14">
      <SectionBackdrop
        src="/media/faq-bg.webp"
        position="left 45%"
        mobilePosition="64% 40%"
        overlayClassName="bg-[linear-gradient(90deg,rgba(8,8,8,0)_0%,rgba(8,8,8,0)_10%,rgba(8,8,8,0.45)_20%,rgba(8,8,8,0.35)_32%,rgba(8,8,8,0.55)_60%,rgba(8,8,8,0.35)_100%)] max-md:bg-black/55"
      />

      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 sm:px-10 max-md:gap-8 max-md:px-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 lg:px-14">
        <div className="md:pl-[16%] lg:pl-[22%]">
          <p data-reveal className="eyebrow">
            Need a hand?
          </p>
          <GoldRule align="left" className="mt-4 w-24" />
          <h2 id="faq-heading" data-reveal className="display text-shadow-soft mt-6 text-[clamp(2.1rem,9.5vw,2.6rem)] sm:text-[3rem] max-md:mt-4 lg:text-[3.5rem]">
            Good to know.
          </h2>
          <p data-reveal className="italic-note text-shadow-soft mt-4 text-[1.12rem] leading-[1.5] lg:text-[1.3rem] max-sm:text-[1.04rem]">
            A few details to make choosing
            <br />
            your pair easier.
          </p>
        </div>
        <div data-reveal className="md:pt-2">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
