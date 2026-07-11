const PARTNERS = [
  { role: "Architectural Consultant", name: "Mandviwala Qutub & Associates" },
  { role: "Interior Consultant", name: "To be announced" },
  { role: "Landscape Consultant", name: "To be announced" },
  { role: "Facade Consultant", name: "To be announced" },
  { role: "Facade Lighting Consultant", name: "To be announced" },
];

export default function DesignPartners() {
  return (
    <section id="partners" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            Design
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Partners</h2>
          <p className="mt-3 text-taupe">Our design partners.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNERS.map((partner) => (
            <div key={partner.role} className="bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">
                {partner.role}
              </p>
              <p className="mt-2 font-serif text-lg text-ink">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
