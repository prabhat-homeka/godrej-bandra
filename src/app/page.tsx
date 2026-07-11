import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import PlansPricing from "@/components/PlansPricing";
import AboutProject from "@/components/AboutProject";
import DesignPartners from "@/components/DesignPartners";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import Connectivity from "@/components/Connectivity";
import AboutDeveloper from "@/components/AboutDeveloper";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Highlights />
        <PlansPricing />
        <AboutProject />
        <DesignPartners />
        <Gallery />
        <Amenities />
        <Connectivity />
        <AboutDeveloper />
      </main>
      <Footer />
    </>
  );
}
