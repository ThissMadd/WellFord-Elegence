import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { PageHero } from "@/components/layout/PageHero";
import { GoldRule } from "@/components/ui/Ornament";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with WELLFORD client care.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Client Care" title="Contact" subtitle="We would be glad to hear from you." image="/media/faq-bg.webp" position="left 45%" mobilePosition="70% 40%" />
      <section className="px-6 pt-16 pb-28 sm:px-10 lg:px-14 max-md:px-5 max-md:pt-10 max-md:pb-16">
        <div className="mx-auto grid max-w-[1180px] gap-16 max-md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-24">
          <aside className="space-y-14 max-md:space-y-10">
            <div>
              <h2 className="eyebrow text-[0.85rem]">Write to us</h2>
              <GoldRule align="left" className="mt-4 w-16" animate={false} />
              {brand.contactEmail ? (
                <a href={`mailto:${brand.contactEmail}`} className="link-underline mt-5 inline-block text-[1.25rem]">
                  {brand.contactEmail}
                </a>
              ) : (
                <p className="italic-note mt-5 text-[1.12rem] leading-relaxed">
                  Our client care address will be published here shortly. In the meantime, please use the form.
                </p>
              )}
            </div>
            <div id="social">
              <h2 className="eyebrow text-[0.85rem]">Follow {brand.name}</h2>
              <GoldRule align="left" className="mt-4 w-16" animate={false} />
              {brand.instagramUrl ? (
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex items-center gap-3 text-[1.2rem]"
                >
                  <InstagramIcon className="h-5 w-5 group-hover:text-gold" />
                  <span className="link-underline">Instagram</span>
                </a>
              ) : (
                <p className="italic-note mt-5 inline-flex items-center gap-3 text-[1.12rem]">
                  <InstagramIcon className="h-5 w-5 not-italic text-gold" />
                  Our Instagram will be announced soon.
                </p>
              )}
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
