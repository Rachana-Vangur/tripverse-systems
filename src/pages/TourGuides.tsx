
import { useState } from 'react';
import { Search, Filter, Users, Globe, Languages, Star, MapPin } from 'lucide-react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearch } from "@/hooks/useSearch";

// Mock data for languages
const languages = [
  { id: 'english', name: 'English' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'french', name: 'French' },
  { id: 'german', name: 'German' },
  { id: 'italian', name: 'Italian' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'mandarin', name: 'Mandarin' },
  { id: 'arabic', name: 'Arabic' },
];

// Mock data for specializations
const specializations = [
  { id: 'history', name: 'History & Culture' },
  { id: 'food', name: 'Food & Cuisine' },
  { id: 'adventure', name: 'Adventure' },
  { id: 'photography', name: 'Photography' },
  { id: 'art', name: 'Art & Architecture' },
  { id: 'nature', name: 'Nature & Wildlife' },
];

// Mock data for tour guides
const tourGuides = [
  {
    id: 'guide-1',
    name: 'Alex Johnson',
    location: 'Rome, Italy',
    languages: ['English', 'Italian'],
    specializations: ['History & Culture', 'Art & Architecture'],
    experience: '10 years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Expert in Roman history with 10 years of experience leading tours in Italy. Alex specializes in bringing ancient history to life through engaging storytelling and in-depth knowledge.',
  },
  {
    id: 'guide-2',
    name: 'Sofia Garcia',
    location: 'Barcelona, Spain',
    languages: ['English', 'Spanish', 'French'],
    specializations: ['Food & Cuisine', 'Art & Architecture'],
    experience: '8 years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Passionate local guide specializing in Gaudi architecture and Spanish culture. Sofia offers unique food tours that combine culinary experiences with cultural insights.',
  },
  {
    id: 'guide-3',
    name: 'Hiroshi Tanaka',
    location: 'Kyoto, Japan',
    languages: ['English', 'Japanese'],
    specializations: ['History & Culture', 'Photography'],
    experience: '12 years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Traditional Japanese culture expert who specializes in hidden temples and gardens of Kyoto. Hiroshi combines historical knowledge with photography tips for unforgettable tour experiences.',
  },
  {
    id: 'guide-4',
    name: 'Emma Wilson',
    location: 'London, UK',
    languages: ['English', 'French'],
    specializations: ['History & Culture', 'Art & Architecture'],
    experience: '15 years',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Former art history professor with extensive knowledge of London museums and historical landmarks. Emma specializes in customized art and history tours throughout the UK.',
  },
  {
    id: 'guide-5',
    name: 'Carlos Mendez',
    location: 'Cusco, Peru',
    languages: ['English', 'Spanish', 'Portuguese'],
    specializations: ['Adventure', 'Nature & Wildlife'],
    experience: '9 years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Adventure guide specializing in Inca Trail hikes and Machu Picchu tours. Carlos has extensive knowledge of local ecosystems and indigenous cultures of the Andes.',
  },
  {
    id: 'guide-6',
    name: 'Amara Nwosu',
    location: 'Cape Town, South Africa',
    languages: ['English', 'Zulu', 'Afrikaans'],
    specializations: ['Nature & Wildlife', 'Adventure'],
    experience: '7 years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Wildlife expert with extensive knowledge of South African national parks and safaris. Amara combines adventure experiences with educational insights about conservation efforts.',
  },
];

