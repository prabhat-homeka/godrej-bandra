"use client";

import Image from "next/image";
import { useState } from "react";
import { useEnquiry } from "./EnquiryContext";

type Plan = {
  type: string;
  carpetArea: string;
  blurb: string;
  image: string;
};

const TOWERS: Record<string, Plan[]> = {
  "Tower 1": [
    {
      type: "3 BHK",
      carpetArea: "2,307 sq.ft.",
      blurb: "Enquire for exclusive launch offers.",
      image: "/img/floorplans/floorplan2.webp",
    },
    {
      type: "4 BHK",
      carpetArea: "2,200 – 2,600 sq.ft.",
      blurb: "Get the complete cost sheet instantly.",
      image: "/img/floorplans/floorplan3.webp",
    },
  ],
  "Tower 2": [
    {
      type: "3 BHK Royal",
      carpetArea: "1,232 sq.ft.",
      blurb: "Your gateway to Bandra luxury.",
      image: "/img/floorplans/floorplan2.webp",
    },
  ],
};

export default function PlansPricing() {
  const towers = Object.keys(TOWERS);
  const [active, setActive] = useState(towers[0]);
  const { openEnquiry } = useEnquiry();

  return (
    <section id="plans" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
              Plans &amp;
            </p>
            <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Pricing</h2>
            <p className="mt-3 text-taupe">
              Explore our diverse layouts and find the perfect fit.
            </p>
          </div>

          <div className="flex gap-2">
            {towers.map((tower) => (
              <button
                key={tower}
                onClick={() => setActive(tower)}
                className={`border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                  active === tower
                    ? "border-gold bg-gold text-ink"
                    : "border-ink/20 text-ink/70 hover:border-gold hover:text-gold-dark"
                }`}
              >
                {tower}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {TOWERS[active].map((plan) => (
            <div key={plan.type} className="flex flex-col bg-white shadow-sm">
              <div className="relative h-64 w-full bg-cream">
                <Image
                  src={plan.image}
                  alt={`${plan.type} floor plan`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-6"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-ink/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-taupe">
                  Type
                </p>
                <h3 className="mt-1 font-serif text-2xl text-ink">{plan.type}</h3>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-taupe">
                  Carpet Area
                </p>
                <p className="mt-1 text-lg text-ink">{plan.carpetArea}</p>

                <p className="mt-4 text-sm text-taupe">{plan.blurb}</p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-taupe">
                    Starting
                  </p>
                  <p className="font-serif text-xl text-gold-dark">₹ Get Pricing</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => openEnquiry(`Plans - ${plan.type}`)}
                    className="flex-1 bg-gold py-2.5 text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-dark"
                  >
                    Explore Exclusive Pricing
                  </button>
                  <button
                    onClick={() => openEnquiry(`Floor Plan - ${plan.type}`)}
                    className="flex-1 border border-ink/20 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold-dark"
                  >
                    View Floor Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => openEnquiry("Plans & Pricing")}
          className="mx-auto mt-12 block border border-gold px-8 py-3 text-sm font-semibold uppercase tracking-wide text-gold-dark transition hover:bg-gold hover:text-ink"
        >
          Request a Callback
        </button>
      </div>
    </section>
  );
}
