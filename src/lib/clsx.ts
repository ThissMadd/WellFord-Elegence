type ClassValue = string | false | null | undefined;

/** Minimal className joiner. */
export default function clsx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
