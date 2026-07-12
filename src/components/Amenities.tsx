import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

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
        <SectionHeading
          black="World-Class"
          gold="Amenities"
          subtitle="Experience a lifestyle of comfort and convenience."
        />

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-7">
          {AMENITIES.map((a, i) => (
            <Reveal key={a.name} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="hover-lift flex flex-col items-center gap-3 border border-ink/10 bg-white px-4 py-8 text-center transition hover:border-gold">
                <Image src={a.icon} alt="" width={40} height={40} />
                <p className="text-sm font-medium text-ink">{a.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
