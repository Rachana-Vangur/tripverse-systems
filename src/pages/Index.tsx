
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, Users, Globe, PlaneIcon, Hotel, PackageIcon, Heart, MapIcon, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/ui/SearchBar";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { FeaturedPackage } from "@/components/ui/FeaturedPackage";
import { FadeIn } from "@/components/animation/FadeIn";

// Mock data for featured destinations
const featuredDestinations = [
  {
    id: 'dest-1',
    name: 'Santorini',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.9,
  },
  {
    id: 'dest-2',
    name: 'Bali',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.8,
  },
  {
    id: 'dest-3',
    name: 'Tokyo',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.7,
  },
  {
    id: 'dest-4',
    name: 'Swiss Alps',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
    rating: 4.9,
  },
];

// Mock data for featured packages
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
];

// Tabs for search options
type SearchTab = 'hotels' | 'flights' | 'packages' | 'activities';

const Index = () => {
  const [activeSearchTab, setActiveSearchTab] = useState<SearchTab>('hotels');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
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
              type={activeSearchTab === 'flights' ? 'flight' : 'hotel'} 
              className="max-w-5xl mx-auto" 
            />
          </FadeIn>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-20 bg-travel-gray-light">
        <div className="page-container">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                Explore Top Destinations
              </span>
              <h2 className="section-heading mt-3">Popular Destinations</h2>
              <p className="section-subheading mx-auto">
                Discover the world's most breathtaking locations, from pristine beaches to historic cities,
                and start planning your next adventure.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination, index) => (
              <FadeIn key={destination.id} delay={300 + index * 100} direction="up">
                <DestinationCard
                  id={destination.id}
                  name={destination.name}
                  location={destination.location}
                  image={destination.image}
                  rating={destination.rating}
                />
              </FadeIn>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/destinations">
              <Button className="btn-primary mt-6 px-8">
                <Globe size={18} className="mr-2" />
                View All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn direction="left">
                <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-6">
                  Experience Travel Like Never Before
                </h2>
                <p className="text-gray-600 mb-6">
                  At TripVerse, we believe in creating unforgettable journeys tailored to your unique travel style. 
                  Our expert team crafts each itinerary with attention to detail, ensuring seamless experiences.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-travel-blue/10 p-3 rounded-lg mr-4">
                      <MapPin className="text-travel-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Handpicked Destinations</h3>
                      <p className="text-gray-600 text-sm">Carefully selected locations based on quality and experience.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-travel-blue/10 p-3 rounded-lg mr-4">
                      <CalendarDays className="text-travel-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Customized Itineraries</h3>
                      <p className="text-gray-600 text-sm">Personalized travel plans tailored to your preferences.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-travel-blue/10 p-3 rounded-lg mr-4">
                      <Users className="text-travel-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Expert Travel Guides</h3>
                      <p className="text-gray-600 text-sm">Knowledgeable guides to enhance your travel experience.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-travel-blue/10 p-3 rounded-lg mr-4">
                      <Search className="text-travel-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
                      <p className="text-gray-600 text-sm">Competitive pricing with no hidden fees or charges.</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/about">
                  <Button className="btn-primary px-8">
                    Learn More About Us
                  </Button>
                </Link>
              </FadeIn>
            </div>
            
            <div className="relative">
              <FadeIn direction="right">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-elevation">
                  <img 
                    src="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Travel experience" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-travel-blue/10 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-travel-blue/5 rounded-2xl -z-10"></div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Packages */}
      <section className="py-20 bg-gradient-to-b from-travel-gray-light to-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                Special Offers
              </span>
              <h2 className="section-heading mt-3">Featured Travel Packages</h2>
              <p className="section-subheading mx-auto">
                Our hand-crafted travel packages combine the best accommodations, experiences, and services 
                to create unforgettable journeys.
              </p>
            </FadeIn>
          </div>
          
          <div className="space-y-8">
            {featuredPackages.map((pkg, index) => (
              <FeaturedPackage
                key={pkg.id}
                id={pkg.id}
                title={pkg.title}
                location={pkg.location}
                description={pkg.description}
                price={pkg.price}
                discount={pkg.discount}
                duration={pkg.duration}
                groupSize={pkg.groupSize}
                startDate={pkg.startDate}
                image={pkg.image}
                features={pkg.features}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/packages">
              <Button className="btn-primary mt-6 px-8">
                <PackageIcon size={18} className="mr-2" />
                Browse All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-travel-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-travel-blue-dark opacity-20"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
          opacity: 0.3
        }}></div>
        
        <div className="page-container relative z-10 text-center">
          <FadeIn direction="up">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
              Get 15% Off Your First Booking
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Sign up today and receive exclusive discounts, travel tips, and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/signup">
                <Button className="bg-white text-travel-blue hover:bg-travel-blue-light hover:text-travel-blue-dark font-medium px-8 py-6 text-base transition-all duration-300">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 font-medium px-8 py-6 text-base transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <span className="bg-travel-blue/10 text-travel-blue px-4 py-1 rounded-full text-sm font-medium">
                Our Global Reach
              </span>
              <h2 className="section-heading mt-3">Destinations Around the World</h2>
              <p className="section-subheading mx-auto">
                We offer travel services to hundreds of destinations across all continents.
                Wherever you want to go, we can take you there.
              </p>
            </FadeIn>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-elevation">
            <FadeIn>
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=1733&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="World map" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg mb-4">Explore our interactive map to discover destinations and travel options.</p>
                <Link to="/destinations">
                  <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-travel-blue transition-all duration-300">
                    <MapIcon size={18} className="mr-2" />
                    Explore Destinations
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-travel-gray-light">
        <div className="page-container">
          <div className="bg-white rounded-xl shadow-card p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <FadeIn direction="left">
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600 mb-6">
                    Stay updated with our latest travel deals, new destinations, and travel tips.
                  </p>
                </FadeIn>
              </div>
              
              <div>
                <FadeIn direction="right">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:border-travel-blue focus:ring focus:ring-travel-blue/20 transition-all duration-200"
                    />
                    <Button className="bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
