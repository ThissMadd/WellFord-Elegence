import clsx from "@/lib/clsx";

/** Thin gold rule. `align="left"` fades to the right only. */
export function GoldRule({ className, align = "center", animate = true }: { className?: string; align?: "center" | "left"; animate?: boolean }) {
  return (
    <span
      aria-hidden
      data-rule={animate ? "" : undefined}
      className={clsx("gold-rule", align === "left" && "gold-rule--left", align === "center" && "mx-auto", className)}
      style={{ transformOrigin: align === "left" ? "left center" : "center" }}
    />
  );
}

/** Ornamental gold divider: tapered rules meeting a small scroll and lozenge. */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      data-rule=""
      viewBox="0 0 240 18"
      className={clsx("mx-auto h-[18px] w-[220px] text-gold sm:w-[260px]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <defs>
        <linearGradient id="orn-l" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="96" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="orn-r" gradientUnits="userSpaceOnUse" x1="240" y1="0" x2="144" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <line x1="0" y1="9" x2="96" y2="9" stroke="url(#orn-l)" />
      <line x1="144" y1="9" x2="240" y2="9" stroke="url(#orn-r)" />
      <path d="M96 9c6 0 8-5 13-5s6 5 11 5 6-5 11-5 7 5 13 5" />
      <path d="M96 9c6 0 8 5 13 5s6-5 11-5 6 5 11 5 7-5 13-5" opacity="0.55" />
      <path d="M120 4.5 124.5 9 120 13.5 115.5 9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
