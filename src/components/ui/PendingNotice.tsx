import Link from "next/link";
import clsx from "@/lib/clsx";

/**
 * Shown wherever business information (policies, prices, contact details)
 * has not been confirmed yet. Keeps the page honest without looking broken.
 */
export function PendingNotice({
  title = "Details to follow",
  children,
  className,
  cta = { label: "Contact client care", href: "/contact" },
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  cta?: { label: string; href: string } | null;
}) {
  return (
    <aside className={clsx("border-y border-gold/35 py-8 text-center", className)}>
      <p className="eyebrow text-[0.8rem]">{title}</p>
      <div className="italic-note mx-auto mt-4 max-w-xl text-[1.12rem] leading-relaxed">
        {children ?? "This information is being finalised and will be published here shortly."}
      </div>
      {cta && (
        <Link href={cta.href} className="label link-underline link-underline--rest mt-5 inline-block text-[0.72rem] text-gold">
          {cta.label}
        </Link>
      )}
    </aside>
  );
}