const TourGuides = () => {
  const { search, results, isLoading } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter guides
  const filteredGuides = results.filter(result => result.type === 'guide').length > 0
    ? results.filter(result => result.type === 'guide')
    : tourGuides;

  const handleLanguageToggle = (languageId: string) => {
    setSelectedLanguages(prev => 
      prev.includes(languageId)
        ? prev.filter(id => id !== languageId)
        : [...prev, languageId]
    );
  };

  const handleSpecializationToggle = (specId: string) => {
    setSelectedSpecializations(prev => 
      prev.includes(specId)
        ? prev.filter(id => id !== specId)
        : [...prev, specId]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search({ 
      searchType: 'guides',
      location: searchQuery
    });
  };

  const applyFilters = () => {
    search({
      searchType: 'guides',
      location: searchQuery || undefined,
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLanguages([]);
    setSelectedSpecializations([]);
    search({ searchType: 'guides' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Tour Guide" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              Expert Tour Guides
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
              Connect with knowledgeable local guides for authentic and immersive travel experiences
            </p>
            
            <form onSubmit={handleSearch} className="flex max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by location or specialization..."
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
                  {/* Languages */}
                  <div className="pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Languages</h4>
                    <div className="space-y-3">
                      {languages.map(language => (
                        <div key={language.id} className="flex items-center">
                          <Checkbox
                            id={`language-${language.id}`}
                            checked={selectedLanguages.includes(language.id)}
                            onCheckedChange={() => handleLanguageToggle(language.id)}
                            className="text-travel-blue"
                          />
                          <label 
                            htmlFor={`language-${language.id}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {language.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Specializations */}
                  <div className="pb-6 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Specializations</h4>
                    <div className="space-y-3">
                      {specializations.map(spec => (
                        <div key={spec.id} className="flex items-center">
                          <Checkbox
                            id={`spec-${spec.id}`}
                            checked={selectedSpecializations.includes(spec.id)}
                            onCheckedChange={() => handleSpecializationToggle(spec.id)}
                            className="text-travel-blue"
                          />
                          <label 
                            htmlFor={`spec-${spec.id}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {spec.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience Level */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Experience Level</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Checkbox
                          id="exp-beginner"
                          className="text-travel-blue"
                        />
                        <label 
                          htmlFor="exp-beginner"
                          className="ml-2 text-sm text-gray-700"
                        >
                          1-3 years
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="exp-intermediate"
                          className="text-travel-blue"
                        />
                        <label 
                          htmlFor="exp-intermediate"
                          className="ml-2 text-sm text-gray-700"
                        >
                          4-7 years
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="exp-expert"
                          className="text-travel-blue"
                        />
                        <label 
                          htmlFor="exp-expert"
                          className="ml-2 text-sm text-gray-700"
                        >
                          8+ years
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
                    {/* Languages */}
                    <div className="pb-6 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {languages.map(language => (
                          <button
                            key={language.id}
                            onClick={() => handleLanguageToggle(language.id)}
                            className={`py-1 px-3 rounded-full text-xs transition-colors ${
                              selectedLanguages.includes(language.id) 
                                ? 'bg-travel-blue/10 text-travel-blue' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {language.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Specializations */}
                    <div className="pb-6 border-b border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {specializations.map(spec => (
                          <button
                            key={spec.id}
                            onClick={() => handleSpecializationToggle(spec.id)}
                            className={`py-1 px-3 rounded-full text-xs transition-colors ${
                              selectedSpecializations.includes(spec.id) 
                                ? 'bg-travel-blue/10 text-travel-blue' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {spec.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Experience Level - simplified for mobile */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Experience Level</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="py-1 px-3 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          1-3 years
                        </button>
                        <button className="py-1 px-3 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          4-7 years
                        </button>
                        <button className="py-1 px-3 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-travel-blue/10 hover:text-travel-blue transition-colors">
                          8+ years
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
            
            {/* Guide Results */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                {results.filter(result => result.type === 'guide').length > 0
                  ? 'Search Results'
                  : 'Featured Tour Guides'}
              </h2>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-card animate-pulse p-6">
                      <div className="flex items-start">
                        <div className="w-24 h-24 rounded-lg bg-gray-200 mr-4"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                          <div className="flex gap-2">
                            <div className="h-6 w-16 bg-gray-200 rounded"></div>
                            <div className="h-6 w-16 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredGuides.map((guide, index) => (
                    <FadeIn key={guide.id} delay={150 * index} direction="up">
                      <div className="bg-white rounded-xl shadow-card hover:shadow-elevation transition-shadow duration-300 overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-24 sm:h-24 h-auto w-full mb-4 sm:mb-0 sm:mr-4">
                              <img 
                                src={guide.image} 
                                alt={guide.name} 
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{guide.name}</h3>
                                <div className="flex items-center text-sm">
                                  <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                                  <span className="font-medium">{guide.rating}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-gray-600 mb-3">
                                <MapPin size={16} className="mr-1" />
                                <span className="text-sm">{guide.location}</span>
                                <span className="mx-2">•</span>
                                <Users size={16} className="mr-1" />
                                <span className="text-sm">{guide.experience} experience</span>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.description}</p>
                              
                              <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                  <div className="flex items-center text-xs bg-travel-blue/5 px-2 py-1 rounded-full">
                                    <Languages size={12} className="text-travel-blue mr-1" />
                                    <span>{guide.languages?.join(', ')}</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {guide.specializations?.map((spec, index) => (
                                    <div key={index} className="text-xs bg-travel-gray-medium/30 px-2 py-1 rounded-full">
                                      {spec}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                            <Button className="bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
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
      
      {/* Why Choose Our Guides */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                Our Expert Guides
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-6">
                Why Choose Our Tour Guides
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our carefully selected guides provide authentic, immersive experiences that transform an ordinary trip into a journey of discovery.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={100} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Globe className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-gray-600">
                  Our guides are locals with deep knowledge of their regions, giving you authentic insights and access to hidden gems that most tourists miss.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={200} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Languages className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Multilingual Support</h3>
                <p className="text-gray-600">
                  Break through language barriers with our multilingual guides who can communicate fluently in your preferred language.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={300} direction="up">
              <div className="bg-travel-gray-light rounded-xl p-6 hover:shadow-elevation transition-shadow duration-300">
                <div className="bg-travel-blue/10 p-3 rounded-lg inline-block mb-4">
                  <Users className="text-travel-blue h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Experience</h3>
                <p className="text-gray-600">
                  Every tour can be customized to your interests, pace, and preferences, ensuring a personalized journey that matches your travel style.
                </p>
              </div>
            </FadeIn>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300 px-8 py-6">
              Become a Tour Guide
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TourGuides;
