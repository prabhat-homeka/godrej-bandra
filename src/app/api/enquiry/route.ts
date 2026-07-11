import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  // TODO: wire this up to your CRM / lead-notification pipeline (email, WhatsApp API, sheet, etc.)
  console.log("New enquiry:", body);

  return NextResponse.json({ ok: true });
}
