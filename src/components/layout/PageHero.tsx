import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { GoldRule } from "@/components/ui/Ornament";
import clsx from "@/lib/clsx";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  position?: string;
  /** Object-position on phones (< 768px). */
  mobilePosition?: string;
  align?: "center" | "left";
  size?: "md" | "lg";
};

/** Cinematic banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, subtitle, image, position = "center", mobilePosition, align = "center", size = "md" }: Props) {
  return (
    <section
      className={clsx(
        "relative isolate flex items-end overflow-hidden pt-36 pb-16 md:pb-20 max-md:pt-28 max-md:pb-10",
        size === "lg" ? "min-h-[72svh] max-md:min-h-[62svh]" : "min-h-[52svh] md:min-h-[58svh] max-md:min-h-[44svh]",
      )}
    >
      <SectionBackdrop
        src={image}
        position={position}
        mobilePosition={mobilePosition}
        preload
        fadeTop={false}
        overlayClassName="bg-[linear-gradient(to_bottom,rgba(8,8,8,0.55),rgba(8,8,8,0.25)_40%,rgba(8,8,8,0.45))]"
      />
      <div className={clsx("mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14 max-md:px-5", align === "center" && "text-center")}>
        {eyebrow && <p className="eyebrow text-shadow-soft">{eyebrow}</p>}
        <h1 className="display text-shadow-soft mt-4 text-[clamp(2.15rem,10vw,2.7rem)] sm:text-[3.4rem] lg:text-[4.4rem] max-md:mt-3">{title}</h1>
        <GoldRule align={align === "center" ? "center" : "left"} className="mt-6 w-24 max-md:mt-5 max-md:w-20" />
        {subtitle && (
          <p className={clsx("italic-note text-shadow-soft mt-5 max-w-2xl text-[1.15rem] leading-relaxed lg:text-[1.35rem] max-md:mt-4 max-sm:text-[1.04rem]", align === "center" && "mx-auto")}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
