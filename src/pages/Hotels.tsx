
import { useState } from 'react';
import { Filter, Star, Wifi, Coffee, Tv, Utensils, Parking, MapPin } from 'lucide-react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/ui/SearchBar";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearch } from "@/hooks/useSearch";

// Mock data for hotel amenities
const amenities = [
  { id: 'wifi', name: 'WiFi', icon: <Wifi size={16} className="mr-2 text-travel-blue" /> },
  { id: 'breakfast', name: 'Breakfast', icon: <Coffee size={16} className="mr-2 text-travel-blue" /> },
  { id: 'tv', name: 'TV', icon: <Tv size={16} className="mr-2 text-travel-blue" /> },
  { id: 'restaurant', name: 'Restaurant', icon: <Utensils size={16} className="mr-2 text-travel-blue" /> },
  { id: 'parking', name: 'Parking', icon: <Parking size={16} className="mr-2 text-travel-blue" /> },
];

const Hotels = () => {
  const { search, results, isLoading } = useSearch();
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter hotels
  const filteredHotels = results.filter(result => result.type === 'hotel');

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(prev => prev === rating ? null : rating);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyFilters = () => {
    search({
      searchType: 'hotels',
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      rating: selectedRating || undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
    });
  };

  const resetFilters = () => {
    setPriceRange([50, 500]);
    setSelectedRating(null);
    setSelectedAmenities([]);
    search({ searchType: 'hotels' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Luxury Hotel" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
              Discover amazing hotels, resorts, and accommodations around the world
            </p>
          </FadeIn>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto -mt-24 relative z-20">
          <SearchBar type="hotel" />
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 bg-travel-gray-light flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-travel-blue hover:text-travel-blue-dark"
                  >
                    Reset all
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Price Range</h4>
                    <Slider
                      defaultValue={[50, 500]}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      max={1000}
                      step={10}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Star Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <button
                          key={rating}
                          onClick={() => handleRatingSelect(rating)}
                          className={`flex items-center w-full py-2 px-3 rounded-lg transition-colors ${
                            selectedRating === rating 
                              ? 'bg-travel-blue/10 text-travel-blue' 
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${
                                  selectedRating === rating 
                                    ? 'text-travel-blue fill-travel-blue' 
                                    : 'text-yellow-400 fill-yellow-400'
                                } mr-0.5`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2">{rating} {rating === 1 ? 'Star' : 'Stars'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Amenities</h4>
                    <div className="space-y-3">
                      {amenities.map(amenity => (
                        <div key={amenity.id} className="flex items-center">
                          <Checkbox
                            id={`amenity-${amenity.id}`}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={() => handleAmenityToggle(amenity.id)}
                            className="text-travel-blue"
                          />
                          <label 
                            htmlFor={`amenity-${amenity.id}`}
                            className="ml-2 text-sm text-gray-700 flex items-center"
                          >
                            {amenity.icon} {amenity.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={applyFilters}
                  className="w-full mt-6 bg-travel-blue text-white hover:bg-travel-blue-dark"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Mobile Filters Button */}
            <div className="lg:hidden mb-4">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline" 
                className="w-full justify-center"
              >
                <Filter size={18} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              {/* Mobile Filters */}
              {showFilters && (
                <div className="bg-white rounded-xl shadow-card p-6 mt-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-travel-blue hover:text-travel-blue-dark"
                    >
                      Reset all
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Price Range */}
                    <div className="pb-6 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Price Range</h4>
                      <Slider
                        defaultValue={[50, 500]}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        max={1000}
                        step={10}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">${priceRange[0]}</span>
                        <span className="text-sm text-gray-600">${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    {/* Star Rating */}
                    <div className="pb-6 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Star Rating</h4>
                      <div className="flex flex-wrap gap-2">
                        {[5, 4, 3, 2, 1].map(rating => (
                          <button
                            key={rating}
                            onClick={() => handleRatingSelect(rating)}
                            className={`flex items-center py-1 px-3 rounded-lg transition-colors ${
                              selectedRating === rating 
                                ? 'bg-travel-blue/10 text-travel-blue' 
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center">
                              {Array.from({ length: rating }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={`${
                                    selectedRating === rating 
                                      ? 'text-travel-blue fill-travel-blue' 
                                      : 'text-yellow-400 fill-yellow-400'
                                  } mr-0.5`} 
                                />
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Amenities</h4>
                      <div className="flex flex-wrap gap-3">
                        {amenities.map(amenity => (
                          <button
                            key={amenity.id}
                            onClick={() => handleAmenityToggle(amenity.id)}
                            className={`flex items-center py-1 px-3 rounded-lg transition-colors ${
                              selectedAmenities.includes(amenity.id) 
                                ? 'bg-travel-blue/10 text-travel-blue' 
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {amenity.icon} {amenity.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button 
                      onClick={() => setShowFilters(false)}
                      variant="outline" 
                      className="w-1/2"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => {
                        applyFilters();
                        setShowFilters(false);
                      }}
                      className="w-1/2 bg-travel-blue text-white hover:bg-travel-blue-dark"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Hotel Results */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                Available Hotels {filteredHotels.length > 0 && `(${filteredHotels.length})`}
              </h2>
              
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-card animate-pulse">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-64 bg-gray-200 rounded-t-xl md:rounded-l-xl md:rounded-tr-none"></div>
                        <div className="p-6 md:w-2/3">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                          <div className="flex justify-between items-end">
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredHotels.length > 0 ? (
                <div className="space-y-6">
                  {filteredHotels.map((hotel, index) => (
                    <FadeIn key={hotel.id} delay={100 * index} direction="up">
                      <div className="bg-white rounded-xl shadow-card hover:shadow-elevation transition-shadow duration-300 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-64 relative overflow-hidden">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            {hotel.rating && (
                              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-800">
                                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                <span>{hotel.rating?.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-6 md:w-2/3">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                            
                            <div className="flex items-center text-gray-600 mb-3">
                              <MapPin size={16} className="mr-1" />
                              <span className="text-sm">{hotel.location}</span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{hotel.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {hotel.amenities?.map((amenity, i) => (
                                <span key={i} className="bg-travel-blue/5 text-travel-blue-dark text-xs px-3 py-1 rounded-full">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="text-gray-500 text-sm">From</span>
                                <div className="text-2xl font-bold text-travel-blue">
                                  ${hotel.price}/night
                                </div>
                              </div>
                              
                              <Button className="bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search filters</p>
                  <Button 
                    onClick={resetFilters} 
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Hotels;
