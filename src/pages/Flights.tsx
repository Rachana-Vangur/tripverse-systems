import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Calendar,
  ChevronDown, 
  Filter, 
  Plane, 
  Star,
  Users,
  Clock,
  Calendar as CalendarIcon,
  ArrowRight,
  MapPin,
  Luggage,
  X
} from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { FadeIn } from '@/components/animation/FadeIn';

// Mock data for popular destinations
const popularDestinations = [
  {
    id: 'dest-1',
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c6e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: 'dest-2',
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: 'dest-3',
    name: 'Rome',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a4a6b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: 'dest-4',
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496037754943-16959304f768?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

const Flights = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState<number[]>([0]);
  const [maxPrice, setMaxPrice] = useState<number[]>([1000]);
  const [rating, setRating] = useState<number[]>([0]);
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  const { search, results, isLoading } = useSearch();

  const handleSearch = () => {
    search({
      searchType: 'flights',
      location: location,
      minPrice: minPrice[0],
      maxPrice: maxPrice[0],
      rating: rating[0],
      departDate: departDate,
      returnDate: returnDate,
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleMinPriceChange = (value: number[]) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value: number[]) => {
    setMaxPrice(value);
  };

  const handleRatingChange = (value: number[]) => {
    setRating(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1436491865324-7583cc24c6c7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Flights" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
              Find Your Next Flight
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Search and compare flights from hundreds of airlines and travel sites.
            </p>
            <Button 
              onClick={() => setShowSearch(true)}
              className="bg-travel-blue hover:bg-travel-blue-dark text-white"
            >
              Search Flights
            </Button>
          </FadeIn>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="page-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Filters - Desktop */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm p-6 h-fit">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Flights</h3>
              
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  type="text"
                  id="location"
                  placeholder="Enter a destination"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice[0]}
                    onChange={(e) => handleMinPriceChange([Number(e.target.value)])}
                    className="w-24"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice[0]}
                    onChange={(e) => handleMaxPriceChange([Number(e.target.value)])}
                    className="w-24"
                  />
                </div>
                <Slider
                  defaultValue={maxPrice}
                  max={2000}
                  step={10}
                  onValueChange={handleMaxPriceChange}
                  className="mt-2"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <Slider
                  defaultValue={rating}
                  max={5}
                  step={0.5}
                  onValueChange={handleRatingChange}
                  className="mt-2"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>0 Star</span>
                  <span>5 Stars</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dates</label>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !departDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departDate ? (
                          format(departDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center" side="bottom">
                      <CalendarComponent
                        mode="single"
                        selected={departDate}
                        onSelect={setDepartDate}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? (
                          format(returnDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center" side="bottom">
                      <CalendarComponent
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full mt-6 bg-travel-blue hover:bg-travel-blue-dark text-white"
              >
                Apply Filters
              </Button>
            </div>
            
            {/* Results */}
            <div className="lg:col-span-3">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Flight Results</h2>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="sm:w-[400px] p-6">
                    <SheetHeader>
                      <SheetTitle>Filter Flights</SheetTitle>
                      <SheetDescription>
                        Apply filters to refine your search results.
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="mb-4">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <Input
                        type="text"
                        id="location"
                        placeholder="Enter a destination"
                        value={location}
                        onChange={handleLocationChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={minPrice[0]}
                          onChange={(e) => handleMinPriceChange([Number(e.target.value)])}
                          className="w-24"
                        />
                        <span className="text-gray-500">-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={maxPrice[0]}
                          onChange={(e) => handleMaxPriceChange([Number(e.target.value)])}
                          className="w-24"
                        />
                      </div>
                      <Slider
                        defaultValue={maxPrice}
                        max={2000}
                        step={10}
                        onValueChange={handleMaxPriceChange}
                        className="mt-2"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <Slider
                        defaultValue={rating}
                        max={5}
                        step={0.5}
                        onValueChange={handleRatingChange}
                        className="mt-2"
                      />
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span>0 Star</span>
                        <span>5 Stars</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dates</label>
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[140px] justify-start text-left font-normal",
                                !departDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departDate ? (
                                format(departDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center" side="bottom">
                            <CalendarComponent
                              mode="single"
                              selected={departDate}
                              onSelect={setDepartDate}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[140px] justify-start text-left font-normal",
                                !returnDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? (
                                format(returnDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center" side="bottom">
                            <CalendarComponent
                              mode="single"
                              selected={returnDate}
                              onSelect={setReturnDate}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <SheetClose asChild>
                        <Button type="button" variant="secondary" className="mr-2">Cancel</Button>
                      </SheetClose>
                      <Button 
                        onClick={handleSearch}
                        className="bg-travel-blue hover:bg-travel-blue-dark text-white"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Sort Controls */}
              <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="text-sm">
                        Relevance
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="p-2 space-y-1">
                        <Button variant="ghost" className="justify-start w-full">
                          Price: Low to High
                        </Button>
                        <Button variant="ghost" className="justify-start w-full">
                          Price: High to Low
                        </Button>
                        <Button variant="ghost" className="justify-start w-full">
                          Rating: High to Low
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className="text-sm text-gray-500 mr-2">View:</span>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Plane className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Flight Results */}
              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-10 h-10 border-4 border-travel-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-500">Searching for flights...</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Flights Found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search criteria or explore our popular destinations</p>
                    <Button 
                      onClick={() => setShowSearch(true)}
                      className="bg-travel-blue hover:bg-travel-blue-dark text-white"
                    >
                      Modify Search
                    </Button>
                  </div>
                ) : (
                  results.filter(result => result.type === 'flight').map((flight) => (
                    <div 
                      key={flight.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                        <div className="md:col-span-3 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                <Plane className="w-5 h-5 text-travel-blue" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{flight.name}</h3>
                                <p className="text-sm text-gray-500">{flight.airline}</p>
                              </div>
                            </div>
                            <div className="flex items-center bg-travel-blue/5 px-3 py-1 rounded-full">
                              <Clock size={14} className="text-travel-blue mr-1" />
                              <span className="text-sm font-medium">{flight.flightDuration}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-b border-gray-100 py-4">
                            <div className="flex flex-col items-start mb-3 sm:mb-0">
                              <span className="text-xs text-gray-500 mb-1">Departure</span>
                              <span className="text-lg font-bold text-gray-900">
                                {flight.origin}
                              </span>
                              <span className="text-sm text-gray-500">{flight.departDate}</span>
                            </div>
                            
                            <div className="flex-1 flex justify-center px-4 mb-3 sm:mb-0">
                              <div className="w-full flex items-center">
                                <div className="h-[2px] flex-1 bg-gray-200"></div>
                                <ArrowRight className="mx-2 text-gray-400" />
                                <div className="h-[2px] flex-1 bg-gray-200"></div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-start sm:items-end">
                              <span className="text-xs text-gray-500 mb-1">Arrival</span>
                              <span className="text-lg font-bold text-gray-900">
                                {flight.destination}
                              </span>
                              <span className="text-sm text-gray-500">{flight.returnDate}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-full">
                              <Luggage size={14} className="text-gray-500 mr-1" />
                              <span>20kg Luggage</span>
                            </div>
                            <div className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-full">
                              <Users size={14} className="text-gray-500 mr-1" />
                              <span>2 Adults</span>
                            </div>
                            <div className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-full">
                              <MapPin size={14} className="text-gray-500 mr-1" />
                              <span>Direct Flight</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:border-l md:pl-6 flex flex-col justify-between">
                          <div className="flex items-baseline mb-2">
                            <span className="text-2xl font-bold text-travel-blue">${flight.price}</span>
                            <span className="text-sm text-gray-500 ml-1">/ person</span>
                          </div>
                          
                          <div className="space-y-3 mt-auto">
                            <Button className="w-full bg-white border border-travel-blue text-travel-blue hover:bg-travel-blue/5">
                              View Details
                            </Button>
                            <Button className="w-full bg-travel-blue hover:bg-travel-blue-dark text-white">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile filters sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="absolute top-4 right-4 sm:hidden">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filter Flights</SheetTitle>
            <SheetDescription>
              Apply filters to refine your search results.
            </SheetDescription>
          </SheetHeader>
          {/* Add filter components here */}
        </SheetContent>
      </Sheet>
      
      {/* CTA Section */}
      <section className="py-16 bg-travel-blue text-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold font-display mb-4">
                Ready to book your next adventure?
              </h2>
              <p className="text-lg text-white/80 mb-6">
                Explore our exclusive flight deals and start planning your dream trip today.
              </p>
              <Button className="bg-white text-travel-blue hover:bg-travel-blue-light hover:text-travel-blue-dark">
                View Flight Deals
              </Button>
            </div>
            <div className="flex justify-center">
              <Plane className="w-32 h-32 text-white/20 rotate-45" />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Flights;
