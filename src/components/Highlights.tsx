const HIGHLIGHTS = [
  { title: "Iconic", desc: "Premium Hi-Rise Development" },
  { title: "Vistas", desc: "Panoramic Arabian Sea Views" },
  { title: "Privacy", desc: "Designed for Peace, Space & Exclusivity" },
  { title: "Grandeur", desc: "Expansive 3 & 4 BHK Residences" },
  { title: "Opulence", desc: "Timeless Luxury in Every Detail" },
  { title: "Indulgence", desc: "40+ Curated Lifestyle Experiences" },
];

export default function Highlights() {
  return (
    <section id="highlights" className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            Project
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Highlights</h2>
          <p className="mt-3 text-taupe">
            Experience luxury living with exceptional features designed for your comfort.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.title}
              className="group border border-ink/10 bg-white p-8 transition hover:border-gold"
            >
              <span className="font-display text-4xl text-gold/40 transition group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl uppercase tracking-wide text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-taupe">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
