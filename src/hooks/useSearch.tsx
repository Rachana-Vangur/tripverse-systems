
import { useState, useEffect, useCallback } from 'react';

interface SearchOptions {
  searchType?: 'hotels' | 'flights' | 'packages' | 'destinations' | 'guides';
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  amenities?: string[];
  origin?: string;
  destination?: string;
  departDate?: Date;
  returnDate?: Date;
  passengers?: number;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'hotel' | 'flight' | 'package' | 'destination' | 'guide';
  location?: string;
  price?: number;
  rating?: number;
  image?: string;
  amenities?: string[];
  description?: string;
  // Flight specific fields
  origin?: string;
  destination?: string;
  departDate?: string;
  returnDate?: string;
  airline?: string;
  duration?: string;
  // Package specific fields
  duration?: string;
  groupSize?: string;
  startDate?: string;
  features?: string[];
}

// This is a mock API call that would be replaced with a real API call
const mockSearchResults = (options: SearchOptions): Promise<SearchResult[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock hotels
      const hotels = [
        {
          id: 'hotel-1',
          name: 'Luxury Resort & Spa',
          type: 'hotel' as const,
          location: 'Bali, Indonesia',
          price: 250,
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3',
          amenities: ['Pool', 'Spa', 'WiFi', 'Restaurant'],
          description: 'Experience unparalleled luxury at our 5-star resort with stunning ocean views.',
        },
        {
          id: 'hotel-2',
          name: 'Mountain View Lodge',
          type: 'hotel' as const,
          location: 'Swiss Alps, Switzerland',
          price: 180,
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
          amenities: ['Ski-in/Ski-out', 'Fireplace', 'Hot Tub'],
          description: 'Cozy mountain lodge with breathtaking alpine views and premium amenities.',
        },
        {
          id: 'hotel-3',
          name: 'Urban Boutique Hotel',
          type: 'hotel' as const,
          location: 'Paris, France',
          price: 220,
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
          amenities: ['City View', 'Bar', 'Fine Dining'],
          description: 'Stylish boutique hotel in the heart of Paris, steps from major attractions.',
        },
      ];

      // Mock flights
      const flights = [
        {
          id: 'flight-1',
          name: 'Premium Airlines Flight 101',
          type: 'flight' as const,
          origin: 'New York (JFK)',
          destination: 'London (LHR)',
          price: 850,
          departDate: '2023-07-15',
          returnDate: '2023-07-22',
          airline: 'Premium Airlines',
          duration: '7h 15m',
          image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
        {
          id: 'flight-2',
          name: 'Skyway Express Flight 202',
          type: 'flight' as const,
          origin: 'Los Angeles (LAX)',
          destination: 'Tokyo (HND)',
          price: 1200,
          departDate: '2023-08-10',
          returnDate: '2023-08-24',
          airline: 'Skyway Express',
          duration: '11h 45m',
          image: 'https://images.unsplash.com/photo-1542558848-25f6fceb17e7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
        },
      ];

      // Mock packages
      const packages = [
        {
          id: 'package-1',
          name: 'Tropical Paradise Getaway',
          type: 'package' as const,
          location: 'Maldives',
          price: 2950,
          rating: 4.9,
          duration: '7 Days',
          groupSize: 'Up to 8 people',
          startDate: 'Flexible',
          features: ['All-Inclusive', 'Snorkeling', 'Private Villa'],
          image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Enjoy a week in paradise with this all-inclusive Maldives package.',
        },
        {
          id: 'package-2',
          name: 'European Cultural Tour',
          type: 'package' as const,
          location: 'Italy, France, Spain',
          price: 3200,
          rating: 4.7,
          duration: '12 Days',
          groupSize: '10-15 people',
          startDate: 'Monthly departures',
          features: ['Guided Tours', 'Premium Hotels', 'Transportation'],
          image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Experience the best of European culture with this comprehensive tour package.',
        },
      ];

      // Mock destinations
      const destinations = [
        {
          id: 'destination-1',
          name: 'Santorini',
          type: 'destination' as const,
          location: 'Greece',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Famous for its stunning caldera, whitewashed buildings, and sunsets.',
        },
        {
          id: 'destination-2',
          name: 'Kyoto',
          type: 'destination' as const,
          location: 'Japan',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Historic city known for its classical Buddhist temples and gardens.',
        },
        {
          id: 'destination-3',
          name: 'Machu Picchu',
          type: 'destination' as const,
          location: 'Peru',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1646&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Ancient Incan citadel set high in the Andes Mountains.',
        },
        {
          id: 'destination-4',
          name: 'Serengeti',
          type: 'destination' as const,
          location: 'Tanzania',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1736&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Home to the great wildlife migration and stunning savanna landscapes.',
        },
      ];

      // Mock tour guides
      const guides = [
        {
          id: 'guide-1',
          name: 'Alex Johnson',
          type: 'guide' as const,
          location: 'Rome, Italy',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Expert in Roman history with 10 years of experience leading tours in Italy.',
        },
        {
          id: 'guide-2',
          name: 'Sofia Garcia',
          type: 'guide' as const,
          location: 'Barcelona, Spain',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3',
          description: 'Passionate local guide specializing in Gaudi architecture and Spanish culture.',
        },
      ];

      // Determine which results to return based on search type
      let results: SearchResult[] = [];
      
      switch(options.searchType) {
        case 'hotels':
          results = hotels;
          break;
        case 'flights':
          results = flights;
          break;
        case 'packages':
          results = packages;
          break;
        case 'destinations':
          results = destinations;
          break;
        case 'guides':
          results = guides;
          break;
        default:
          // Return all types if no specific type is selected
          results = [...hotels, ...flights, ...packages, ...destinations, ...guides];
      }

      // Apply additional filters based on search options
      if (options.location) {
        results = results.filter(item => 
          item.location?.toLowerCase().includes(options.location!.toLowerCase()) ||
          item.destination?.toLowerCase().includes(options.location!.toLowerCase())
        );
      }

      if (options.minPrice !== undefined && options.maxPrice !== undefined) {
        results = results.filter(item => 
          item.price !== undefined && 
          item.price >= options.minPrice! && 
          item.price <= options.maxPrice!
        );
      } else if (options.minPrice !== undefined) {
        results = results.filter(item => 
          item.price !== undefined && 
          item.price >= options.minPrice!
        );
      } else if (options.maxPrice !== undefined) {
        results = results.filter(item => 
          item.price !== undefined && 
          item.price <= options.maxPrice!
        );
      }

      if (options.rating) {
        results = results.filter(item => 
          item.rating !== undefined && 
          item.rating >= options.rating!
        );
      }

      resolve(results);
    }, 500); // Simulate API delay
  });
};

export const useSearch = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({});
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (options: SearchOptions) => {
    setIsLoading(true);
    setError(null);
    try {
      const searchResults = await mockSearchResults(options);
      setResults(searchResults);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial search with empty options if needed
    performSearch({});
  }, [performSearch]);

  const search = useCallback((options: SearchOptions) => {
    setSearchOptions(options);
    performSearch(options);
  }, [performSearch]);

  return {
    search,
    results,
    isLoading,
    error,
    searchOptions,
  };
};
