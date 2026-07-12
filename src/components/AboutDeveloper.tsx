import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const STATS = [
  { icon: "/img/amenities-icon/area.png", value: "129+", label: "Years legacy of quality & trust" },
  { icon: "/img/amenities-icon/family.png", value: "#1", label: "Real Estate For 3 Consecutive FY*" },
  { icon: "/img/amenities-icon/timeline2.png", value: "21.7+", label: "Million square meters Delivered" },
  { icon: "/img/amenities-icon/home.png", value: "1M+", label: "Happy Family Choose A Godrej Homes" },
];

const CERTS = ["IGBC Certified", "ISO Certified", "300+ Projects"];

export default function AboutDeveloper() {
  return (
    <section id="about-developer" className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading black="About Godrej Properties" />

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="hover-lift flex justify-center rounded-[20px] bg-white px-12 py-10 shadow-[0_0_14px_-5px_var(--color-gold)]">
              <Image
                src="/img/brandlogoabout.png"
                alt="Godrej Properties"
                width={320}
                height={180}
                className="h-auto w-full max-w-xs object-contain"
              />
            </div>
          </Reveal>

          <Reveal style={{ transitionDelay: "150ms" }}>
            <p className="leading-relaxed text-taupe">
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
                  className="rounded-full bg-gold/20 px-5 py-2 text-sm text-ink"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="hover-lift rounded-xl bg-white p-5 text-center shadow-[0_0_14px_-5px_var(--color-gold)]">
                <span className="mx-auto flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f4f1e8]">
                  <Image src={stat.icon} alt="" width={30} height={30} />
                </span>
                <p className="mt-2 font-serif text-4xl text-ink">{stat.value}</p>
                <p className="mt-1 text-sm text-taupe">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
