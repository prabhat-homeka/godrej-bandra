import Reveal from "./Reveal";

export default function SectionHeading({
  black,
  gold,
  subtitle,
  align = "center",
}: {
  black?: string;
  gold?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";

  return (
    <Reveal className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-[60px]">
        {black && <span className="text-ink">{black} </span>}
        {gold && <span className="text-gold">{gold}</span>}
      </h2>
      <div
        className={`mt-4 h-[3px] w-24 bg-gold ${isCenter ? "mx-auto" : ""}`}
      />
      {subtitle && <p className="mt-6 text-lg text-taupe">{subtitle}</p>}
    </Reveal>
  );
}
