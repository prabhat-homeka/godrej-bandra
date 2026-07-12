"use client";

import { FormEvent, useState } from "react";
import { useEnquiry, type FormType } from "./EnquiryContext";
import { getTrackingParams } from "@/lib/tracking";

const CONFIG_OPTIONS = ["3 BHK", "4 BHK", "3 BHK Royal", "Not sure yet"];

const FORM_CONFIG: Record<
  FormType,
  { title: string; submitLabel: string; disclaimer: string; showSchedule?: boolean }
> = {
  "Enquire Now": {
    title: "Enquire Now",
    submitLabel: "Send My Enquiry",
    disclaimer: "Handled by one advisor, not a call centre.",
  },
  "Request a Callback": {
    title: "Request a Callback",
    submitLabel: "Request My Callback",
    disclaimer: "One advisor will call you at your chosen time — never a call centre.",
    showSchedule: true,
  },
  "Download Brochure": {
    title: "Request the Brochure",
    submitLabel: "Send Me The Brochure",
    disclaimer: "Sent to your WhatsApp in minutes — handled by one advisor, not a call centre.",
  },
  "View Floor Plan": {
    title: "View Floor Plan",
    submitLabel: "Send Me The Floor Plans",
    disclaimer: "Sent to your WhatsApp in minutes — handled by one advisor, not a call centre.",
  },
  "Check Price": {
    title: "Get Pricing",
    submitLabel: "Send Me The Price List",
    disclaimer: "Sent to your WhatsApp in minutes — handled by one advisor, not a call centre.",
  },
  "Unlock Video": {
    title: "Unlock Video",
    submitLabel: "Unlock Video",
    disclaimer: "Handled by one advisor, not a call centre.",
  },
};

const USPS = [
  {
    label: "Floor Plans",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1.5" />
        <path d="M3 9h10M13 3v18M13 14h8" />
      </>
    ),
  },
  {
    label: "Private Price List",
    highlight: true,
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M9 8h6M9 12h6M9 16h3.5" />
      </>
    ),
  },
  {
    label: "Current Availability",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
];

export default function EnquiryModal() {
  const { isOpen, closeEnquiry, formType, context } = useEnquiry();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const config = FORM_CONFIG[formType];

  // Reset the form's status whenever a new open is requested (possibly with a
  // different formType/context), following React's "adjust state during
  // render" pattern rather than an effect, since this is pure state derived
  // from props changing, not a sync with an external system.
  const openKey = `${formType}::${context}::${isOpen}`;
  const [prevOpenKey, setPrevOpenKey] = useState(openKey);
  if (isOpen && openKey !== prevOpenKey) {
    setPrevOpenKey(openKey);
    setStatus("idle");
  }

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType, source: context, ...getTrackingParams() }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={closeEnquiry}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-cream-light p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={closeEnquiry}
          className="absolute right-4 top-4 text-2xl leading-none text-taupe hover:text-ink"
        >
          &times;
        </button>

        <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
          Godrej Bandra
        </p>
        <h3 className="mt-1 font-serif text-2xl text-ink">{config.title}</h3>

        {status === "success" ? (
          <div className="mt-6 rounded-sm border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
            Thank you! Your enquiry has been received. Our advisor will reach out shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {config.showSchedule ? (
              <p className="text-sm text-taupe">{config.disclaimer}</p>
            ) : (
              <div className="flex items-center justify-between gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3 py-3">
                {USPS.map((usp) => (
                  <div
                    key={usp.label}
                    className={`flex flex-1 flex-col items-center gap-1 text-center text-[11px] leading-tight ${
                      usp.highlight ? "font-semibold text-gold-dark" : "text-ink/70"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="h-5 w-5 text-gold-dark"
                      aria-hidden="true"
                    >
                      {usp.icon}
                    </svg>
                    <span>{usp.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                Name*
              </label>
              <input
                name="name"
                required
                className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                Phone*
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                placeholder="you@example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                  Configuration
                </label>
                <select
                  name="configuration"
                  className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                  defaultValue={CONFIG_OPTIONS[0]}
                >
                  {CONFIG_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                  Pincode
                </label>
                <input
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                  placeholder="400050"
                />
              </div>
            </div>

            {config.showSchedule && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                    Preferred Date
                  </label>
                  <input
                    name="preferredDate"
                    type="date"
                    required
                    className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                    Preferred Time
                  </label>
                  <input
                    name="preferredTime"
                    type="time"
                    required
                    className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                  />
                </div>
              </div>
            )}

            <label className="flex items-start gap-2 text-xs text-taupe">
              <input type="checkbox" required defaultChecked className="mt-0.5" />
              <span>
                I agree to the{" "}
                <a
                  href="https://www.homeka.in/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-gold-dark"
                >
                  Privacy Policy
                </a>{" "}
                and consent to be contacted about this project.
              </span>
            </label>

            {status === "error" && (
              <p className="text-xs text-red-600">
                Something went wrong. Please try again or reach us on WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="gold-shine w-full rounded-xl bg-gold py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-dark disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : config.submitLabel}
            </button>

            <a
              href="https://wa.me/917000106787"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-medium text-gold-dark underline underline-offset-4"
            >
              OR Connect On WhatsApp
            </a>

            {!config.showSchedule && (
              <p className="text-center text-xs text-taupe">{config.disclaimer}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
