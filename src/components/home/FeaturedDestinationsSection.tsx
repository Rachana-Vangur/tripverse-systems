
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { FadeIn } from "@/components/animation/FadeIn";
import { useDestinations } from '@/hooks/useDestinations';

export const FeaturedDestinationsSection = () => {
  const { featuredDestinations, isLoading, error } = useDestinations();

  // Fallback destinations in case of error or empty data
  const fallbackDestinations = [
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

  // Use real data if available, otherwise fallback
  const displayDestinations = featuredDestinations.length > 0 ? 
    featuredDestinations.map(dest => ({
      id: dest.id,
      name: dest.name,
      location: dest.location,
      image: dest.image_url,
      rating: dest.rating
    })) : 
    fallbackDestinations;

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
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-card p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <p>Showing fallback destinations instead</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayDestinations.map((destination, index) => (
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
        )}
        
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
