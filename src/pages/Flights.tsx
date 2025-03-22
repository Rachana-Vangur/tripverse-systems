
import { useState } from 'react';
import { Filter, Plane, Timer, Calendar, DollarSign, Tag, UserRound, BarChart2 } from 'lucide-react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/ui/SearchBar";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearch } from "@/hooks/useSearch";

// Mock data for airlines
const airlines = [
  { id: 'premium-airlines', name: 'Premium Airlines' },
  { id: 'skyway-express', name: 'Skyway Express' },
  { id: 'ocean-air', name: 'Ocean Air' },
  { id: 'royal-pacific', name: 'Royal Pacific' },
  { id: 'mountain-flights', name: 'Mountain Flights' },
];

const Flights = () => {
  const { search, results, isLoading } = useSearch();
  const [priceRange, setPriceRange] = useState([200, 1500]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter flights
  const filteredFlights = results.filter(result => result.type === 'flight');

  const handleAirlineToggle = (airlineId: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airlineId)
        ? prev.filter(id => id !== airlineId)
        : [...prev, airlineId]
    );
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyFilters = () => {
    search({
      searchType: 'flights',
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      // Additional filter params would go here
    });
  };

  const resetFilters = () => {
    setPriceRange([200, 1500]);
    setSelectedAirlines([]);
    search({ searchType: 'flights' });
  };

  // Function to format time (in a real app, you would use actual date objects)
  const formatFlightTime = (time: string) => {
    return time;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Flight" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              Fly to Your Dream Destination
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
              Search and compare flights to find the best deals for your next journey
            </p>
          </FadeIn>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto -mt-24 relative z-20">
          <SearchBar type="flight" />
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
                      defaultValue={[200, 1500]}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      max={2000}
                      step={50}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Airlines */}
                  <div className="pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Airlines</h4>
                    <div className="space-y-3">
                      {airlines.map(airline => (
                        <div key={airline.id} className="flex items-center">
                          <Checkbox
                            id={`airline-${airline.id}`}
                            checked={selectedAirlines.includes(airline.id)}
                            onCheckedChange={() => handleAirlineToggle(airline.id)}
                            className="text-travel-blue"
                          />
                          <label 
                            htmlFor={`airline-${airline.id}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {airline.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stops */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Stops</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Checkbox
                          id="nonstop"
                          className="text-travel-blue"
                        />
                        <label 
                          htmlFor="nonstop"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Nonstop
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="1-stop"
                          className="text-travel-blue"
                        />
                        <label 
                          htmlFor="1-stop"
                          className="ml-2 text-sm text-gray-700"
                        >
                          1 Stop
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="2-stops"
                          className="text-travel-blue"
                        />
                        <label 
                          htmlFor="2-stops"
                          className="ml-2 text-sm text-gray-700"
                        >
                          2+ Stops
                        </label>
                      </div>
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
                  {/* Filter content - similar to desktop but more compact */}
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
                        defaultValue={[200, 1500]}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        max={2000}
                        step={50}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">${priceRange[0]}</span>
                        <span className="text-sm text-gray-600">${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    {/* Airlines */}
                    <div className="pb-6 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Airlines</h4>
                      <div className="flex flex-wrap gap-2">
                        {airlines.map(airline => (
                          <button
                            key={airline.id}
                            onClick={() => handleAirlineToggle(airline.id)}
                            className={`py-1 px-3 rounded-lg text-sm transition-colors ${
                              selectedAirlines.includes(airline.id) 
                                ? 'bg-travel-blue/10 text-travel-blue' 
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {airline.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Stops */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Stops</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="py-1 px-3 rounded-lg text-sm bg-gray-50 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          Nonstop
                        </button>
                        <button className="py-1 px-3 rounded-lg text-sm bg-gray-50 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          1 Stop
                        </button>
                        <button className="py-1 px-3 rounded-lg text-sm bg-gray-50 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          2+ Stops
                        </button>
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
            
            {/* Flight Results */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0 font-display">
                  Available Flights {filteredFlights.length > 0 && `(${filteredFlights.length})`}
                </h2>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                  <select className="text-sm border-gray-200 rounded-lg focus:border-travel-blue focus:ring focus:ring-travel-blue/20 py-1">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration: Shortest</option>
                    <option>Departure: Earliest</option>
                    <option>Departure: Latest</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-card animate-pulse p-6">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="w-full sm:w-2/3">
                          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="h-8 bg-gray-200 rounded w-1/5"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/5"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        </div>
                        <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
                          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 sm:ml-auto"></div>
                          <div className="h-10 bg-gray-200 rounded w-full sm:w-3/4 sm:ml-auto"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredFlights.length > 0 ? (
                <div className="space-y-4">
                  {filteredFlights.map((flight, index) => (
                    <FadeIn key={flight.id} delay={100 * index} direction="up">
                      <div className="bg-white rounded-xl shadow-card hover:shadow-elevation transition-shadow duration-300 overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <div className="flex items-center mb-4">
                                <Plane size={18} className="text-travel-blue mr-2" />
                                <span className="font-semibold text-gray-900">{flight.airline}</span>
                                {flight.id && (
                                  <span className="ml-2 text-gray-500 text-sm">Flight {flight.id}</span>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between mb-4 space-x-10">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-gray-900">
                                    {formatFlightTime(flight.departDate || '')}
                                  </div>
                                  <div className="text-sm text-gray-500">{flight.origin}</div>
                                </div>
                                
                                <div className="flex-1 px-4">
                                  <div className="relative">
                                    <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300 border-dashed"></div>
                                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-2 rounded-full bg-travel-blue"></div>
                                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 rounded-full bg-travel-blue"></div>
                                  </div>
                                  <div className="text-xs text-center text-gray-500 mt-2">
                                    {flight.duration}
                                  </div>
                                </div>
                                
                                <div className="text-center">
                                  <div className="text-xl font-bold text-gray-900">
                                    {formatFlightTime(flight.returnDate || '')}
                                  </div>
                                  <div className="text-sm text-gray-500">{flight.destination}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Timer size={16} className="mr-1" />
                                <span>Duration: {flight.duration}</span>
                                
                                <span className="mx-2">•</span>
                                
                                <Calendar size={16} className="mr-1" />
                                <span>Depart: {flight.departDate}</span>
                                
                                {flight.returnDate && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <UserRound size={16} className="mr-1" />
                                    <span>Economy</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-6 sm:mt-0 sm:ml-6 flex flex-col sm:items-end">
                              <div className="flex items-center mb-3">
                                <Tag size={16} className="text-green-500 mr-1" />
                                <span className="text-green-600 text-sm font-medium">Best Value</span>
                              </div>
                              
                              <div className="text-2xl font-bold text-travel-blue mb-3">
                                ${flight.price}
                              </div>
                              
                              <Button className="bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300">
                                Select Flight
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-3">
                              <div className="flex items-center text-sm bg-travel-blue/5 px-3 py-1 rounded-full">
                                <UserRound size={14} className="text-travel-blue mr-1" />
                                <span>Free seat selection</span>
                              </div>
                              <div className="flex items-center text-sm bg-travel-blue/5 px-3 py-1 rounded-full">
                                <BarChart2 size={14} className="text-travel-blue mr-1" />
                                <span>In-flight entertainment</span>
                              </div>
                              <div className="flex items-center text-sm bg-travel-blue/5 px-3 py-1 rounded-full">
                                <DollarSign size={14} className="text-travel-blue mr-1" />
                                <span>Refundable fare</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search filters or dates</p>
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

export default Flights;
