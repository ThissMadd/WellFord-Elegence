"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@/lib/commerce/types";
import clsx from "@/lib/clsx";
import { SnapCarousel } from "@/components/ui/SnapCarousel";

/** Where to anchor each kind of image when cropped into the square stage. */
const FOCUS: Record<ProductImage["kind"], string> = {
  cutout: "center",
  lifestyle: "center 88%",
  scene: "30% 62%",
};

export function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = images.length;
  const go = (i: number) => setIndex((i + count) % count);

  const onThumbKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + count) % count;
    setIndex(next);
    thumbs.current[next]?.focus();
  };

  return (
    <>
    {/* Phones: full-bleed swipeable gallery with gold pagination. */}
    <div className="-mx-5 md:hidden">
      <SnapCarousel
        label={`${title} images`}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        dotsClassName="mt-1"
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            className={clsx(
              "relative aspect-[6/5] w-full shrink-0 snap-center snap-always overflow-hidden",
              img.kind === "cutout" && "bg-[radial-gradient(ellipse_65%_55%_at_50%_58%,rgba(120,72,34,0.42),rgba(59,36,24,0.25)_45%,rgba(8,8,8,0)_75%)] p-7",
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={90}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={clsx(img.kind === "cutout" ? "object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.6)]" : "object-cover")}
                style={{ objectPosition: FOCUS[img.kind] }}
              />
            </div>
          </li>
        ))}
      </SnapCarousel>
    </div>

    {/* Tablet/desktop: crossfading stage with thumbnails (unchanged). */}
    <div className="hidden flex-col gap-4 md:flex" aria-roledescription="carousel" aria-label={`${title} images`}>
      <div className="group relative aspect-square overflow-hidden bg-[radial-gradient(ellipse_65%_55%_at_50%_58%,rgba(120,72,34,0.42),rgba(59,36,24,0.25)_45%,rgba(8,8,8,0)_75%)] lg:aspect-[5/4]">
        {images.map((img, i) => (
          <div
            key={img.src}
            aria-hidden={i !== index}
            className={clsx(
              "absolute inset-0 transition-opacity duration-[900ms] ease-lux",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
              img.kind === "cutout" && "p-6 sm:p-12",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              quality={90}
              preload={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className={clsx(img.kind === "cutout" ? "object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.6)]" : "object-cover")}
              style={{ objectPosition: FOCUS[img.kind] }}
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-gold/40 bg-ink-deep/50 text-ivory opacity-100 backdrop-blur-sm transition-opacity duration-500 hover:border-gold md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} strokeWidth={1.2} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-gold/40 bg-ink-deep/50 text-ivory opacity-100 backdrop-blur-sm transition-opacity duration-500 hover:border-gold md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={18} strokeWidth={1.2} />
            </button>
            <p className="sr-only" aria-live="polite">
              Image {index + 1} of {count}: {images[index].alt}
            </p>
          </>
        )}
      </div>

      {count > 1 && (
        <div role="group" aria-label="Choose image" className="flex gap-3" onKeyDown={onThumbKey}>
          {images.map((img, i) => (
            <button
              key={img.src}
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}: ${img.alt}`}
              aria-current={i === index ? "true" : undefined}
              tabIndex={i === index ? 0 : -1}
              className={clsx(
                "relative aspect-square w-20 overflow-hidden border transition-colors duration-500 sm:w-24",
                i === index ? "border-gold" : "border-ivory/15 hover:border-ivory/40",
                img.kind === "cutout" && "bg-walnut/40",
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="96px"
                className={img.kind === "cutout" ? "object-contain p-1.5" : "object-cover"}
                style={{ objectPosition: FOCUS[img.kind] }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
