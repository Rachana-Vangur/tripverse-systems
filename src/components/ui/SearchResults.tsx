
import { useSearch } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Calendar, DollarSign, Clock, Plane, Users, Heart } from 'lucide-react';
import { useState } from 'react';

export const SearchResults = () => {
  const { results, isLoading, searchOptions } = useSearch();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Handle adding/removing from favorites
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <section id="search-results" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Loading Results...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!results || results.length === 0) {
    return null; // Don't render the section if there are no results
  }

  return (
    <section id="search-results" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2">Search Results</h2>
        <p className="text-center text-gray-600 mb-8">
          Found {results.length} {searchOptions.searchType || 'items'} matching your criteria
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {result.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={result.image} 
                    alt={result.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <button 
                    onClick={() => toggleFavorite(result.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      size={18} 
                      className={favorites.includes(result.id) ? "fill-red-500 text-red-500" : "text-gray-500"}
                    />
                  </button>
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold">{result.name}</CardTitle>
                  {result.rating && (
                    <div className="flex items-center px-2 py-1 bg-travel-blue/10 text-travel-blue rounded-md text-sm">
                      <Star size={14} className="fill-travel-blue mr-1" />
                      {result.rating}
                    </div>
                  )}
                </div>
                <CardDescription className="flex items-center text-gray-600">
                  {result.location && (
                    <>
                      <MapPin size={14} className="mr-1" />
                      {result.location}
                    </>
                  )}
                  {result.origin && result.destination && (
                    <>
                      <MapPin size={14} className="mr-1" />
                      {result.origin} to {result.destination}
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {result.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.price && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        <DollarSign size={12} className="mr-1" />
                        ${result.price}
                      </span>
                    )}
                    
                    {result.departDate && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        <Calendar size={12} className="mr-1" />
                        {result.departDate}
                      </span>
                    )}
                    
                    {result.flightDuration && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        <Clock size={12} className="mr-1" />
                        {result.flightDuration}
                      </span>
                    )}
                    
                    {result.airline && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        <Plane size={12} className="mr-1" />
                        {result.airline}
                      </span>
                    )}
                    
                    {result.tripDuration && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        <Clock size={12} className="mr-1" />
                        {result.tripDuration}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button className="w-full bg-travel-blue hover:bg-travel-blue-dark">
                  {result.type === 'hotel' ? 'Book Room' : 
                   result.type === 'flight' ? 'Book Flight' : 
                   result.type === 'package' ? 'Book Package' : 
                   result.type === 'destination' ? 'Explore' : 'View Details'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
