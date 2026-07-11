"use client";

import Image from "next/image";
import { useEnquiry } from "./EnquiryContext";

const USPS = ["Private Sea-Facing Homes", "Minutes from Sea Link & BKC"];

export default function Hero() {
  const { openEnquiry } = useEnquiry();

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/banner1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center text-cream-light sm:px-6">
        <p className="font-serif text-3xl text-gold sm:text-4xl" style={{ textShadow: "0 0 10px #000" }}>
          Godrej Bandra
        </p>

        <h1 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          The Finest Sea-Facing Address at Bandra Reclamation
        </h1>

        <p className="mt-6 text-lg text-gold sm:text-xl">
          EOI Offers For Early Birds | Ultra-Luxury 3 &amp; 4 BHK
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {USPS.map((usp) => (
            <span
              key={usp}
              className="flex items-center gap-2 rounded-full border border-gold bg-gold/20 px-4 py-1.5 text-sm text-cream-light"
            >
              <Image src="/img/dot-icon.png" alt="" width={8} height={8} />
              {usp}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://api.whatsapp.com/send?phone=+917000106787&text=Hello%2C%20I%20am%20Interested%20in%20Godrej%27s%20New%20Launch%20Project%20at%20Bandra.%20Kindly%20Send%20the%20Project%20Details."
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shine flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-dark"
          >
            Connect on WhatsApp
          </a>
          <button
            onClick={() => openEnquiry("Hero")}
            className="rounded-xl border border-cream-light/50 px-6 py-3 text-sm font-semibold text-cream-light transition hover:border-gold hover:text-gold"
          >
            Enquire Now
          </button>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-cream-light/80">
          <Image src="/img/location-icon.png" alt="" width={14} height={14} style={{ width: 14, height: "auto" }} />
          Bandra, Mumbai
        </p>
      </div>

      <a
        href="#highlights"
        aria-label="Scroll to highlights"
        className="absolute bottom-6 right-5 z-10 sm:bottom-8"
      >
        <Image src="/img/downcircle.png" alt="" width={40} height={40} />
      </a>
    </section>
  );
}
