import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsStrip from "@/components/StatsStrip";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export default function Home() {
  return (
    <>
      <ClientProviders />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsStrip />
        <AboutSection />
        <WhyChooseUs />
        <ProcessSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FinalCTA />
        <ContactSection />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
