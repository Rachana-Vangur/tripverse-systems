
import { useState } from 'react';
import { Filter, Users, Calendar, Globe, MapPin, Search } from 'lucide-react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FeaturedPackage } from "@/components/ui/FeaturedPackage";
import { useSearch } from "@/hooks/useSearch";

// Mock data for packages
const featuredPackages = [
  {
    id: 'package-1',
    title: 'Tropical Paradise Getaway',
    location: 'Maldives',
    description: 'Experience the ultimate luxury escape with overwater bungalows, pristine beaches, and world-class service. This all-inclusive package offers snorkeling in crystal clear waters, spa treatments, and gourmet dining experiences.',
    price: 2950,
    discount: 15,
    duration: '7 Days / 6 Nights',
    groupSize: 'Up to 8 people',
    startDate: 'Flexible Dates',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['All-Inclusive', 'Snorkeling', 'Private Villa'],
  },
  {
    id: 'package-2',
    title: 'European Cultural Tour',
    location: 'Italy, France, Spain',
    description: 'Immerse yourself in European culture, history, and cuisine with this comprehensive tour package. Visit iconic landmarks, enjoy authentic local experiences, and stay in premium accommodations throughout your journey.',
    price: 3200,
    duration: '12 Days / 11 Nights',
    groupSize: '10-15 people',
    startDate: 'Monthly departures',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Guided Tours', 'Premium Hotels', 'Transportation'],
  },
  {
    id: 'package-3',
    title: 'African Safari Adventure',
    location: 'Kenya & Tanzania',
    description: 'Witness the incredible wildlife of Africa on this unforgettable safari experience. Watch the Great Migration, spot the Big Five, and enjoy evenings under the stars in luxury tented camps.',
    price: 4500,
    discount: 10,
    duration: '10 Days / 9 Nights',
    groupSize: '6-12 people',
    startDate: 'Seasonal departures',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1736&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Safari Drives', 'Luxury Camping', 'Wildlife Viewing'],
  },
  {
    id: 'package-4',
    title: 'Japanese Cultural Experience',
    location: 'Tokyo, Kyoto, Osaka',
    description: 'Discover the perfect blend of ancient traditions and modern innovations in Japan. From serene temples and traditional tea ceremonies to bustling cityscapes and technological wonders.',
    price: 3800,
    duration: '14 Days / 13 Nights',
    groupSize: '8-16 people',
    startDate: 'Cherry blossom & autumn seasons',
    image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
    features: ['Cultural Tours', 'Bullet Train', 'Traditional Ryokan'],
  },
];

