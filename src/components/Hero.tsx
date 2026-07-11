"use client";

import Image from "next/image";
import { useEnquiry } from "./EnquiryContext";

const FEATURES = [
  "Private Sea-Facing Homes",
  "Minutes from Sea Link & BKC",
  "OC Received",
];

export default function Hero() {
  const { openEnquiry } = useEnquiry();

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink text-cream-light"
    >
      <Image
        src="/img/aboutproject-1.webp"
        alt="Godrej Bandra West - sea facing residences"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
          — Bandra —
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          The Finest Sea-Facing Address at Bandra Reclamation
        </h1>
        <p className="mt-4 max-w-xl font-display text-2xl italic text-gold">
          Racecourse Views. Nothing in Between.
        </p>

        <div className="mt-8 inline-flex flex-wrap items-center gap-3 border border-gold/40 bg-black/30 px-5 py-3 backdrop-blur">
          <span className="text-xs font-semibold uppercase tracking-wide text-gold">
            EOI Offers For Early Birds
          </span>
          <span className="hidden h-4 w-px bg-gold/40 sm:block" />
          <span className="text-sm">Ultra-Luxury 3 &amp; 4 BHK</span>
          <span className="hidden h-4 w-px bg-gold/40 sm:block" />
          <span className="text-sm">
            Starts <span className="font-semibold text-gold">₹30.06 Cr*</span>
          </span>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cream-light/90">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => openEnquiry("Hero")}
            className="bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-dark"
          >
            Enquire Now
          </button>
          <a
            href="https://wa.me/919987546331"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cream-light/40 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-cream-light transition hover:border-gold hover:text-gold"
          >
            Connect on WhatsApp
          </a>
        </div>

        <p className="mt-10 flex items-center gap-2 text-xs uppercase tracking-wide text-cream-light/70">
          <Image
            src="/img/location-icon.png"
            alt=""
            width={14}
            height={14}
            style={{ width: 14, height: "auto" }}
          />
          Bandra, Mumbai
        </p>
      </div>
    </section>
  );
}
