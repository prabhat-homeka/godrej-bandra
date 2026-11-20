import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { EnquiryProvider } from "@/components/EnquiryContext";
import EnquiryModal from "@/components/EnquiryModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackingCapture from "@/components/TrackingCapture";
import Preloader from "@/components/Preloader";
import GoogleTag from "@/components/GoogleTag";

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
  title: "Godrej Bandra Bay | Sea-Facing Luxury 4 & 5 BHK Apartments in Bandra West, Mumbai",
  description:
    "Godrej Bandra Bay offers sea-facing 4 & 5 BHK luxury residences and penthouses in Bandra West, Mumbai, starting ₹18 Cr*. Enquire for pricing, floor plans & offers.",
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
        <GoogleTag />
      </body>
    </html>
  );
}
