
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Filter, 
  Wifi, 
  Coffee, 
  Bath, 
  Utensils, 
  Map, 
  CreditCard,
  ParkingSquare
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/ui/SearchBar";
import { FadeIn } from "@/components/animation/FadeIn";
import { useSearch } from "@/hooks/useSearch";
import { useToast } from "@/hooks/use-toast";

const Hotels = () => {
  const { results, isLoading, error, search } = useSearch();
  const { toast } = useToast();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  const filters = [
    { name: 'wifi', label: 'Free WiFi', icon: Wifi },
    { name: 'breakfast', label: 'Breakfast Included', icon: Coffee },
    { name: 'parking', label: 'Free Parking', icon: ParkingSquare },
    { name: 'spa', label: 'Spa', icon: Bath },
    { name: 'restaurant', label: 'Restaurant', icon: Utensils },
  ];
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  const handleRatingClick = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };
  
  const handleSearch = () => {
    const searchOptions = {
      searchType: 'hotels' as const,
      ...(minPrice && { minPrice: Number(minPrice) }),
      ...(maxPrice && { maxPrice: Number(maxPrice) }),
      ...(selectedRating && { rating: selectedRating }),
      ...(selectedFilters.length > 0 && { amenities: selectedFilters }),
    };
    
    search(searchOptions);
    
    toast({
      title: "Searching hotels...",
      description: "Applied filters to find matching hotels.",
    });
  };
  
  const clearFilters = () => {
    setSelectedFilters([]);
    setMinPrice('');
    setMaxPrice('');
    setSelectedRating(null);
    search({ searchType: 'hotels' });
    
    toast({
      title: "Filters cleared",
      description: "Showing all available hotels.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3')"
        }}></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the best hotels worldwide with exclusive deals and personalized recommendations
            </p>
            
            <SearchBar type="hotel" className="max-w-5xl mx-auto"/>
          </FadeIn>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Filter size={20} className="text-gray-600" />
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span>-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Rating</h3>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button 
                        key={rating}
                        className="p-1 hover:text-yellow-500"
                      >
                        <Star 
                          size={24} 
                          className="fill-current text-gray-300 hover:text-yellow-500" 
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600">& Up</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="space-y-3">
                    {filters.map((filter) => (
                      <button
                        key={filter.name}
                        className={`flex items-center w-full p-2 rounded ${
                          selectedFilters.includes(filter.name) 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => toggleFilter(filter.name)}
                      >
                        <filter.icon size={18} className="mr-3" />
                        <span>{filter.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleSearch}
                >
                  <Search size={18} className="mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Hotel Listings */}
            <div className="w-full md:w-3/4">
              <div className="mb-6 bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Showing {isLoading ? '...' : results.length} hotels</p>
                </div>
                <div className="flex space-x-2">
                  <select className="border rounded-lg px-3 py-2 bg-white text-gray-700">
                    <option>Sort by: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating: High to Low</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading hotels...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                  <Button variant="outline" className="mt-4" onClick={handleSearch}>
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {results
                    .filter(result => result.type === 'hotel')
                    .map((hotel) => (
                      <FadeIn key={hotel.id} direction="up">
                        <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name} 
                              className="h-64 w-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                                  <Star size={16} className="fill-current text-yellow-500 mr-1" />
                                  <span>{hotel.rating}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 mt-1 mb-3 flex items-center">
                                <Map size={16} className="mr-1" />
                                {hotel.location}
                              </p>
                              <p className="text-gray-700 mb-4">{hotel.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {hotel.amenities?.map((amenity) => (
                                  <span 
                                    key={amenity} 
                                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t">
                              <div>
                                <p className="text-2xl font-bold text-gray-900">${hotel.price}<span className="text-sm font-normal text-gray-600">/night</span></p>
                                <p className="text-xs text-gray-500">Excludes taxes and fees</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Map size={16} className="mr-1" />
                                  View on Map
                                </Button>
                                <Link to={`/hotels/${hotel.id}`}>
                                  <Button size="sm">
                                    <CreditCard size={16} className="mr-1" />
                                    Book Now
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                </div>
              )}
              
              {!isLoading && !error && results.filter(result => result.type === 'hotel').length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-lg text-gray-600">No hotels found matching your criteria.</p>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search terms.</p>
                  <Button variant="outline" onClick={() => setSelectedFilters([])}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our travel experts help you find the perfect accommodation for your next trip
            </p>
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
              Contact Our Team
            </Button>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Hotels;
