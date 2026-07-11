"use client";

import Image from "next/image";
import { useState } from "react";
import { useEnquiry } from "./EnquiryContext";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Project Highlights", href: "#highlights" },
  { label: "Plans & Pricing", href: "#plans" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Connectivity", href: "#connectivity" },
  { label: "About Developer", href: "#about-developer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useEnquiry();

  return (
    <header className="sticky top-0 z-40 bg-cream-light/95 shadow-[0_0_14px_-5px_var(--color-gold)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex shrink-0 items-center gap-2">
          <Image
            src="/img/brandlogo.png"
            alt="Godrej Bandra"
            width={200}
            height={48}
            className="h-8 w-auto object-contain xl:h-9"
            priority
          />
        </a>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-medium text-ink/80 transition hover:text-gold-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <a
            href="tel:+919987546331"
            className="hidden whitespace-nowrap text-sm font-semibold text-ink/80 hover:text-gold-dark 2xl:inline"
          >
            +91 9987546331
          </a>
          <button
            onClick={() => openEnquiry("Navbar - Brochure")}
            className="hidden whitespace-nowrap rounded-xl border border-ink/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold-dark 2xl:inline-block"
          >
            Download Brochure
          </button>
          <button
            onClick={() => openEnquiry("Navbar")}
            className="whitespace-nowrap rounded-xl bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-dark"
          >
            Enquire Now
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          className="shrink-0 xl:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <Image src="/img/hamburger.png" alt="Menu" width={28} height={28} />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-cream-light px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink/80"
              >
                {link.label}
              </a>
            ))}
            <a href="tel:+919987546331" className="text-sm font-semibold text-ink">
              +91 9987546331
            </a>
            <button
              onClick={() => {
                setOpen(false);
                openEnquiry("Navbar - Brochure");
              }}
              className="mt-2 rounded-xl border border-ink/20 py-2 text-xs font-semibold uppercase tracking-wide text-ink"
            >
              Download Brochure
            </button>
            <button
              onClick={() => {
                setOpen(false);
                openEnquiry("Mobile Navbar");
              }}
              className="rounded-xl bg-gold py-2 text-xs font-semibold uppercase tracking-wide text-ink"
            >
              Enquire Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
