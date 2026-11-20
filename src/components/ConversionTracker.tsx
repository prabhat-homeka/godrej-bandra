"use client";

import { useEffect } from "react";
import { consumeLeadSubmittedFlag } from "@/lib/tracking";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

// Fires the lead conversion once per real form submission. A direct visit or a
// refresh of /thank-you doesn't carry the flag, so it doesn't count again.
export default function ConversionTracker() {
  useEffect(() => {
    if (!consumeLeadSubmittedFlag()) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_form_submit" });

    if (ADS_ID && ADS_LABEL) {
      // gtag.js may still be loading; this standard shim queues the call on
      // dataLayer and gtag.js replays it once it arrives.
      if (typeof window.gtag !== "function") {
        window.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer!.push(arguments);
        };
      }
      window.gtag("event", "conversion", { send_to: `${ADS_ID}/${ADS_LABEL}` });
    }
  }, []);

  return null;
}
