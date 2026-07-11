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
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream-light/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <Image
            src="/img/brandlogo.png"
            alt="Godrej Bandra"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition hover:text-gold-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+919987546331"
            className="text-sm font-semibold text-ink/80 hover:text-gold-dark"
          >
            +91 9987546331
          </a>
          <button
            onClick={() => openEnquiry("Navbar - Brochure")}
            className="border border-ink/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold-dark"
          >
            Download Brochure
          </button>
          <button
            onClick={() => openEnquiry("Navbar")}
            className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-dark"
          >
            Enquire Now
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <Image src="/img/hamburger.png" alt="Menu" width={28} height={28} />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-cream-light px-4 py-4 lg:hidden">
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
                openEnquiry("Mobile Navbar");
              }}
              className="mt-2 bg-gold py-2 text-xs font-semibold uppercase tracking-wide text-ink"
            >
              Enquire Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
