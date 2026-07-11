import Image from "next/image";

export default function VideoGallery() {
  return (
    <section className="bg-ink py-20 text-cream-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow text-xs font-semibold uppercase text-gold">
            Watch &amp;
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Explore</h2>
          <p className="mt-3 text-cream-light/70">
            Immerse yourself in the Godrej Bandra West experience through our video
            gallery.
          </p>
        </div>

        <div className="relative mt-12 flex h-96 items-center justify-center overflow-hidden border border-gold/20">
          <Image
            src="/img/gallery/gal01.webp"
            alt="Project walkthrough"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold text-2xl text-gold">
              ▶
            </span>
            <p className="font-serif text-xl">Project Walkthrough</p>
            <p className="text-sm text-cream-light/70">Take a virtual tour</p>
          </div>
        </div>
      </div>
    </section>
  );
}
