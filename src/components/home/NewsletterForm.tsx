"use client";

import { useId, useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/forms";
import clsx from "@/lib/clsx";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "info"; message: string }
  | { kind: "success"; message: string };

const MESSAGES: Record<string, string> = {
  "invalid-email": "Please enter a valid email address.",
  "not-configured": "Sign-up for The Wellford Letter is not open just yet. Please check back soon.",
  "upstream-error": "We couldn’t complete your subscription just now. Please try again shortly.",
};

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus({ kind: "error", message: MESSAGES["invalid-email"] });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setEmail("");
        setStatus({ kind: "success", message: "Thank you. Your address has been added to The Wellford Letter." });
      } else if (data.error === "not-configured") {
        setStatus({ kind: "info", message: MESSAGES["not-configured"] });
      } else {
        setStatus({ kind: "error", message: MESSAGES[data.error ?? ""] ?? MESSAGES["upstream-error"] });
      }
    } catch {
      setStatus({ kind: "error", message: MESSAGES["upstream-error"] });
    }
  }

  const invalid = status.kind === "error" && status.message === MESSAGES["invalid-email"];

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto w-full max-w-[640px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          enterKeyHint="send"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          aria-invalid={invalid || undefined}
          aria-describedby={`${id}-status`}
          className={clsx(
            "h-14 w-full min-w-0 shrink-0 border sm:w-auto sm:flex-1 bg-black/45 px-5 text-[1.12rem] text-ivory outline-none backdrop-blur-[2px] transition-colors duration-500 placeholder:italic placeholder:tracking-[0.04em] placeholder:text-ivory/70 focus:border-gold focus-visible:outline-none",
            invalid ? "border-red-300/80" : "border-ivory/70",
          )}
        />
        <button type="submit" disabled={status.kind === "sending"} className="btn-gold h-14 px-10 sm:min-w-[210px] max-sm:w-full">
          {status.kind === "sending" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={clsx(
          "mt-4 min-h-[1.5em] text-center text-[1rem] italic",
          status.kind === "error" && "text-red-200/90",
          status.kind === "info" && "text-ivory/80",
          status.kind === "success" && "text-gold",
        )}
      >
        {"message" in status ? status.message : ""}
      </p>
    </form>
  );
}
