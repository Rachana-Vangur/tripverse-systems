
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animation/FadeIn";

export const CTASection = () => {
  return (
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
  );
};
