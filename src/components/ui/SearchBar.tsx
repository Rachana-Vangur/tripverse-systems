
import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { useSearch } from '@/hooks/useSearch';
import { useToast } from '@/hooks/use-toast';

interface SearchBarProps {
  type?: 'hotel' | 'flight' | 'package' | 'destination';
  className?: string;
  onResultsFound?: (hasResults: boolean) => void;
}

export const SearchBar = ({ type = 'hotel', className = '', onResultsFound }: SearchBarProps) => {
  const { search, results, isLoading } = useSearch();
  const { toast } = useToast();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  
  // Flight specific states
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    // Validate inputs based on search type
    if (type === 'hotel' || type === 'destination' || type === 'package') {
      if (!location.trim()) {
        toast({
          title: "Location required",
          description: "Please enter a destination to search.",
          variant: "destructive"
        });
        return;
      }
    } else if (type === 'flight') {
      if (!origin.trim() || !destination.trim()) {
        toast({
          title: "Origin and destination required",
          description: "Please enter both origin and destination cities.",
          variant: "destructive"
        });
        return;
      }
    }

    // Map the search type to the expected value in the useSearch hook
    const searchTypeMap = {
      'hotel': 'hotels',
      'flight': 'flights',
      'package': 'packages',
      'destination': 'destinations'
    } as const;
    
    const searchType = searchTypeMap[type];
    
    // Prepare search options based on the search type
    let searchOptions;
    
    if (type === 'hotel' || type === 'destination' || type === 'package') {
      searchOptions = {
        searchType,
        location,
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut }),
        guests,
      };
    } else { // flight
      searchOptions = {
        searchType,
        origin,
        destination,
        ...(departDate && { departDate }),
        ...(returnDate && { returnDate }),
        passengers,
      };
    }
    
    // Perform the search
    search(searchOptions);
    
    // Show toast for search progress
    toast({
      title: "Searching...",
      description: `Looking for ${searchType} matching your criteria.`,
    });

    // Notify parent component about results after a brief delay to allow search to complete
    setTimeout(() => {
      if (onResultsFound) {
        onResultsFound(results.length > 0);
      }
      
      // Show results toast
      toast({
        title: results.length > 0 ? "Results found" : "No results",
        description: results.length > 0 
          ? `Found ${results.length} ${searchType} matching your criteria.`
          : `No ${searchType} found. Try different search criteria.`,
        variant: results.length > 0 ? "default" : "destructive"
      });
    }, 600);
  };

  const decrementGuests = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  const incrementGuests = () => {
    setGuests(guests + 1);
  };

  const decrementPassengers = () => {
    if (passengers > 1) setPassengers(passengers - 1);
  };

  const incrementPassengers = () => {
    setPassengers(passengers + 1);
  };

  return (
    <div className={`glass-card p-4 md:p-6 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        {type === 'hotel' || type === 'destination' || type === 'package' ? (
          <>
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="location"
                  type="text"
                  placeholder="Where are you going?"
                  className="pl-10 w-full rounded-lg border-gray-200 focus:border-travel-blue focus:ring focus:ring-travel-blue/20 transition-all duration-200"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="checkin"
                    className="flex items-center w-full md:w-44 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-travel-blue focus:ring focus:ring-travel-blue/20"
                  >
                    <Calendar className="mr-2 text-gray-400" size={18} />
                    {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="checkout"
                    className="flex items-center w-full md:w-44 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-travel-blue focus:ring focus:ring-travel-blue/20"
                  >
                    <Calendar className="mr-2 text-gray-400" size={18} />
                    {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                    disabled={(date) => date < (checkIn || new Date())}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
              <div className="flex items-center w-full md:w-44 px-3 py-2 border border-gray-200 rounded-lg">
                <Users className="mr-2 text-gray-400" size={18} />
                <div className="flex items-center justify-between flex-1">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-travel-blue focus:outline-none"
                    onClick={decrementGuests}
                  >
                    -
                  </button>
                  <span className="text-gray-700">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-travel-blue focus:outline-none"
                    onClick={incrementGuests}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Flight specific search fields
          <>
            <div className="flex-1">
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="origin"
                  type="text"
                  placeholder="City or airport"
                  className="pl-10 w-full rounded-lg border-gray-200 focus:border-travel-blue focus:ring focus:ring-travel-blue/20 transition-all duration-200"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="destination"
                  type="text"
                  placeholder="City or airport"
                  className="pl-10 w-full rounded-lg border-gray-200 focus:border-travel-blue focus:ring focus:ring-travel-blue/20 transition-all duration-200"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="depart" className="block text-sm font-medium text-gray-700 mb-1">Depart</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="depart"
                    className="flex items-center w-full md:w-44 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-travel-blue focus:ring focus:ring-travel-blue/20"
                  >
                    <Calendar className="mr-2 text-gray-400" size={18} />
                    {departDate ? format(departDate, 'MMM dd, yyyy') : 'Select date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={departDate}
                    onSelect={setDepartDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">Return</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="return"
                    className="flex items-center w-full md:w-44 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-travel-blue focus:ring focus:ring-travel-blue/20"
                  >
                    <Calendar className="mr-2 text-gray-400" size={18} />
                    {returnDate ? format(returnDate, 'MMM dd, yyyy') : 'Select date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                    disabled={(date) => date < (departDate || new Date())}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <div className="flex items-center w-full md:w-44 px-3 py-2 border border-gray-200 rounded-lg">
                <Users className="mr-2 text-gray-400" size={18} />
                <div className="flex items-center justify-between flex-1">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-travel-blue focus:outline-none"
                    onClick={decrementPassengers}
                  >
                    -
                  </button>
                  <span className="text-gray-700">{passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}</span>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-travel-blue focus:outline-none"
                    onClick={incrementPassengers}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="w-full md:w-auto md:self-end md:pb-0.5">
          <Button 
            className="w-full mt-6 bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300 shadow-subtle md:h-[42px]"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <>
                <Search className="mr-2" size={18} />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
