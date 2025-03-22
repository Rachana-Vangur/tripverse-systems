
import { useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price?: number;
  discount?: number;
  className?: string;
}

export const DestinationCard = ({
  id,
  name,
  location,
  image,
  rating,
  price,
  discount,
  className = '',
}: DestinationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/destinations/${id}`}
      className={`destination-card block group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        {rating > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-800">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}

        {discount && price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}% OFF
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-travel-blue-light transition-colors duration-300">{name}</h3>
          <div className="flex items-center text-white/80 mb-2">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          
          {price && (
            <div className="flex items-center">
              {discount ? (
                <>
                  <span className="text-white/60 line-through text-sm mr-2">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-white font-bold">
                    ${(price - (price * discount / 100)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-white font-bold">${price.toFixed(2)}</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div 
        className={`absolute inset-0 border-2 border-travel-blue rounded-xl pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </Link>
  );
};
