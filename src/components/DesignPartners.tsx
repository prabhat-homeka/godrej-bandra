import Image from "next/image";
import Reveal from "./Reveal";

export default function DesignPartners() {
  return (
    <section id="partners" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            Design
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Partners</h2>
        </Reveal>

        <Reveal className="mt-12" style={{ transitionDelay: "100ms" }}>
          <div className="hover-lift flex flex-col items-center justify-between gap-6 rounded-xl bg-white p-8 shadow-[0_0_14px_-8px_var(--color-gold)] sm:flex-row">
            <p className="font-serif text-xl text-ink">Mandviwala Qutub &amp; Associates</p>
            <Image
              src="/img/design/dp1.webp"
              alt="Mandviwala Qutub & Associates"
              width={160}
              height={80}
              className="h-14 w-auto object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
