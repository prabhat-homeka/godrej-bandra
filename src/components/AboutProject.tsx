"use client";

import Image from "next/image";
import { useEnquiry } from "./EnquiryContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const STATS = [
  { value: "4.25", label: "Acres" },
  { value: "3 & 4", label: "Bed Residences" },
  { value: "40+", label: "Exclusive Amenities" },
];

export default function AboutProject() {
  const { openEnquiry } = useEnquiry();

  return (
    <section id="about-project" className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          black="About"
          gold="Project"
          subtitle="Experience luxury living with exceptional features designed for your comfort."
        />

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative h-96 w-full overflow-hidden lg:h-[520px]">
            <Image
              src="/img/aboutproject-1.webp"
              alt="Godrej Bandra West project"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal style={{ transitionDelay: "150ms" }}>
            <p className="font-display text-2xl italic text-taupe">
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
                onClick={() => openEnquiry("Download Brochure", "About Project")}
                className="rounded-xl border border-gold px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gold-dark transition hover:bg-gold hover:text-ink"
              >
                Click to view Brochure
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
