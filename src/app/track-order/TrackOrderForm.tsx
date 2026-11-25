"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/forms";
import clsx from "@/lib/clsx";

type Errors = Partial<Record<"orderNumber" | "email", string>>;
type Result =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "found"; status: string | null; statusUrl: string | null }
  | { kind: "message"; tone: "info" | "error"; text: string };

const field =
  "mt-2 h-14 w-full border bg-black/35 px-5 text-[1.12rem] text-ivory outline-none transition-colors duration-500 placeholder:italic placeholder:text-ivory/45 focus:border-gold focus-visible:outline-none";

export function TrackOrderForm() {
  const id = useId();
  const [values, setValues] = useState({ orderNumber: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    const orderNumber = values.orderNumber.trim().replace(/^#/, "");
    if (!orderNumber) next.orderNumber = "Please enter your order number.";
    else if (!/^[A-Za-z0-9-]+$/.test(orderNumber)) next.orderNumber = "Order numbers contain only letters, numbers and hyphens.";
    if (!isValidEmail(values.email)) next.email = "Please enter the email address used for your order.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    setResult({ kind: "sending" });
    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email: values.email }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; status?: string | null; statusUrl?: string | null };
      if (res.ok && data.ok) {
        setResult({ kind: "found", status: data.status ?? null, statusUrl: data.statusUrl ?? null });
      } else if (data.error === "not-configured") {
        setResult({
          kind: "message",
          tone: "info",
          text: "Online order tracking is not available just yet. For an update on your order, please contact our client care team.",
        });
      } else if (data.error === "not-found") {
        setResult({
          kind: "message",
          tone: "error",
          text: "We couldn’t find an order matching that number and email address. Please check both and try again.",
        });
      } else {
        setResult({ kind: "message", tone: "error", text: "We couldn’t look up your order just now. Please try again shortly." });
      }
    } catch {
      setResult({ kind: "message", tone: "error", text: "We couldn’t look up your order just now. Please try again shortly." });
    }
  }

  const fieldProps = (k: keyof Errors) => ({
    id: `${id}-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined,
    className: clsx(field, errors[k] ? "border-red-300/70" : "border-ivory/40"),
  });

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="space-y-7">
        <div>
          <label htmlFor={`${id}-orderNumber`} className="label text-[0.72rem] text-ivory/75">
            Order number
          </label>
          <input type="text" autoComplete="off" inputMode="text" placeholder="e.g. 1001" {...fieldProps("orderNumber")} />
          {errors.orderNumber && (
            <p id={`${id}-orderNumber-err`} className="mt-2 text-sm italic text-red-200/90">
              {errors.orderNumber}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label text-[0.72rem] text-ivory/75">
            Email address
          </label>
          <input type="email" autoComplete="email" inputMode="email" placeholder="The email used for your order" {...fieldProps("email")} />
          {errors.email && (
            <p id={`${id}-email-err`} className="mt-2 text-sm italic text-red-200/90">
              {errors.email}
            </p>
          )}
        </div>
        <button type="submit" className="btn-gold h-14 w-full" disabled={result.kind === "sending"}>
          {result.kind === "sending" ? "Looking up…" : "Track Order"}
        </button>
      </form>

      <div role="status" aria-live="polite" className="mt-8 min-h-[1.5em]">
        {result.kind === "found" && (
          <div className="border-y border-gold/35 py-7 text-center">
            <p className="eyebrow text-[0.78rem]">Order status</p>
            {result.status && <p className="mt-4 text-[1.6rem] font-medium leading-tight">{result.status}</p>}
            {result.statusUrl && (
              <a href={result.statusUrl} target="_blank" rel="noopener noreferrer" className="btn-outline mt-6">
                View full order details
              </a>
            )}
          </div>
        )}
        {result.kind === "message" && (
          <div className={clsx("text-center text-[1.05rem] italic leading-relaxed", result.tone === "error" ? "text-red-200/90" : "text-ivory/80")}>
            <p>{result.text}</p>
            {result.tone === "info" && (
              <Link href="/contact" className="label link-underline link-underline--rest mt-4 inline-block text-[0.72rem] not-italic text-gold">
                Contact client care
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
