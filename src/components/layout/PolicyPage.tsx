import type { Policy } from "@/data/policies";
import { PageHero } from "./PageHero";
import { Prose } from "./Prose";
import { PendingNotice } from "@/components/ui/PendingNotice";

export function PolicyPage({ policy, image, position }: { policy: Policy; image: string; position?: string }) {
  return (
    <>
      <PageHero eyebrow={policy.eyebrow} title={policy.title} subtitle={policy.subtitle} image={image} position={position} />
      <section className="px-6 pt-16 pb-28 sm:px-10 max-md:px-5 max-md:pt-10 max-md:pb-16">
        {policy.body ? (
          <Prose>
            {policy.lastUpdated && <p className="italic text-ivory/60">Last updated {policy.lastUpdated}</p>}
            {policy.body.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </Prose>
        ) : (
          <div className="mx-auto max-w-[46rem]">
            <PendingNotice title="Being prepared">
              Our {policy.title.toLowerCase()} is being finalised and will be published here before orders open.
            </PendingNotice>
            <div className="mt-14 text-center">
              <p className="label text-[0.75rem] text-ivory/60">It will cover</p>
              <ul className="mt-6 space-y-3 text-[1.2rem] text-ivory/85">
                {policy.covers.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
