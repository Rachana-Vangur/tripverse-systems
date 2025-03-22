
import { Clock, MapPin, Calendar, Users, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FadeIn } from '../animation/FadeIn';

interface PackageFeature {
  icon: React.ReactNode;
  text: string;
}

interface FeaturedPackageProps {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  discount?: number;
  duration: string;
  groupSize: string;
  startDate: string;
  image: string;
  features: string[];
  reverse?: boolean;
}

export const FeaturedPackage = ({
  id,
  title,
  location,
  description,
  price,
  discount,
  duration,
  groupSize,
  startDate,
  image,
  features,
  reverse = false,
}: FeaturedPackageProps) => {
  const packageFeatures: PackageFeature[] = [
    { icon: <Clock size={16} className="text-travel-blue" />, text: duration },
    { icon: <Users size={16} className="text-travel-blue" />, text: groupSize },
    { icon: <Calendar size={16} className="text-travel-blue" />, text: startDate },
  ];

  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevation transition-shadow duration-300`}>
      <div className="lg:w-5/12 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 lg:h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
      </div>
      
      <div className="lg:w-7/12 p-6 lg:p-8">
        <FadeIn delay={100} direction="up">
          <div className="flex items-center mb-3">
            <MapPin size={18} className="text-travel-blue mr-2" />
            <span className="text-gray-600">{location}</span>
          </div>
          
          <h3 className="text-2xl font-bold font-display mb-3 text-gray-900">{title}</h3>
          
          <p className="text-gray-600 mb-5 line-clamp-3">{description}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {packageFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                {feature.icon}
                <span className="ml-2 text-sm text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-5 mt-2">
            <div className="flex flex-wrap gap-3 mb-5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm bg-travel-blue/5 px-3 py-1 rounded-full">
                  <Coffee size={14} className="text-travel-blue mr-1" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                {discount ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-400 line-through text-sm">${price}</span>
                    <span className="text-2xl font-bold text-travel-blue">
                      ${(price - (price * discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">/ per person</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-travel-blue">${price}</span>
                    <span className="text-gray-500 text-sm">/ per person</span>
                  </div>
                )}
              </div>
              
              <Link to={`/packages/${id}`}>
                <Button className="bg-travel-blue hover:bg-travel-blue-dark text-white transition-all duration-300">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
