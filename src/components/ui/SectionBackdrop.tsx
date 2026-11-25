import Image from "next/image";
import clsx from "@/lib/clsx";

type Props = {
  src: string;
  /** CSS object-position for the image (tablet/desktop, >= 768px). */
  position?: string;
  /** Object-position on phones (< 768px). Each section crops differently. */
  mobilePosition?: string;
  /** Mirror the image horizontally (composition matching). */
  mirror?: boolean;
  fadeTop?: boolean;
  fadeBottom?: boolean;
  /** Extra overlay classes (e.g. side vignettes). */
  overlayClassName?: string;
  parallax?: boolean;
  preload?: boolean;
  className?: string;
};

/**
 * Full-bleed background image for a section, with top/bottom fades into the
 * shared near-black so neighbouring sections blend without hard cuts.
 */
export function SectionBackdrop({
  src,
  position = "center",
  mobilePosition,
  mirror = false,
  fadeTop = true,
  fadeBottom = true,
  overlayClassName,
  parallax = true,
  preload = false,
  className,
}: Props) {
  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        data-parallax={parallax ? "" : undefined}
        className={clsx("absolute inset-x-0", parallax ? "-top-[5%] -bottom-[5%]" : "inset-y-0", mirror && "-scale-x-100")}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          preload={preload}
          className="object-cover [object-position:var(--bg-pos-m)] md:[object-position:var(--bg-pos)]"
          style={{ "--bg-pos": position, "--bg-pos-m": mobilePosition ?? position } as React.CSSProperties}
        />
      </div>
      {overlayClassName && <div className={clsx("absolute inset-0", overlayClassName)} />}
      {fadeTop && <div className="fade-top absolute inset-x-0 top-0 h-[17%] min-h-20" />}
      {fadeBottom && <div className="fade-bottom absolute inset-x-0 bottom-0 h-[17%] min-h-20" />}
    </div>
  );
}
