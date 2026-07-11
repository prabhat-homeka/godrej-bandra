import Image from "next/image";

const AMENITIES = [
  { name: "Infinity Pool", icon: "/img/amenities-icon/swimming.png" },
  { name: "Cafe", icon: "/img/amenities-icon/cafe.png" },
  { name: "Rooftop Garden", icon: "/img/amenities-icon/garden.png" },
  { name: "Luxury Spa", icon: "/img/amenities-icon/spa.png" },
  { name: "Kids Play Area", icon: "/img/amenities-icon/playing.png" },
  { name: "Badminton Court", icon: "/img/amenities-icon/badminton.png" },
  { name: "Gym", icon: "/img/amenities-icon/exercise.png" },
];

export default function Amenities() {
  return (
    <section id="amenities" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            World-Class
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Amenities</h2>
          <p className="mt-3 text-taupe">
            Experience a lifestyle of comfort and convenience at the Sky Lounge.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-7">
          {AMENITIES.map((a) => (
            <div
              key={a.name}
              className="flex flex-col items-center gap-3 border border-ink/10 bg-white px-4 py-8 text-center transition hover:border-gold"
            >
              <Image src={a.icon} alt="" width={40} height={40} />
              <p className="text-sm font-medium text-ink">{a.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
