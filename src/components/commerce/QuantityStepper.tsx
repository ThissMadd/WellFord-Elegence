"use client";

import { Minus, Plus } from "lucide-react";
import clsx from "@/lib/clsx";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "sm" | "md";
};

export function QuantityStepper({ value, onChange, min = 1, max = 10, label, size = "md" }: Props) {
  const box = size === "sm" ? "h-9 w-9 max-md:h-11 max-md:w-11" : "h-12 w-12";
  return (
    <div role="group" aria-label={label} className="inline-flex items-stretch border border-ivory/25">
      <button
        type="button"
        className={clsx(box, "grid place-items-center text-ivory/80 transition-colors hover:text-gold disabled:opacity-30")}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={1.3} />
      </button>
      <output
        aria-live="polite"
        aria-label="Quantity"
        className={clsx(box, "grid place-items-center border-x border-ivory/15 text-lg tabular-nums")}
      >
        {value}
      </output>
      <button
        type="button"
        className={clsx(box, "grid place-items-center text-ivory/80 transition-colors hover:text-gold disabled:opacity-30")}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={1.3} />
      </button>
    </div>
  );
}
