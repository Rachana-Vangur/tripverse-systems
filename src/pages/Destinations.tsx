
import { useState } from 'react';
import { Search, Map, Filter, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { useSearch } from "@/hooks/useSearch";

// Mock data for destination regions
const regions = [
  { id: 'europe', name: 'Europe' },
  { id: 'asia', name: 'Asia' },
  { id: 'north-america', name: 'North America' },
  { id: 'south-america', name: 'South America' },
  { id: 'africa', name: 'Africa' },
  { id: 'oceania', name: 'Oceania' },
];

const popularDestinations = [
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
  {
    id: 'dest-5',
    name: 'Paris',
    location: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.8,
  },
  {
    id: 'dest-6',
    name: 'Machu Picchu',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1646&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.9,
  },
  {
    id: 'dest-7',
    name: 'New York',
    location: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.7,
  },
  {
    id: 'dest-8',
    name: 'Kyoto',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.8,
  },
];

const Destinations = () => {
  const { search, results, isLoading } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search({ 
      searchType: 'destinations',
      location: searchQuery
    });
  };

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(prev => prev === regionId ? null : regionId);
    // In a real app, we would filter by region here
  };

  // Filter destinations based on search or show popular ones
  const filteredDestinations = results.filter(result => result.type === 'destination').length > 0
    ? results.filter(result => result.type === 'destination')
    : popularDestinations;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="World destinations" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              Discover Amazing Destinations
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
              Explore the world's most fascinating places and find your next adventure
            </p>
            
            <form onSubmit={handleSearch} className="flex max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for a destination..."
                  className="pl-10 pr-4 py-3 w-full rounded-l-lg border-0 focus:ring-2 focus:ring-travel-blue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="rounded-l-none bg-travel-blue hover:bg-travel-blue-dark text-white">
                Search
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>
      
      {/* Regions Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-700 font-medium">Explore by Region:</span>
            {regions.map(region => (
              <button
                key={region.id}
                onClick={() => handleRegionSelect(region.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRegion === region.id
                    ? 'bg-travel-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-travel-gray-light flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
              {results.filter(result => result.type === 'destination').length > 0
                ? 'Search Results'
                : 'Popular Destinations'}
            </h2>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                <Map size={18} />
                View Map
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                Filter
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-card h-72 animate-pulse">
                  <div className="h-full w-full bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map((destination, index) => (
                <FadeIn key={destination.id} delay={100 * (index % 4)} direction="up">
                  <DestinationCard
                    id={destination.id}
                    name={destination.name || ''}
                    location={destination.location || ''}
                    image={destination.image || ''}
                    rating={destination.rating || 0}
                  />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-card p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-600 mb-6">Try a different search term</p>
              <Button onClick={() => setSearchQuery('')} variant="outline">
                Reset Search
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Destination */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn direction="left">
                <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                  Featured Destination
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-4">
                  Explore the Magic of Santorini
                </h2>
                
                <div className="flex items-center mb-6">
                  <MapPin size={18} className="text-travel-blue mr-2" />
                  <span className="text-gray-600">Santorini, Greece</span>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Discover the breathtaking beauty of Santorini, with its iconic white-washed buildings, blue-domed churches, and stunning sunsets over the caldera. This Greek paradise offers a perfect blend of natural beauty, rich history, and incredible cuisine.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-travel-gray-light rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-1">Best Time to Visit</div>
                    <div className="text-gray-600 text-sm">April to October</div>
                  </div>
                  <div className="bg-travel-gray-light rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-1">Language</div>
                    <div className="text-gray-600 text-sm">Greek, English widely spoken</div>
                  </div>
                  <div className="bg-travel-gray-light rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-1">Currency</div>
                    <div className="text-gray-600 text-sm">Euro (€)</div>
                  </div>
                  <div className="bg-travel-gray-light rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-1">Average Cost</div>
                    <div className="text-gray-600 text-sm">€€€ (Moderate to High)</div>
                  </div>
                </div>
                
                <Link to="/destinations/dest-1">
                  <Button className="btn-primary">
                    <Globe size={18} className="mr-2" />
                    Explore Santorini
                  </Button>
                </Link>
              </FadeIn>
            </div>
            
            <div className="relative">
              <FadeIn direction="right">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-elevation">
                  <img 
                    src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Santorini" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-travel-blue/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-travel-blue/5 rounded-2xl -z-10"></div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-travel-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-travel-blue-dark opacity-20"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1683&auto=format&fit=crop&ixlib=rb-4.0.3')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
          opacity: 0.3
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Create a personalized itinerary, book your flights and accommodations, and make your dream vacation a reality.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/signup">
                <Button className="bg-white text-travel-blue hover:bg-travel-blue-light hover:text-travel-blue-dark font-medium px-8 py-6 text-base transition-all duration-300">
                  Create an Account
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 font-medium px-8 py-6 text-base transition-all duration-300">
                  Browse Travel Packages
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Destinations;
