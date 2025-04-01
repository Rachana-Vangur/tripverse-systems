
import { useState } from 'react';
import { Hotel, PlaneIcon, PackageIcon, Heart } from 'lucide-react';
import { FadeIn } from "@/components/animation/FadeIn";
import { SearchBar } from "@/components/ui/SearchBar";
import { useSearch } from '@/hooks/useSearch';

// Tabs for search options
type SearchTab = 'hotels' | 'flights' | 'packages' | 'activities';

export const HeroSection = () => {
  const [activeSearchTab, setActiveSearchTab] = useState<SearchTab>('hotels');
  const { results } = useSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleResultsFound = (hasResults: boolean) => {
    setHasSearched(true);
    
    // If we have results, we could scroll to a results section
    if (hasResults && results.length > 0) {
      // Scroll to results section with a small delay to ensure it's rendered
      setTimeout(() => {
        const resultsSection = document.getElementById('search-results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <section className="hero-section">
      <img 
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1642&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Travel the world" 
        className="hero-bg animate-pulse-subtle"
      />
      <div className="hero-overlay"></div>
      
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <FadeIn direction="up" delay={300}>
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
            Discover the world with TripVerse
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-6">
            Explore the World's Most <br /> 
            <span className="text-travel-blue">Extraordinary Destinations</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            From exotic beaches to historic landmarks, we help you discover amazing places with premium travel experiences designed just for you.
          </p>
        </FadeIn>
        
        {/* Search Tabs */}
        <div className="bg-white/10 backdrop-blur-md p-1 rounded-lg inline-flex mb-6">
          <button 
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeSearchTab === 'hotels' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setActiveSearchTab('hotels')}
          >
            <Hotel size={16} className="inline mr-2" />
            Hotels
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeSearchTab === 'flights' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setActiveSearchTab('flights')}
          >
            <PlaneIcon size={16} className="inline mr-2" />
            Flights
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeSearchTab === 'packages' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setActiveSearchTab('packages')}
          >
            <PackageIcon size={16} className="inline mr-2" />
            Packages
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeSearchTab === 'activities' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setActiveSearchTab('activities')}
          >
            <Heart size={16} className="inline mr-2" />
            Activities
          </button>
        </div>
        
        {/* Search Bar */}
        <FadeIn direction="up" delay={600}>
          <SearchBar 
            type={activeSearchTab === 'flights' ? 'flight' : 
                  activeSearchTab === 'packages' ? 'package' : 
                  activeSearchTab === 'activities' ? 'destination' : 'hotel'} 
            className="max-w-5xl mx-auto"
            onResultsFound={handleResultsFound}
          />
        </FadeIn>
      </div>
    </section>
  );
};
