import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917000106787"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105"
    >
      <Image src="/img/whatapps-ico.png" alt="WhatsApp" width={28} height={28} />
    </a>
  );
}
