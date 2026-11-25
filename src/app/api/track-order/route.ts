import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/forms";

/**
 * Order lookup. Forwards { orderNumber, email } to ORDER_LOOKUP_ENDPOINT
 * (see .env.example), e.g. a small service backed by the Shopify Admin or
 * Customer Account API. Never reports an order status it did not receive.
 *
 * Expected upstream reply (2xx): { status?: string; statusUrl?: string }
 * 404 from upstream = no order matches that number + email.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  }

  const orderNumber = typeof body.orderNumber === "string" ? body.orderNumber.trim().replace(/^#/, "").slice(0, 40) : "";
  if (!orderNumber || !/^[A-Za-z0-9-]+$/.test(orderNumber) || !isValidEmail(body.email)) {
    return NextResponse.json({ error: "invalid-fields" }, { status: 400 });
  }

  const endpoint = process.env.ORDER_LOOKUP_ENDPOINT;
  if (!endpoint) return NextResponse.json({ error: "not-configured" }, { status: 503 });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ orderNumber, email: body.email.trim() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.status === 404) return NextResponse.json({ error: "not-found" }, { status: 404 });
    if (!res.ok) return NextResponse.json({ error: "upstream-error" }, { status: 502 });

    const data = (await res.json().catch(() => ({}))) as { status?: unknown; statusUrl?: unknown };
    const status = typeof data.status === "string" ? data.status.slice(0, 200) : null;
    // Only pass through absolute http(s) links.
    const statusUrl = typeof data.statusUrl === "string" && /^https?:\/\//.test(data.statusUrl) ? data.statusUrl : null;
    if (!status && !statusUrl) return NextResponse.json({ error: "upstream-error" }, { status: 502 });
    return NextResponse.json({ ok: true, status, statusUrl });
  } catch {
    return NextResponse.json({ error: "upstream-error" }, { status: 502 });
  }
}
