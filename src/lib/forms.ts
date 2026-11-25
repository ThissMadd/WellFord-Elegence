/** Shared validation for client forms and API routes. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value.trim());
}

/**
 * POSTs JSON to a configured upstream endpoint. Returns a status the UI can
 * explain honestly: "ok" only when the upstream accepted the request.
 */
export async function forwardToEndpoint(
  endpoint: string | undefined,
  payload: unknown,
): Promise<{ status: "ok" | "not-configured" | "upstream-error" }> {
  if (!endpoint) return { status: "not-configured" };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    return { status: res.ok ? "ok" : "upstream-error" };
  } catch {
    return { status: "upstream-error" };
  }
}
