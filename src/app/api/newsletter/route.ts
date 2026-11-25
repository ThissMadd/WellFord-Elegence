import { NextResponse } from "next/server";
import { forwardToEndpoint, isValidEmail } from "@/lib/forms";

/**
 * Newsletter subscription. Forwards to NEWSLETTER_ENDPOINT (see .env.example).
 * Never reports success unless the upstream provider accepted the address.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  }
  const email = (body as { email?: unknown })?.email;
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const result = await forwardToEndpoint(process.env.NEWSLETTER_ENDPOINT, { email: email.trim() });
  if (result.status === "ok") return NextResponse.json({ ok: true });
  if (result.status === "not-configured") return NextResponse.json({ error: "not-configured" }, { status: 503 });
  return NextResponse.json({ error: "upstream-error" }, { status: 502 });
}
