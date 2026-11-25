import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNav, legalNav } from "@/data/navigation";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { GoldRule } from "@/components/ui/Ornament";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export function Footer() {
  // Do not invent an account: until a profile URL is confirmed in
  // src/config/brand.ts, the Instagram link points to the contact page.
  const instagramHref = brand.instagramUrl ?? "/contact#social";
  const instagramExternal = Boolean(brand.instagramUrl);

  return (
    <div className="relative isolate overflow-hidden">
      {/* One continuous library scene behind the letter and the footer */}
      <SectionBackdrop
        src="/media/letter-footer-bg.webp"
        position="22% 30%"
        mobilePosition="50% 28%"
        parallax={false}
        fadeBottom={false}
        overlayClassName="bg-[radial-gradient(ellipse_45%_32%_at_50%_26%,rgba(8,8,8,0.55),transparent),linear-gradient(to_bottom,rgba(8,8,8,0.1)_0%,rgba(8,8,8,0.2)_45%,rgba(8,8,8,0.7)_62%,rgba(8,8,8,0.82)_100%)] max-md:bg-black/55"
      />
      <NewsletterSection />
    <footer className="relative pt-16 pb-10 md:pt-24 max-md:pt-8 max-md:pb-[calc(2rem+env(safe-area-inset-bottom))]" aria-labelledby="footer-heading">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,0.8),rgba(8,8,8,0.35)_32%,transparent_60%)]" />
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-8 gap-y-14 px-6 sm:px-10 max-md:gap-x-5 max-md:gap-y-10 max-md:px-5 md:grid-cols-[1.35fr_1fr_1.15fr_1.2fr] lg:px-14">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="text-[2.1rem] font-medium uppercase leading-none tracking-[0.18em] lg:text-[2.5rem] max-sm:text-[1.9rem]">
            {brand.name}
          </Link>
          <p className="mt-7 text-[1.75rem] font-medium leading-[1.08] lg:text-[2rem] max-md:mt-5 max-sm:text-[1.6rem]">
            {brand.tagline[0]}
            <br />
            {brand.tagline[1]}
          </p>
          <GoldRule align="left" className="mt-7 w-20 max-md:mt-5" />
          <p className="italic-note mt-6 text-[1.05rem] leading-relaxed max-md:mt-4">
            {brand.promise[0]}
            <br />
            {brand.promise[1]}
          </p>
        </div>

        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="eyebrow max-md:whitespace-nowrap text-[0.85rem] max-md:text-[0.74rem] max-md:tracking-[0.22em]">{col.title}</h3>
            <ul className="mt-6 space-y-3 max-md:mt-3 max-md:space-y-0">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-[1.12rem] text-ivory/90 transition-colors hover:text-ivory max-md:py-[0.6rem] max-md:text-[1.06rem]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 md:col-span-1">
          <h3 className="eyebrow text-[0.85rem] max-md:text-[0.74rem] max-md:tracking-[0.22em]">Follow {brand.name}</h3>
          <ul className="mt-6 max-md:mt-3">
            <li>
              <a
                href={instagramHref}
                {...(instagramExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-3 text-[1.12rem] text-ivory/90 hover:text-ivory max-md:min-h-11"
              >
                <InstagramIcon className="h-5 w-5 transition-colors group-hover:text-gold" />
                <span className="link-underline">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1320px] px-6 sm:px-10 lg:px-14 max-md:mt-10 max-md:px-5">
        <span aria-hidden className="block h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center text-[0.95rem] italic text-ivory/75 sm:flex-row sm:gap-0 max-md:mt-6 max-md:gap-1">
          <p>
            © {brand.copyrightYear} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center">
            {legalNav.map((l, i) => (
              <span key={l.href} className="flex items-center">
                <span aria-hidden className={i === 0 ? "mx-6 hidden h-4 w-px bg-gold/60 sm:block" : "mx-4 block h-4 w-px bg-gold/60 sm:mx-6"} />
                <Link href={l.href} className="link-underline hover:text-ivory max-md:py-3">
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
