"use client";

import { useId, useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/forms";
import clsx from "@/lib/clsx";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = { kind: "idle" | "sending" | "success" | "info" | "error"; message?: string };

const field =
  "mt-2 w-full border bg-black/35 px-4 py-3.5 text-[1.12rem] text-ivory outline-none transition-colors duration-500 placeholder:italic placeholder:text-ivory/45 focus:border-gold focus-visible:outline-none";

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setValues({ name: "", email: "", message: "" });
        setStatus({ kind: "success", message: "Thank you. Your message has been sent." });
      } else if (data.error === "not-configured") {
        setStatus({ kind: "info", message: "Online messages are not open just yet. Please check back soon." });
      } else {
        setStatus({ kind: "error", message: "We couldn’t send your message just now. Please try again shortly." });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn’t send your message just now. Please try again shortly." });
    }
  }

  const fieldProps = (k: keyof Errors) => ({
    id: `${id}-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined,
    className: clsx(field, errors[k] ? "border-red-300/70" : "border-ivory/30"),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="label text-[0.72rem] text-ivory/75">
            Name
          </label>
          <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps("name")} />
          {errors.name && <p id={`${id}-name-err`} className="mt-2 text-sm italic text-red-200/90">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label text-[0.72rem] text-ivory/75">
            Email
          </label>
          <input type="email" autoComplete="email" placeholder="Your email address" {...fieldProps("email")} />
          {errors.email && <p id={`${id}-email-err`} className="mt-2 text-sm italic text-red-200/90">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="label text-[0.72rem] text-ivory/75">
          Message
        </label>
        <textarea rows={6} placeholder="How may we help?" {...fieldProps("message")} className={clsx(fieldProps("message").className, "resize-y")} />
        {errors.message && <p id={`${id}-message-err`} className="mt-2 text-sm italic text-red-200/90">{errors.message}</p>}
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between max-sm:flex-col-reverse max-sm:items-stretch max-sm:text-center">
        <p
          role="status"
          aria-live="polite"
          className={clsx(
            "min-h-[1.5em] text-[1rem] italic",
            status.kind === "success" && "text-gold",
            status.kind === "error" && "text-red-200/90",
            status.kind === "info" && "text-ivory/80",
          )}
        >
          {status.message}
        </p>
        <button type="submit" className="btn-gold h-13 px-12 max-sm:w-full" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
