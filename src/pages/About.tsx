
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Users, Globe, Award, Coffee } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Our Team" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
              About TripVerse
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Creating memorable travel experiences since 2010
            </p>
          </FadeIn>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn direction="right">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Our Team" 
                  className="rounded-lg shadow-lg w-full"
                />
              </FadeIn>
            </div>
            <div>
              <FadeIn direction="left">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  TripVerse was founded in 2010 with a simple mission: to help travelers explore the world in the most authentic and memorable way possible. What started as a small team of passionate travelers has grown into a global travel platform connecting adventurers with extraordinary destinations.
                </p>
                <p className="text-gray-600 mb-6">
                  We believe that travel is more than just visiting new places—it's about creating meaningful connections, experiencing different cultures, and coming back home with stories that last a lifetime. Our team of experienced travel enthusiasts works tirelessly to curate the best travel experiences, from luxurious getaways to off-the-beaten-path adventures.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Globe className="text-travel-blue mr-2" size={20} />
                    <span className="text-gray-700 font-medium">100+ Countries</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-travel-blue mr-2" size={20} />
                    <span className="text-gray-700 font-medium">1M+ Happy Travelers</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-travel-blue mr-2" size={20} />
                    <span className="text-gray-700 font-medium">10,000+ Destinations</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                At TripVerse, our core values guide everything we do, from how we build our product to how we interact with our customers.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn direction="up" delay={100}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Award className="text-travel-blue mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, ensuring that our customers receive the highest quality travel experiences possible.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={200}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Globe className="text-travel-blue mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to promoting sustainable travel practices that respect local cultures and protect the environment for future generations.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={300}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Coffee className="text-travel-blue mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  We believe in authentic travel experiences that allow travelers to truly connect with destinations and their cultures.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our diverse team of travel enthusiasts is dedicated to creating exceptional travel experiences for our customers.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              {
                name: "Michael Chen",
                role: "Chief Travel Officer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              {
                name: "Elena Rodriguez",
                role: "Customer Experience Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              {
                name: "James Wilson",
                role: "Technology Lead",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
              }
            ].map((member, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-travel-blue">{member.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-travel-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have experienced the TripVerse difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/destinations">
                <Button className="bg-white text-travel-blue hover:bg-gray-100">
                  Explore Destinations
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
