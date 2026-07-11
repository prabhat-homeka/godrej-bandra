import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { EnquiryProvider } from "@/components/EnquiryContext";
import EnquiryModal from "@/components/EnquiryModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackingCapture from "@/components/TrackingCapture";
import Preloader from "@/components/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Godrej Bandra West | Luxury 3 & 4 BHK Apartments in Mumbai",
  description:
    "Explore Godrej Bandra West, offering premium 3 & 4 BHK luxury residences on 4.25 acres in Bandra West, Mumbai. Enquire for pricing, floor plans & offers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-light text-ink">
        <EnquiryProvider>
          <Preloader />
          <TrackingCapture />
          {children}
          <EnquiryModal />
          <WhatsAppButton />
        </EnquiryProvider>
      </body>
    </html>
  );
}
