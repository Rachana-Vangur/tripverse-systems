
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedDestinationsSection } from "@/components/home/FeaturedDestinationsSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FeaturedPackagesSection } from "@/components/home/FeaturedPackagesSection";
import { CTASection } from "@/components/home/CTASection";
import { MapSection } from "@/components/home/MapSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection />
      <FeaturedDestinationsSection />
      <ExperienceSection />
      <FeaturedPackagesSection />
      <CTASection />
      <MapSection />
      <NewsletterSection />
      
      <Footer />
    </div>
  );
};

export default Index;
