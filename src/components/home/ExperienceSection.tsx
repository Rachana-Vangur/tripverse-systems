
import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, Users, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animation/FadeIn";

export const ExperienceSection = () => {
  return (
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
  );
};
