import { GoldRule } from "@/components/ui/Ornament";
import { NewsletterForm } from "./NewsletterForm";

/**
 * Rendered by the site footer, over the shared letter/footer background
 * (the supplied asset is a single image covering both).
 */
export function NewsletterSection() {
  return (
    <section aria-labelledby="letter-heading" className="relative pt-24 pb-12 md:pt-36 md:pb-16 max-md:pt-16 max-md:pb-6">
      <div className="mx-auto max-w-3xl px-6 text-center max-md:px-5">
        <p data-reveal className="eyebrow">
          The Wellford Letter
        </p>
        <GoldRule className="mt-4 w-16" />
        <h2 id="letter-heading" data-reveal className="display text-shadow-soft mt-6 text-[clamp(2rem,9vw,2.5rem)] sm:text-[3.1rem] max-md:mt-5 lg:text-[3.8rem]">
          A note worth opening.
        </h2>
        <p data-reveal className="italic-note text-shadow-soft mt-4 text-[1.12rem] leading-[1.5] lg:text-[1.3rem] max-sm:text-[1.04rem]">
          Receive new arrivals and considered style notes
          <br className="hidden sm:block" /> from WELLFORD.
        </p>
        <div data-reveal className="mt-10 max-md:mt-7">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
