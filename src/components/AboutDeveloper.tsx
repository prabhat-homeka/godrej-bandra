import Image from "next/image";

const STATS = [
  { value: "120+", label: "Years legacy of quality & trust" },
  { value: "3x", label: "Real Estate Company of the Year (FY)" },
  { value: "300+", label: "Million sq. meters delivered" },
  { value: "250+", label: "Awards & happy families" },
];

const CERTS = ["IGBC Certified", "ISO Certified", "300+ Projects"];

export default function AboutDeveloper() {
  return (
    <section id="about-developer" className="bg-ink py-20 text-cream-light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            About Godrej Properties
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            Who is Godrej Developers
          </h2>

          <p className="mt-6 leading-relaxed text-cream-light/70">
            Godrej Properties, part of the 120+ year-old Group, is one of India&apos;s
            leading real estate developers, known for blending trust, innovation, and
            sustainability. Since 1990, the brand has delivered landmark residential
            and commercial projects across major cities, emphasising superior quality
            and eco-friendly practices. With over 250+ awards, including &lsquo;Real
            Estate Company of the Year,&rsquo; and a strong commitment to green
            development (with IGBC-certified projects), India&apos;s No. 1 Luxury
            Developer continues to shape India&apos;s skyline, offering homes that
            reflect excellence, innovation, and timeless legacy.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {CERTS.map((c) => (
              <span
                key={c}
                className="border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="border border-gold/20 p-6">
              <p className="font-serif text-3xl text-gold">{stat.value}</p>
              <p className="mt-2 text-sm text-cream-light/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4 border-t border-gold/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/img/rera.png" alt="RERA" width={40} height={40} />
            <a
              href="http://maharera.mahaonline.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold underline underline-offset-4"
            >
              maharera.mahaonline.gov.in
            </a>
            <span className="text-sm text-cream-light/60">under registered projects</span>
          </div>
          <p className="text-sm text-cream-light/60">MahaRERA No. P51900034316</p>
        </div>
      </div>
    </section>
  );
}
