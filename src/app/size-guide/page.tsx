import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Prose } from "@/components/layout/Prose";
import { PendingNotice } from "@/components/ui/PendingNotice";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "How to measure your feet and find your WELLFORD size.",
  alternates: { canonical: "/size-guide" },
};

/**
 * General, industry-standard men's conversions — indicative only. Replace
 * with WELLFORD's confirmed size chart and fit notes when available.
 */
const CONVERSIONS = [
  ["6", "40", "7"],
  ["6.5", "40.5", "7.5"],
  ["7", "41", "8"],
  ["7.5", "41.5", "8.5"],
  ["8", "42", "9"],
  ["8.5", "42.5", "9.5"],
  ["9", "43", "10"],
  ["9.5", "44", "10.5"],
  ["10", "44.5", "11"],
  ["10.5", "45", "11.5"],
  ["11", "45.5", "12"],
];

export default function SizeGuidePage() {
  return (
    <>
      <PageHero eyebrow="Client Care" title="Size Guide" subtitle="A well-fitted pair begins with a careful measure." image="/media/standard-bg.webp" position="center 40%" />
      <section className="px-6 pt-16 pb-28 sm:px-10 max-md:px-5 max-md:pt-10 max-md:pb-16">
        <Prose>
          <h2>Measuring your feet</h2>
          <ul>
            <li>Measure in the late afternoon, when feet are at their largest.</li>
            <li>Stand on a sheet of paper wearing the socks you intend to wear with your shoes.</li>
            <li>Mark the tip of your longest toe and the back of your heel, then measure the distance between them.</li>
            <li>Measure both feet and use the longer measurement.</li>
          </ul>

          <h2>Size conversions</h2>
          <p className="italic text-ivory/65">
            An indicative guide to standard men’s sizes. WELLFORD’s own fit notes will be published here once confirmed.
          </p>
        </Prose>

        <div className="mx-auto mt-8 max-w-[46rem] overflow-x-auto">
          <table className="w-full min-w-[22rem] border-collapse text-center text-[1.1rem]">
            <caption className="sr-only">Indicative men’s shoe size conversions: UK, EU and US</caption>
            <thead>
              <tr className="border-b border-gold/60">
                {["UK", "EU", "US"].map((h) => (
                  <th key={h} scope="col" className="label py-4 text-[0.78rem] text-gold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONVERSIONS.map(([uk, eu, us]) => (
                <tr key={uk} className="border-b border-ivory/10">
                  <th scope="row" className="py-3 font-medium">
                    {uk}
                  </th>
                  <td className="py-3 text-ivory/80">{eu}</td>
                  <td className="py-3 text-ivory/80">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PendingNotice title="Between sizes?" className="mx-auto mt-20 max-w-[46rem] max-md:mt-12">
          Fit guidance for each WELLFORD style is being prepared. Until then, our client care team will gladly advise.
        </PendingNotice>
      </section>
    </>
  );
}
