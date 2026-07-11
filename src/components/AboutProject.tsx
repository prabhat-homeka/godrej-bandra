"use client";

import Image from "next/image";
import { useEnquiry } from "./EnquiryContext";

const STATS = [
  { value: "4.25", label: "Acres" },
  { value: "3 & 4", label: "Bed Residences" },
  { value: "40+", label: "Exclusive Amenities" },
];

export default function AboutProject() {
  const { openEnquiry } = useEnquiry();

  return (
    <section id="about-project" className="bg-cream-light py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative h-96 w-full overflow-hidden lg:h-[520px]">
          <Image
            src="/img/aboutproject-1.webp"
            alt="Godrej Bandra West project"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            About
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Project</h2>
          <p className="mt-2 font-display text-2xl italic text-taupe">
            An unparalleled life in Mumbai&apos;s incomparable address
          </p>

          <p className="mt-6 leading-relaxed text-taupe">
            Godrej Bandra West is an upcoming luxury residential project by Godrej
            Properties, offering premium 3 &amp; 4 BHK residences across 4.25 acres in
            the heart of Bandra West, Mumbai, designed for modern urban living.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-y border-ink/10 py-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl text-gold-dark">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-taupe">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-taupe">
                Starting price (per sq.ft)
              </p>
              <p className="font-serif text-2xl text-ink">₹ On Request</p>
            </div>
            <button
              onClick={() => openEnquiry("About Project - Brochure")}
              className="border border-gold px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gold-dark transition hover:bg-gold hover:text-ink"
            >
              Click to view Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
