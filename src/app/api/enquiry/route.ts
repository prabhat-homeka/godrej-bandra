import { NextRequest, NextResponse } from "next/server";

const CRM_API_URL = process.env.CRM_API_URL || "https://crm.homeka.in";
const CRM_PROJECT_ID = process.env.CRM_PROJECT_ID;
const CRM_SUBPROJECT_ID = process.env.CRM_SUBPROJECT_ID;

// CRM push is off for this project for now; leads go to the Google Sheet.
// Set PUSH_TO_CRM=true to send them to the CRM as well.
const PUSH_TO_CRM = process.env.PUSH_TO_CRM === "true";

// Google Apps Script web app bound to the leads sheet (see scripts/leads-sheet.gs).
const LEADS_SHEET_WEBHOOK_URL = process.env.LEADS_SHEET_WEBHOOK_URL;
const LEADS_SHEET_SECRET = process.env.LEADS_SHEET_SECRET;

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
    formSource, // which CTA on the site opened the modal (Hero, Navbar, Plans - 3 BHK, etc.)
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
    pincode,
  } = body;

  const leadPayload = {
    full_name: name,
    phone,
    email: email || undefined,
    source: "Google",
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
      form: formType,
      pincode,
    },
  };

  const sheetRow = {
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name,
    phone,
    email: email || "",
    configuration: configuration || "",
    pincode: pincode || "",
    preferred_date: preferredDate || "",
    preferred_time: preferredTime || "",
    form_type: formType || "",
    form_source: formSource || "",
    utm_source: utm_source || "",
    utm_medium: utm_medium || "",
    utm_campaign: utm_campaign || "",
    utm_term: utm_term || "",
    utm_content: utm_content || "",
    keyword: keyword || "",
    device: device || "",
    placement: placement || "",
    gclid: gclid || "",
    adset_id: adset_id || "",
    adset_name: adset_name || "",
    source: source || "",
    sub_source: sub_source || "",
    url: url || "",
  };

  // Always log the lead so it can be recovered from the function logs if the
  // sheet is unreachable.
  console.log("LEAD", JSON.stringify(sheetRow));

  const sheetOk = await pushToSheet(sheetRow);
  if (PUSH_TO_CRM) await pushToCrm(JSON.stringify(leadPayload));

  if (!sheetOk) {
    return NextResponse.json({ ok: false, error: "Could not save lead" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function pushToSheet(row: Record<string, string>): Promise<boolean> {
  if (!LEADS_SHEET_WEBHOOK_URL) {
    console.error("LEADS_SHEET_WEBHOOK_URL is not set; lead not saved to sheet");
    return false;
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(LEADS_SHEET_WEBHOOK_URL, {
        method: "POST",
        // text/plain keeps Apps Script from rejecting the request; the body is still JSON.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ secret: LEADS_SHEET_SECRET, row }),
        redirect: "follow",
      });
      const text = await res.text().catch(() => "");
      if (res.ok && text.includes('"ok":true')) return true;
      console.error(`Sheet push failed (attempt ${attempt}):`, res.status, text.slice(0, 300));
    } catch (err) {
      console.error(`Sheet push error (attempt ${attempt}):`, err);
    }
  }
  return false;
}

async function pushToCrm(crmBody: string): Promise<boolean> {
  let lastErrText = "";

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${CRM_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: crmBody,
      });

      if (res.ok) return true;

      lastErrText = await res.text().catch(() => "");
      console.error(`CRM lead push failed (attempt ${attempt}):`, res.status, lastErrText);

      // Only retry on 500 (e.g. duplicate display_id race condition); don't retry 4xx
      if (res.status < 500) return false;
    } catch (err) {
      lastErrText = String(err);
      console.error(`CRM lead push error (attempt ${attempt}):`, err);
    }
  }
  return false;
}
