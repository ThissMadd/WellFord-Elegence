import { NextResponse } from "next/server";
import { forwardToEndpoint, isValidEmail } from "@/lib/forms";

/** Contact form. Forwards to CONTACT_ENDPOINT (see .env.example). */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  }
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";
  if (!name || !message || !isValidEmail(body.email)) {
    return NextResponse.json({ error: "invalid-fields" }, { status: 400 });
  }

  const result = await forwardToEndpoint(process.env.CONTACT_ENDPOINT, { name, email: body.email.trim(), message });
  if (result.status === "ok") return NextResponse.json({ ok: true });
  if (result.status === "not-configured") return NextResponse.json({ error: "not-configured" }, { status: 503 });
  return NextResponse.json({ error: "upstream-error" }, { status: 502 });
}
