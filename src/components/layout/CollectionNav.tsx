import Link from "next/link";
import { Fragment } from "react";

export const COLLECTION_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Loafers", href: "/collections/loafers" },
  { label: "Lace-Ups", href: "/collections/lace-ups" },
];

/** Secondary navigation between listing pages. Scrolls horizontally on phones. */
export function CollectionNav({ current }: { current: string }) {
  return (
    <nav aria-label="Collections" className="mb-16 flex justify-center md:mb-20 max-md:-mx-5 max-md:mb-5">
      <ul className="no-scrollbar flex flex-wrap items-center justify-center gap-y-3 max-md:w-full max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto max-md:px-5 max-md:[mask-image:linear-gradient(90deg,#000_88%,transparent)]">
        {COLLECTION_LINKS.map((l, i) => (
          <Fragment key={l.href}>
            {i > 0 && (
              <li aria-hidden className="px-4 text-ivory/40 sm:px-6 max-md:px-3.5">
                /
              </li>
            )}
            <li className="shrink-0">
              <Link
                href={l.href}
                aria-current={current === l.href ? "page" : undefined}
                className="label link-underline whitespace-nowrap text-[0.72rem] text-ivory/75 hover:text-ivory aria-[current=page]:text-gold max-md:inline-block max-md:py-3 max-md:text-[0.68rem]"
              >
                {l.label}
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
}
