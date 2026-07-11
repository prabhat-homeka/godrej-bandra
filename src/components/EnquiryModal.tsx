"use client";

import { FormEvent, useState } from "react";
import { useEnquiry } from "./EnquiryContext";
import { getTrackingParams } from "@/lib/tracking";

const CONFIG_OPTIONS = ["3 BHK", "4 BHK", "3 BHK Royal", "Not sure yet"];

export default function EnquiryModal() {
  const { isOpen, closeEnquiry, source } = useEnquiry();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
        body: JSON.stringify({ ...data, source, ...getTrackingParams() }),
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
        <h3 className="mt-1 font-serif text-2xl text-ink">Request a Callback</h3>
        <p className="mt-1 text-sm text-taupe">
          Handled by one advisor, not a call centre.
        </p>

        {status === "success" ? (
          <div className="mt-6 rounded-sm border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
            Thank you! Your enquiry has been received. Our advisor will reach out shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-taupe">
                  Preferred Date
                </label>
                <input
                  name="preferredDate"
                  type="date"
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
                  className="w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-taupe">
              <input type="checkbox" required className="mt-0.5" />
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
              {status === "submitting" ? "Sending..." : "Send My Enquiry"}
            </button>

            <a
              href="https://wa.me/917000106787"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-medium text-gold-dark underline underline-offset-4"
            >
              OR Connect On WhatsApp
            </a>
          </form>
        )}
      </div>
    </div>
  );
}
