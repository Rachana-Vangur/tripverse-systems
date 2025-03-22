
import { Link } from 'react-router-dom';
import { MapIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animation/FadeIn";

export const MapSection = () => {
  return (
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
  );
};
