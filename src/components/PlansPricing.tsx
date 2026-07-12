"use client";

import Image from "next/image";
import { useEnquiry } from "./EnquiryContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Plan = {
  type: string;
  carpetArea: string;
  blurb: string;
  cta: string;
  image: string;
};

const PLANS: Plan[] = [
  {
    type: "3 BHK",
    carpetArea: "2,307 sq.ft.",
    blurb: "Enquire for exclusive launch offers.",
    cta: "Your Gateway to Bandra Luxury",
    image: "/img/floorplans/floorplan2.webp",
  },
  {
    type: "4 BHK",
    carpetArea: "2,200 – 2,600 sq.ft.",
    blurb: "Get the complete cost sheet instantly.",
    cta: "Explore Exclusive Pricing",
    image: "/img/floorplans/floorplan3.webp",
  },
];

export default function PlansPricing() {
  const { openEnquiry } = useEnquiry();

  return (
    <section id="plans" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          black="Plans &"
          gold="Pricing"
          subtitle="Choose from our designed floor plans."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.type} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="hover-lift overflow-hidden rounded-xl bg-white shadow-[0_0_14px_-8px_var(--color-gold)]">
                <button
                  onClick={() => openEnquiry(`Floor Plan - ${plan.type}`)}
                  className="group relative block h-64 w-full bg-cream text-left"
                >
                  <Image
                    src={plan.image}
                    alt={`${plan.type} floor plan`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-6"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-4 py-2 text-xs text-cream-light opacity-0 transition group-hover:opacity-100">
                    {plan.cta}
                    <span className="flex items-center gap-1">
                      <Image src="/img/floorplans/expand.png" alt="" width={14} height={14} />
                      View Floor Plan
                    </span>
                  </span>
                </button>

                <div className="p-5">
                  <p className="font-serif text-2xl text-ink">{plan.type}</p>

                  <div className="mt-2 flex items-center justify-between border-b border-[#f5edd4] py-2.5 text-sm text-taupe">
                    <span>Carpet Area</span>
                    <span className="text-ink">{plan.carpetArea}</span>
                  </div>
                  <p className="mt-2 text-center text-xs italic text-taupe">{plan.blurb}</p>

                  <button
                    onClick={() => openEnquiry(`Plans - ${plan.type}`)}
                    className="gold-shine mt-4 w-full rounded-xl bg-gold py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-dark"
                  >
                    Starting ₹ Get Pricing
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <button
          onClick={() => openEnquiry("Plans & Pricing")}
          className="mx-auto mt-12 block rounded-xl border border-gold px-8 py-3 text-sm font-semibold uppercase tracking-wide text-gold-dark transition hover:bg-gold hover:text-ink"
        >
          Request a Callback
        </button>
      </div>
    </section>
  );
}
