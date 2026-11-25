"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { PENDING_ANSWER, type FaqItem } from "@/data/faq";
import clsx from "@/lib/clsx";

/**
 * Single-open accordion following the WAI-ARIA accordion pattern:
 * Enter/Space toggles, ↑/↓ move between questions, Home/End jump.
 */
export function Accordion({ items, size = "md" }: { items: FaqItem[]; size?: "md" | "lg" }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const target =
      e.key === "ArrowDown" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowUp" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className="border-t border-gold/70">
      {items.map((item, i) => {
        const open = openId === item.id;
        const btnId = `${baseId}-q-${item.id}`;
        const panelId = `${baseId}-a-${item.id}`;
        return (
          <div key={item.id} className="border-b border-gold/70">
            <h3>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={btnId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={clsx(
                  "group flex w-full items-center justify-between gap-6 text-left max-md:min-h-14 max-md:items-start max-md:gap-4 transition-colors duration-500 hover:text-ivory focus-visible:outline-offset-2",
                  size === "lg" ? "py-6 text-[1.35rem] lg:text-[1.55rem] max-md:py-5 max-md:text-[1.15rem]" : "py-5 text-[1.2rem] lg:text-[1.38rem] max-md:py-[1.1rem] max-md:text-[1.12rem]",
                  open ? "text-ivory" : "text-ivory/92",
                )}
              >
                <span>{item.question}</span>
                <PlusMinus open={open} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!open}
              className={clsx(
                "grid transition-[grid-template-rows,opacity] duration-700 ease-lux",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pr-10 text-[1.06rem] italic leading-relaxed text-ivory/75 max-md:pr-6 max-md:text-[1.02rem]">
                  {(item.answer ?? [PENDING_ANSWER]).map((para, k) => (
                    <p key={k} className={k ? "mt-3" : undefined}>
                      {para}
                    </p>
                  ))}
                  {item.link && (
                    <Link href={item.link.href} className="label link-underline link-underline--rest mt-4 inline-block text-[0.7rem] not-italic text-gold">
                      {item.link.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative h-4 w-4 shrink-0 text-gold max-md:mt-[0.32em]">
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      <span
        className={clsx(
          "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-lux",
          open ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100",
        )}
      />
    </span>
  );
}
