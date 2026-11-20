import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConversionTracker from "@/components/ConversionTracker";

export const metadata: Metadata = {
  title: "Thank You | Godrej Bandra Bay",
  description: "Your enquiry for Godrej Bandra Bay has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-cream px-4 py-16 text-center">
      <ConversionTracker />

      <Image
        src="/img/brandlogo.png"
        alt="Godrej Properties | Bandra Bay"
        width={900}
        height={204}
        className="h-12 w-auto object-contain sm:h-14"
        priority
      />

      <div className="mt-10 w-full max-w-xl rounded-xl bg-white p-8 shadow-[0_0_14px_-8px_var(--color-gold)] sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-7 w-7 text-gold-dark"
            aria-hidden="true"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>

        <h1 className="mt-6 font-serif text-3xl text-ink sm:text-4xl">Thank You!</h1>
        <div className="mx-auto mt-4 h-[3px] w-20 bg-gold" />

        <p className="mt-6 leading-relaxed text-taupe">
          Your enquiry for <span className="text-ink">Godrej Bandra Bay</span> has been
          received. Our advisor will reach out to you shortly with the floor plans, price
          list and current availability.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://api.whatsapp.com/send?phone=+919702978506&text=Hello%2C%20I%20just%20enquired%20about%20Godrej%20Bandra%20Bay%2C%20Bandra%20West.%20Kindly%20Send%20the%20Project%20Details."
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shine w-full rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-dark sm:w-auto"
          >
            Connect on WhatsApp
          </a>
          <a
            href="tel:+919702978506"
            className="w-full rounded-xl border border-gold px-6 py-3 text-sm font-semibold text-gold-dark transition hover:bg-gold hover:text-ink sm:w-auto"
          >
            Call +91 9702978506
          </a>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-gold-dark underline underline-offset-4"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