const Packages = () => {
  const { search, results, isLoading } = useSearch();
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [durationRange, setDurationRange] = useState([3, 21]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter packages
  const filteredPackages = results.filter(result => result.type === 'package').length > 0
    ? results.filter(result => result.type === 'package')
    : featuredPackages;

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleDurationChange = (values: number[]) => {
    setDurationRange(values);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search({ 
      searchType: 'packages',
      location: searchQuery,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const applyFilters = () => {
    search({
      searchType: 'packages',
      location: searchQuery || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const resetFilters = () => {
    setPriceRange([1000, 5000]);
    setDurationRange([3, 21]);
    setSearchQuery('');
    search({ searchType: 'packages' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Travel packages" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              Discover Our Travel Packages
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
              Expertly crafted travel packages combining the best accommodations, experiences, and services
            </p>
            
            <form onSubmit={handleSearch} className="flex max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for a destination or package..."
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
      
      {/* Main Content */}
      <section className="py-16 bg-travel-gray-light flex-1">
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
                      defaultValue={[1000, 5000]}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      max={10000}
                      step={100}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Duration</h4>
                    <Slider
                      defaultValue={[3, 21]}
                      value={durationRange}
                      onValueChange={handleDurationChange}
                      max={30}
                      step={1}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{durationRange[0]} days</span>
                      <span className="text-sm text-gray-600">{durationRange[1]} days</span>
                    </div>
                  </div>
                  
                  {/* Travel Style */}
                  <div className="pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Travel Style</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                        Luxury
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                        Adventure
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                        Cultural
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                        Beach & Relaxation
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                        Family-Friendly
                      </button>
                    </div>
                  </div>
                  
                  {/* Package Features */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Package Features</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors flex items-center">
                        <Globe size={16} className="mr-2 text-travel-blue" />
                        All-Inclusive
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors flex items-center">
                        <Users size={16} className="mr-2 text-travel-blue" />
                        Guided Tours
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors flex items-center">
                        <Calendar size={16} className="mr-2 text-travel-blue" />
                        Flexible Dates
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors flex items-center">
                        <MapPin size={16} className="mr-2 text-travel-blue" />
                        Multiple Destinations
                      </button>
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
                        defaultValue={[1000, 5000]}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        max={10000}
                        step={100}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">${priceRange[0]}</span>
                        <span className="text-sm text-gray-600">${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    {/* Duration */}
                    <div className="pb-6 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Duration</h4>
                      <Slider
                        defaultValue={[3, 21]}
                        value={durationRange}
                        onValueChange={handleDurationChange}
                        max={30}
                        step={1}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{durationRange[0]} days</span>
                        <span className="text-sm text-gray-600">{durationRange[1]} days</span>
                      </div>
                    </div>
                    
                    {/* Travel Style */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Travel Style</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          Luxury
                        </button>
                        <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          Adventure
                        </button>
                        <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          Cultural
                        </button>
                        <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          Beach
                        </button>
                        <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          Family
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
            
            {/* Packages Results */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                {results.filter(result => result.type === 'package').length > 0
                  ? 'Search Results'
                  : 'Featured Travel Packages'}
              </h2>
              
              {isLoading ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-card animate-pulse">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-5/12 h-64 bg-gray-200 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"></div>
                        <div className="p-6 lg:w-7/12">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                          <div className="flex gap-3 mb-4">
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                          </div>
                          <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                            <div className="h-8 bg-gray-200 rounded w-32"></div>
                            <div className="h-10 bg-gray-200 rounded w-32"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPackages.length > 0 ? (
                <div className="space-y-6">
                  {filteredPackages.map((pkg, index) => (
                    <FadeIn key={pkg.id} delay={150 * index} direction="up">
                      <FeaturedPackage
                        id={pkg.id}
                        title={pkg.name || pkg.title || ''}
                        location={pkg.location || ''}
                        description={pkg.description || ''}
                        price={pkg.price || 0}
                        discount={pkg.discount}
                        duration={pkg.duration || ''}
                        groupSize={pkg.groupSize || ''}
                        startDate={pkg.startDate || ''}
                        image={pkg.image || ''}
                        features={pkg.features || []}
                        reverse={index % 2 !== 0}
                      />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
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
      
      {/* Why Choose Our Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                Our Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-6">
                Why Choose Our Travel Packages
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our carefully crafted travel packages offer exceptional value, convenience, and unforgettable experiences that you simply can't replicate on your own.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={100} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Globe className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expertly Curated</h3>
                <p className="text-gray-600">
                  Each package is meticulously designed by travel experts with deep destination knowledge to provide authentic and immersive experiences.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={200} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Calendar className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stress-Free Planning</h3>
                <p className="text-gray-600">
                  We handle all the details - from accommodations and transportation to activities and guides - so you can focus on enjoying your journey.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={300} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Users className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-gray-600">
                  Enjoy the knowledge and insights of our professional local guides who provide cultural context and access to hidden gems.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={400} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <MapPin className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusive Access</h3>
                <p className="text-gray-600">
                  Gain special access to unique experiences, venues, and activities that aren't available to individual travelers.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={500} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Search className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Value for Money</h3>
                <p className="text-gray-600">
                  Benefit from our partnerships and buying power to enjoy premium experiences at competitive prices with no hidden costs.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={600} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Calendar className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Travel with confidence knowing our dedicated support team is available around the clock to assist you with any needs or concerns.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-travel-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-6">
                What Our Travelers Say
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Hear from travelers who have experienced our carefully crafted packages and made unforgettable memories.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={100} direction="up">
              <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevation transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                    <p className="text-sm text-gray-500">Bali Retreat Package</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "The attention to detail in this package was exceptional. From the stunning villa to the private tours, everything was perfectly arranged. I didn't have to worry about a thing!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={200} direction="up">
              <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevation transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">James T.</h4>
                    <p className="text-sm text-gray-500">European Cultural Tour</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Our guide was incredibly knowledgeable and made the history come alive. We visited places we never would have found on our own. This package exceeded all expectations!"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={300} direction="up">
              <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevation transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">Emma R.</h4>
                    <p className="text-sm text-gray-500">African Safari Adventure</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "A trip of a lifetime! The safari experience was incredible, and the accommodations were luxurious yet authentic. The small group size made it personal and memorable."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Packages;
