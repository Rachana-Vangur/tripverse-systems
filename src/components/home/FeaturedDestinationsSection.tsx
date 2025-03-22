
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { FadeIn } from "@/components/animation/FadeIn";

// Mock data for featured destinations
const featuredDestinations = [
  {
    id: 'dest-1',
    name: 'Santorini',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.9,
  },
  {
    id: 'dest-2',
    name: 'Bali',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.8,
  },
  {
    id: 'dest-3',
    name: 'Tokyo',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.7,
  },
  {
    id: 'dest-4',
    name: 'Swiss Alps',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.9,
  },
];

export const FeaturedDestinationsSection = () => {
  return (
    <section className="py-20 bg-travel-gray-light">
      <div className="page-container">
        <div className="text-center mb-12">
          <FadeIn direction="up">
            <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
              Explore Top Destinations
            </span>
            <h2 className="section-heading mt-3">Popular Destinations</h2>
            <p className="section-subheading mx-auto">
              Discover the world's most breathtaking locations, from pristine beaches to historic cities,
              and start planning your next adventure.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((destination, index) => (
            <FadeIn key={destination.id} delay={300 + index * 100} direction="up">
              <DestinationCard
                id={destination.id}
                name={destination.name}
                location={destination.location}
                image={destination.image}
                rating={destination.rating}
              />
            </FadeIn>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/destinations">
            <Button className="btn-primary mt-6 px-8">
              <Globe size={18} className="mr-2" />
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
