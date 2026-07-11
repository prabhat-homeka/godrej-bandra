import Image from "next/image";

const CATEGORIES = [
  {
    title: "Schools",
    icon: "/img/amenities-icon/school.png",
    range: "4-10 min",
    items: [
      "Narsee School – 4 Mins",
      "St. Andrew's High School – 6 Mins",
      "Dhirubhai Ambani International School – 8 Mins",
      "Arya Vidya Mandir – 10 Mins",
    ],
  },
  {
    title: "Healthcare",
    icon: "/img/amenities-icon/hospital.png",
    range: "6-10 min",
    items: [
      "Lilavati Hospital – 6 Mins",
      "Holy Family Hospital – 8 Mins",
      "Breach Candy Hospital – 10 Mins",
      "Bhabha Hospital – 10 Mins",
    ],
  },
  {
    title: "Transits",
    icon: "/img/amenities-icon/transit.png",
    range: "4-25 min",
    items: [
      "Bandra Railway Station – 4 Mins",
      "Bandra-Worli Sea Link – 5 Mins",
      "BKC – 10 Mins",
      "Chhatrapati Shivaji Maharaj International Airport – 25 Mins",
    ],
  },
  {
    title: "Lifestyle & Entertainment",
    icon: "/img/amenities-icon/lifestyle.png",
    range: "3-7 min",
    items: [
      "Linking Road – 3 Mins",
      "Hill Road – 4 Mins",
      "Bandstand Promenade – 7 Mins",
      "Mount Mary Church – 5 Mins",
    ],
  },
];

export default function Connectivity() {
  return (
    <section id="connectivity" className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            Connectivity
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Seamless to major landmarks
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="border border-ink/10 bg-white p-6">
              <div className="flex items-center justify-between">
                <Image src={cat.icon} alt="" width={32} height={32} />
                <span className="border border-gold/40 px-2 py-0.5 text-xs font-semibold text-gold-dark">
                  {cat.range}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg text-ink">{cat.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-taupe">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
