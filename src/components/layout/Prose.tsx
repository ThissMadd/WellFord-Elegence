import clsx from "@/lib/clsx";

/** Editorial text column for information pages. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "mx-auto max-w-[46rem] text-[1.15rem] leading-[1.75] text-ivory/85 max-sm:text-[1.06rem]",
        "[&_h2]:mt-14 max-md:[&_h2]:mt-10 max-sm:[&_h2]:text-[1.7rem] [&_h2]:text-[2rem] [&_h2]:font-medium [&_h2]:leading-tight [&_h2]:text-ivory first:[&_h2]:mt-0",
        "[&_h3]:mt-10 [&_h3]:font-medium [&_h3]:uppercase [&_h3]:tracking-[0.24em] [&_h3]:text-[0.9rem] [&_h3]:text-gold",
        "[&_p]:mt-5 [&_ul]:mt-5 [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-6",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.85em] [&_li]:before:h-px [&_li]:before:w-3 [&_li]:before:bg-gold",
        "[&_a]:text-gold [&_a]:underline [&_a]:decoration-gold/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-gold",
        className,
      )}
    >
      {children}
    </div>
  );
}
