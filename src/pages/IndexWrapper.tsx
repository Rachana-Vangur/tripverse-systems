
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedDestinationsSection } from "@/components/home/FeaturedDestinationsSection";
import { FeaturedPackagesSection } from "@/components/home/FeaturedPackagesSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { MapSection } from "@/components/home/MapSection";
import { CTASection } from "@/components/home/CTASection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SearchResultsSection } from "@/components/home/SearchResultsSection";

const IndexWrapper = () => {
  return (
    <main>
      <HeroSection />
      <SearchResultsSection />
      <FeaturedDestinationsSection />
      <FeaturedPackagesSection />
      <ExperienceSection />
      <MapSection />
      <CTASection />
      <NewsletterSection />
    </main>
  );
};

export default IndexWrapper;
