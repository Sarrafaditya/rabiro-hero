import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsStrip from "@/components/StatsStrip";
import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationSection from "@/components/CertificationSection";
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
        <ClientLogoCarousel />
        <AboutSection />
        <WhyChooseUs />
        <ProcessSection />
        <ProjectsSection />
        <CertificationSection />
        <TestimonialsSection />
        <FinalCTA />
        <ContactSection />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
