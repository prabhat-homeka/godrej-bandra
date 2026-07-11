import Image from "next/image";

const QUICK_LINKS = [
  { label: "Highlights", href: "#highlights" },
  { label: "Plans & Pricing", href: "#plans" },
  { label: "About Project", href: "#about-project" },
  { label: "Partners", href: "#partners" },
  { label: "Gallery", href: "#gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Connectivity", href: "#connectivity" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-cream-light/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <Image
              src="/img/brandlogo.png"
              alt="Godrej Bandra"
              width={140}
              height={42}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-4 text-sm">
              Godrej Bandra – Bandra West, Mumbai
            </p>
            <p className="mt-2 text-sm">
              Call us on{" "}
              <a href="tel:+917000106787" className="text-gold hover:underline">
                +91 7000106787
              </a>
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              Overview
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              Contact
            </p>
            <a
              href="https://wa.me/917000106787"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm hover:text-gold"
            >
              <Image src="/img/whatapps-ico.png" alt="" width={18} height={18} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-cream-light/10 pt-6 text-xs leading-relaxed text-cream-light/40">
          Disclaimer: The information provided on this website is intended exclusively
          for informational purposes and should not be construed as an offer of
          services. This site is managed by a RERA authorized affiliate partner / real
          estate agent (for multiple real estate developers) namely Homeka Club Private
          Limited registered under MahaRERA ID number A041172502869. The
          pricing information presented on this website is subject to alteration
          without advance notification, and the assurance of property availability
          cannot be guaranteed. The images showcased on this website are for
          representational purposes only and may not accurately reflect the actual
          properties. We may share your data with Maharashtra Real Estate Regulatory
          Authority (RERA) registered Developers for further processing as necessary.
          Additionally, we may send updates and information to the mobile number or
          email address registered with us. All rights reserved. The content, design,
          and information on this website are protected by copyright and other
          intellectual property rights. Any unauthorized use or reproduction of the
          content may violate applicable laws. For accurate and up-to-date information
          regarding services, pricing, availability, and any other details, it is
          recommended to contact us directly through the provided contact information
          on this website.
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-cream-light/10 pt-6 text-xs text-cream-light/40 sm:flex-row sm:items-center">
          <p>Copyright © {new Date().getFullYear()} Homeka Club Private Limited.</p>
          <a
            href="https://www.homeka.in/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
          >
            Privacy Policy And Terms And Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
