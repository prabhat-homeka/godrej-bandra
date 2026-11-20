/**
 * Godrej Bandra Bay – website leads → Google Sheet.
 *
 * Setup (one time):
 * 1. Open the leads sheet → Extensions → Apps Script, paste this file in.
 * 2. Change SECRET below to a long random string.
 * 3. Deploy → New deployment → type "Web app", Execute as "Me",
 *    Who has access "Anyone". Copy the web app URL.
 * 4. In Netlify → Site configuration → Environment variables, set
 *    LEADS_SHEET_WEBHOOK_URL = the web app URL and
 *    LEADS_SHEET_SECRET      = the same SECRET as below. Then redeploy.
 */

const SECRET = "CHANGE-ME";
const SHEET_NAME = "Leads";

// Column order must match the header row in the sheet.
const COLUMNS = [
  "timestamp", "name", "phone", "email", "configuration", "pincode",
  "preferred_date", "preferred_time", "form_type", "form_source",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "keyword", "device", "placement", "gclid", "adset_id", "adset_name",
  "source", "sub_source", "url",
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json_({ ok: false, error: "unauthorized" });

    const row = body.row || {};
    const values = COLUMNS.map(function (key) {
      return row[key] == null ? "" : String(row[key]);
    });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
      const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, values.length);
      // Store everything as plain text so phone numbers like "+91 98…" and
      // pincodes aren't turned into numbers or formulas.
      range.setNumberFormat("@").setValues([values]);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
