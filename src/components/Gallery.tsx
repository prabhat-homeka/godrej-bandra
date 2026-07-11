import Image from "next/image";
import Reveal from "./Reveal";

const GALLERY_IMAGES = [
  "/img/gallery/gal01.webp",
  "/img/gallery/gal02.webp",
  "/img/gallery/gal03.webp",
  "/img/gallery/gal04.webp",
  "/img/gallery/gal05.webp",
  "/img/gallery/gal06.webp",
  "/img/gallery/gal07.webp",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            Gallery
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Explore the beauty and elegance of Godrej Bandra
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_IMAGES.map((src, i) => (
            <Reveal
              key={src}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`relative overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2 h-full min-h-80" : "h-40"
              }`}
            >
              <Image
                src={src}
                alt={`Godrej Bandra gallery image ${i + 1}`}
                fill
                sizes={
                  i === 0
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                }
                className="object-cover transition duration-500 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
