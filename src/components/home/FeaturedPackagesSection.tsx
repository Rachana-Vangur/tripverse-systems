
import { Link } from 'react-router-dom';
import { PackageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FeaturedPackage } from "@/components/ui/FeaturedPackage";
import { FadeIn } from "@/components/animation/FadeIn";

// Mock data for featured packages
const featuredPackages = [
  {
    id: 'package-1',
    title: 'Tropical Paradise Getaway',
    location: 'Maldives',
    description: 'Experience the ultimate luxury escape with overwater bungalows, pristine beaches, and world-class service. This all-inclusive package offers snorkeling in crystal clear waters, spa treatments, and gourmet dining experiences.',
    price: 2950,
    discount: 15,
    duration: '7 Days / 6 Nights',
    groupSize: 'Up to 8 people',
    startDate: 'Flexible Dates',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['All-Inclusive', 'Snorkeling', 'Private Villa'],
  },
  {
    id: 'package-2',
    title: 'European Cultural Tour',
    location: 'Italy, France, Spain',
    description: 'Immerse yourself in European culture, history, and cuisine with this comprehensive tour package. Visit iconic landmarks, enjoy authentic local experiences, and stay in premium accommodations throughout your journey.',
    price: 3200,
    duration: '12 Days / 11 Nights',
    groupSize: '10-15 people',
    startDate: 'Monthly departures',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Guided Tours', 'Premium Hotels', 'Transportation'],
  },
];

export const FeaturedPackagesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-travel-gray-light to-white">
      <div className="page-container">
        <div className="text-center mb-12">
          <FadeIn direction="up">
            <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
              Special Offers
            </span>
            <h2 className="section-heading mt-3">Featured Travel Packages</h2>
            <p className="section-subheading mx-auto">
              Our hand-crafted travel packages combine the best accommodations, experiences, and services 
              to create unforgettable journeys.
            </p>
          </FadeIn>
        </div>
        
        <div className="space-y-8">
          {featuredPackages.map((pkg, index) => (
            <FeaturedPackage
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              location={pkg.location}
              description={pkg.description}
              price={pkg.price}
              discount={pkg.discount}
              duration={pkg.duration}
              groupSize={pkg.groupSize}
              startDate={pkg.startDate}
              image={pkg.image}
              features={pkg.features}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/packages">
            <Button className="btn-primary mt-6 px-8">
              <PackageIcon size={18} className="mr-2" />
              Browse All Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
