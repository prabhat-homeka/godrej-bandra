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
    formType, // which popup variant was shown (Enquire Now, Request a Callback, View Floor Plan, etc.)
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
    adset_id,
    adset_name,
    source, // Google Ads campaign source
    sub_source, // Google Ads sub-source (e.g., Demand Gen)
  } = body;

  const leadPayload = {
    full_name: name,
    phone,
    email: email || undefined,
    source: source || "Google",
    sub_source: sub_source || "Demand Gen",
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
      form_type: formType,
      form_source: formSource,
      configuration,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      google_ads_adset_id: adset_id,
      google_ads_adset_name: adset_name,
    },
  };

  const crmBody = JSON.stringify(leadPayload);
  let lastErrText = "";

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${CRM_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: crmBody,
      });

      if (res.ok) break;

      lastErrText = await res.text().catch(() => "");
      console.error(`CRM lead push failed (attempt ${attempt}):`, res.status, lastErrText);

      // Only retry on 500 (e.g. duplicate display_id race condition); don't retry 4xx
      if (res.status < 500 || attempt === 3) {
        return NextResponse.json({ ok: false, error: "Could not reach CRM" }, { status: 502 });
      }
    } catch (err) {
      lastErrText = String(err);
      console.error(`CRM lead push error (attempt ${attempt}):`, err);
      if (attempt === 3) {
        return NextResponse.json({ ok: false, error: "Could not reach CRM" }, { status: 502 });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
