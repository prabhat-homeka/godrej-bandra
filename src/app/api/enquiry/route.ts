import { NextRequest, NextResponse } from "next/server";

const CRM_API_URL = process.env.CRM_API_URL || "https://crm.homeka.in";
const CRM_PROJECT_ID = process.env.CRM_PROJECT_ID;
const CRM_SUBPROJECT_ID = process.env.CRM_SUBPROJECT_ID;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const {
    name,
    phone,
    email,
    configuration,
    preferredDate,
    preferredTime,
    source: formSource, // which CTA on the site opened the modal (Hero, Navbar, Plans - 3 BHK, etc.)
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    device,
    keyword,
    placement,
    gclid,
    url,
  } = body;

  const leadPayload = {
    full_name: name,
    phone,
    email: email || undefined,
    source: "Google",
    sub_source: "Demand Gen",
    project_id: CRM_PROJECT_ID || undefined,
    subproject_id: CRM_SUBPROJECT_ID || undefined,
    // Top-level Google/UTM fields — the CRM lifts these into custom_fields itself.
    glid: gclid || undefined,
    utm_source: utm_source || "google",
    utm_medium: utm_medium || "cpc",
    utm_campaign,
    utm_term,
    utm_content,
    device,
    keyword,
    placement,
    url,
    custom_fields: {
      website: "godrej-bandra.com",
      form_source: formSource,
      configuration,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
    },
  };

  try {
    const res = await fetch(`${CRM_API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("CRM lead push failed:", res.status, errText);
      return NextResponse.json({ ok: false, error: "Could not reach CRM" }, { status: 502 });
    }
  } catch (err) {
    console.error("CRM lead push error:", err);
    return NextResponse.json({ ok: false, error: "Could not reach CRM" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
