"use client";

const STORAGE_KEY = "gb_tracking_params";

const URL_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "device",
  "keyword",
  "placement",
] as const;

export type TrackingParams = Partial<Record<(typeof URL_PARAM_KEYS)[number], string>> & {
  gclid?: string;
  url?: string;
};

// Reads Google Ads / UTM tracking params off the landing URL and persists them
// for the rest of the session, so they survive the visitor browsing to other
// sections before they actually submit the enquiry form.
export function captureTrackingParams(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const captured: TrackingParams = {};

  for (const key of URL_PARAM_KEYS) {
    const value = params.get(key);
    if (value) captured[key] = value;
  }
  const gclid = params.get("gclid");
  if (gclid) captured.gclid = gclid;

  if (Object.keys(captured).length === 0) return;

  captured.url = window.location.href;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — safe to skip
  }
}

export function getTrackingParams(): TrackingParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TrackingParams;
  } catch {
    // ignore parse/storage errors
  }
  return { url: window.location.href };
}
