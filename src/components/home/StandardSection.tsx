import { standard } from "@/data/content";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { OrnamentDivider } from "@/components/ui/Ornament";

export function StandardSection() {
  return (
    <section aria-labelledby="standard-heading" className="relative isolate overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28 max-md:pt-12 max-md:pb-14">
      <SectionBackdrop
        src="/media/standard-bg.webp"
        position="center 40%"
        mobilePosition="90% 45%"
        overlayClassName="max-md:bg-black/45 bg-[radial-gradient(ellipse_55%_70%_at_50%_45%,rgba(8,8,8,0.5),transparent)]"
      />

      <header className="mx-auto max-w-4xl px-6 text-center max-md:px-5">
        <p data-reveal className="eyebrow">
          {standard.eyebrow}
        </p>
        <h2 id="standard-heading" data-reveal className="display text-shadow-soft mt-5 text-[clamp(2rem,9.2vw,2.5rem)] sm:text-[3.3rem] max-md:mt-3 lg:text-[4.3rem]">
          {standard.heading}
        </h2>
        <OrnamentDivider className="mt-6 max-md:mt-5 max-md:w-[200px]" />
      </header>

      <ol data-reveal-group className="mx-auto mt-14 grid max-w-[1180px] gap-16 px-6 md:mt-16 md:grid-cols-3 md:gap-8 lg:px-10 max-md:mt-10 max-md:gap-10 max-md:px-5">
        {standard.pillars.map((p) => (
          <li key={p.number} data-reveal-child className="text-center">
            <span className="block text-[2rem] italic leading-none text-gold lg:text-[2.2rem]" aria-hidden>
              {p.number}
            </span>
            <h3 className="label mt-4 text-[1rem] tracking-[0.24em] text-ivory lg:text-[1.08rem]">
              <span className="sr-only">{p.number}. </span>
              {p.title}
            </h3>
            <p className="italic-note mt-4 text-[1.08rem] leading-[1.5]">
              {p.text[0]}
              <br />
              {p.text[1]}
            </p>
            <span aria-hidden data-rule className="gold-rule mx-auto mt-7 w-12 max-md:mt-5" />
          </li>
        ))}
      </ol>
    </section>
  );
}
